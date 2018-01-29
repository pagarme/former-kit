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
import TableEmptyItem from '../TableEmptyItem'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import { createComponents } from './common'
import {
  columnsCases,
  rowsCases,
} from './staticCases'

const isOdd = modulo(__, 2)

describe.only('Table', () => {
  describe('Static cases', () => {
    describe('Columns', () => {
      cases('should render columns', ({ component, columns }) => {
        const firstRow = component.find(TableRow).first()
        const header = component.find(TableHead)

        const dataColumns = firstRow
          .findWhere(node =>
            node.type() === 'td' &&
            !node.find(Checkbox).exists() &&
            !node.find(Button).exists()
          )

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

      cases('should render headercolumns with correct titles',
        ({ component, columns }) => {
          const header = component.find(TableHead)
          const headerColumns = header
            .find('th')
            .findWhere(node =>
              node.type() === 'div' &&
              node.find('span').length > 0)

          headerColumns.forEach((colElement, index) => {
            const sp = colElement.find('span').first()
            const title = columns[index].title

            expect(sp.text().trim()).toBe(title)
          })
        },
        columnsCases
      )

      cases('should render column with correct render function',
        ({ component, columns, rows }) => {
          const column = columns.find(col => col.renderer)
          const columnIndex = findIndex(equals(column))(columns)
          const rendererResult = column.renderer(rows[columnIndex])
          const resultCell = component.find(rendererResult).first()

          expect(resultCell).toBeDefined()
        },
        columnsCases
      )

      cases('should render column with correct acessor prop',
        ({ component, columns, rows }) => {
          const column = columns.find(col => col.acessor && !col.renderer)
          const columnIndex = findIndex(equals(column))(columns)
          const text = path(column.acessor, rows[0])
          const line = component
            .find('tbody')
            .first()
            .find('tr')
            .first()
          const cell = line
            .findWhere(node =>
              node.type() === 'td' &&
              !node.find(Checkbox).exists() &&
              !node.find(Button).exists()
            )
            .at(columnIndex)

          expect(cell.exists()).toBe(true)
          expect(cell.text()).toBe(text)
        },
        columnsCases
      )
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

      cases('should render the a row with correct data', ({ component, rows, columns }) => {
        const firstRow = component.find(TableRow).first()
        const firstRowData = rows[0]

        const cells = firstRow
          .findWhere(node =>
            node.type() === 'td' &&
            !node.find(Checkbox).exists() &&
            !node.find(Button).exists()
          )
        cells.forEach((cell, index) => {
          const acessor = columns[index].acessor
          if (acessor) {
            expect(cell.text()).toBe(path(acessor, firstRowData))
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

      cases('should render falsy cells with a dash ', ({ component, rows, columns }) => {
        const renderedRows = component.find(TableRow)
        renderedRows.forEach((renderedRow, rowIndex) => {
          const cells = renderedRow.findWhere(node =>
            node.type() === 'td' &&
            !node.find(Checkbox).exists() &&
            !node.find(Button).exists()
          )
          const row = rows[rowIndex]
          cells.forEach((cell, index) => {
            const column = columns[index]
            const { acessor, renderer } = column
            const isEmpty = !renderer && !path(acessor, row)
            if (isEmpty) {
              expect(cell.find(TableEmptyItem).exists()).toBe(true)
            }
          })
        })
      }, rowsCases)
    })
  })
})
