import cases from 'jest-in-case'
import {
  __,
  equals,
  findIndex,
  modulo,
  path,
} from 'ramda'

import Button from '../../Button'
import Checkbox from '../../Checkbox'
import TableAggregationRow from '../TableAggregationRow'
import TableEmptyItem from '../TableEmptyItem'
import TableEmptyRow from '../TableEmptyRow'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import {
  createComponents,
  mock,
} from './common'
import {
  columnsCases,
  rowsCases,
} from './staticCases'

const isOdd = modulo(__, 2)

describe('Table', () => {
  describe('Static cases', () => {
    describe('Columns', () => {
      cases('should render columns', ({ columns, component }) => {
        const firstRow = component.find(TableRow).first()
        const header = component.find(TableHead)

        const dataColumns = firstRow
          .findWhere(node => (
            node.length > 0
              && node.type() === 'td'
              && !node.find(Checkbox).exists()
              && !node.find(Button).exists()
          ))

        expect(firstRow.find('td').length)
          .toBe(header.find('th').length)

        expect(dataColumns.length)
          .toBeLessThanOrEqual(columns.length)
      }, columnsCases)

      describe('should render selectable column correctly', () => {
        it('when a selectable prop is received', () => {
          const { component } = createComponents({
            selectable: true,
          })
          const firstRow = component.find(TableRow).first()
          const header = component.find(TableHead)
          let firstColumn = firstRow.find('td').first()
          let check = firstColumn
            .find(Checkbox)
            .first()

          expect(check.exists()).toBe(true)

          firstColumn = header.find('th').first()
          check = firstColumn
            .find(Checkbox)
            .first()

          expect(check.exists()).toBe(true)
        })

        it('when a selectable prop is not received', () => {
          const { component } = createComponents({
            selectable: false,
          })
          const firstRow = component.find(TableRow).first()
          const header = component.find(TableHead)
          let firstColumn = firstRow.find('td').first()
          let check = firstColumn
            .find(Checkbox)
            .first()

          expect(check.exists()).toBe(false)

          firstColumn = header.find('th').first()
          check = firstColumn
            .find(Checkbox)
            .first()

          expect(check.exists()).toBe(false)
        })
      })

      describe('should render expandable column correctly', () => {
        it('when a expandable prop is received', () => {
          const { component } = createComponents({
            expandable: true,
          })
          const firstRow = component.find(TableRow).first()
          const header = component.find(TableHead)
          let lastColumn = firstRow
            .find('td')
            .last()
          const btn = lastColumn
            .find(Button)
            .first()

          expect(btn.exists()).toBe(true)

          lastColumn = header
            .find('th')
            .last()

          expect(lastColumn.exists()).toBe(true)
          expect(lastColumn.children().exists()).toBe(false)
        })

        it('when a expandable prop is not received', () => {
          const { component } = createComponents({
            expandable: false,
          })
          const firstRow = component.find(TableRow).first()
          const header = component.find(TableHead)
          let lastColumn = firstRow
            .find('td')
            .last()
          const btn = lastColumn
            .find(Button)
            .first()

          expect(btn.exists()).toBe(false)

          lastColumn = header
            .find('th')
            .last()

          expect(lastColumn.exists()).toBe(true)
          expect(lastColumn.children().exists()).toBe(true)
        })
      })

      describe('should control columns width correctly', () => {
        it('when a width prop is received', () => {
          const { columns } = mock
          const columnsWithWidthProps = columns.map(column => ({
            ...column,
            width: 120,
          }))

          const { component } = createComponents({
            columns: columnsWithWidthProps,
          })

          const firstRow = component.find(TableRow).first()
          const header = component.find(TableHead)
          let lastColumn = firstRow

          lastColumn = header
            .find('th[style]')
            .last()

          expect(lastColumn.exists()).toBe(true)
          expect(lastColumn.prop('style').width).toBe('120px')
        })
      })

      cases('should render headercolumns with correct titles',
        ({ columns, component }) => {
          const header = component.find(TableHead)
          const headerColumns = header
            .find('th')
            .findWhere(node => (
              node.length > 0
              && node.type() === 'div'
              && node.find('span').length > 0
              && node.find('input').length <= 0
            ))

          headerColumns.forEach((colElement, index) => {
            const sp = colElement.find('span').first()
            const { title } = columns[index]

            expect(sp.text().trim()).toBe(title)
          })
        },
        columnsCases)

      cases('should render column with correct render function',
        ({ columns, component, rows }) => {
          const column = columns.find(col => col.renderer)
          const columnIndex = findIndex(equals(column))(columns)
          const rendererResult = column.renderer(rows[columnIndex])
          const resultCell = component.find(rendererResult).first()

          expect(resultCell).toBeDefined()
        },
        columnsCases)

      cases('should render column with correct accessor prop',
        ({ columns, component, rows }) => {
          const column = columns.find(col => col.accessor && !col.renderer)
          const columnIndex = findIndex(equals(column))(columns)
          const text = path(column.accessor, rows[0])
          const line = component
            .find('tbody')
            .first()
            .find('tr')
            .first()
          const cell = line
            .findWhere(node => (
              node.length > 0
              && node.type() === 'td'
              && !node.find(Checkbox).exists()
              && !node.find(Button).exists()
            ))
            .at(columnIndex)

          expect(cell.exists()).toBe(true)
          expect(cell.text()).toBe(text)
        },
        columnsCases)
    })

    describe('Rows', () => {
      cases('should render rows', ({ component, rows }) => {
        const headerColumnsCount = component
          .find(TableHead)
          .find('th')
          .length

        component
          .find(TableRow)
          .forEach((row) => {
            expect(row.find('td').length)
              .toBe(headerColumnsCount)
          })

        expect(rows.length)
          .toBe(component.find(TableRow).length)
      }, rowsCases)

      cases('should render the a row with correct data', ({ columns, component, rows }) => {
        const firstRow = component.find(TableRow).first()
        const firstRowData = rows[0]

        const cells = firstRow
          .findWhere(node => (
            node.length > 0
            && node.type() === 'td'
            && !node.find(Checkbox).exists()
            && !node.find(Button).exists()
          ))
        cells.forEach((cell, index) => {
          const { accessor } = columns[index]
          if (accessor) {
            expect(cell.text()).toBe(path(accessor, firstRowData))
          }
        })
      }, rowsCases)

      describe('should render selectable column correctly for all rows', () => {
        it('when a selectable prop is received', () => {
          const { component } = createComponents({
            selectable: true,
          })
          const rows = component.find(TableRow)
          rows.forEach((row) => {
            const firstColumn = row.find('td').first()
            const check = firstColumn
              .find(Checkbox)
              .first()

            expect(check.exists()).toBe(true)
          })
        })

        it('when a selectable prop is not received', () => {
          const { component } = createComponents({
            selectable: false,
          })
          const rows = component.find(TableRow)
          rows.forEach((row) => {
            const firstColumn = row.find('td').first()
            const check = firstColumn
              .find(Checkbox)
              .first()

            expect(check.exists()).toBe(false)
          })
        })
      })

      describe('should render expandable column correctly for all rows', () => {
        it('when a expandable prop is received', () => {
          const { component } = createComponents({
            expandable: true,
          })
          const rows = component.find(TableRow)
          rows.forEach((row) => {
            const lastColumn = row
              .find('td')
              .last()
            const btn = lastColumn
              .find(Button)
              .first()

            expect(btn.exists()).toBe(true)
          })
        })

        it('when a expandable prop is not received', () => {
          const { component } = createComponents({
            expandable: false,
          })
          const firstRow = component.find(TableRow).first()
          const header = component.find(TableHead)
          let lastColumn = firstRow
            .find('td')
            .last()
          const btn = lastColumn
            .find(Button)
            .first()

          expect(btn.exists()).toBe(false)

          lastColumn = header
            .find('th')
            .last()

          expect(lastColumn.exists()).toBe(true)
          expect(lastColumn.children().exists()).toBe(true)
        })
      })

      cases('should render zebra rows', ({ component }) => {
        const renderedRows = component.find(TableRow)

        renderedRows.forEach((row, index) => {
          if (isOdd(index)) {
            expect(row.props().parity).toBe('odd')
          } else {
            expect(row.props().parity).toBe('even')
          }
        })
      }, columnsCases)

      cases('should render falsy cells with a dash ', ({ columns, component, rows }) => {
        const renderedRows = component.find(TableRow)
        renderedRows.forEach((renderedRow, rowIndex) => {
          const cells = renderedRow.findWhere(node => (
            node.length > 0
            && node.type() === 'td'
            && !node.find(Checkbox).exists()
            && !node.find(Button).exists()
          ))

          const row = rows[rowIndex]
          cells.forEach((cell, index) => {
            const column = columns[index]
            const { accessor, renderer } = column
            const isEmpty = !renderer && !path(accessor, row)
            if (isEmpty) {
              expect(cell.find(TableEmptyItem).exists()).toBe(true)
            }
          })
        })
      }, rowsCases)

      cases('should render correctly a footer row according with the prop showAggregation', ({ component }) => {
        const aggregationRow = component.find(TableAggregationRow)
        const { showAggregationRow } = component.props()

        expect(aggregationRow.exists()).toBe(showAggregationRow)
      }, rowsCases)

      describe('should render a empty table item correctly for all rows', () => {
        it('when a renderer returns null', () => {
          const { component } = createComponents({
            expandable: true,
          })
          const rows = component.find(TableRow)
          rows.forEach((row) => {
            const emptyItem = row
              .find('td')
              .find(TableEmptyItem)

            expect(emptyItem.exists()).toBe(true)
          })
        })
      })

      describe('should render a empty row', () => {
        it('when rows are empty and an empty message is received', () => {
          const message = 'No items found'
          const { component } = createComponents({
            emptyMessage: message,
            rows: [],
          })

          const emptyRow = component.find(TableEmptyRow)

          expect(emptyRow.exists()).toBe(true)
        })
      })
    })
  })
})
