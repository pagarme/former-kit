import {
  drop,
  path,
} from 'ramda'
import { createComponents } from './common'
import Button from '../../Button'
import Checkbox from '../../Checkbox'
import TableExpandedRow from '../TableExpandedRow'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TableEmptyItem from '../TableEmptyItem'

describe('Table', () => {
  describe('Behaviour cases', () => {
    describe('Columns', () => {
      it('should call a sort callback when a header column is clicked', () => {
        const { component, onOrderChange } = createComponents({
          selectable: false,
          expandable: false,
        })

        component
          .find(TableHead)
          .find('th')
          .first()
          .simulate('click')

        expect(onOrderChange).toBeCalledWith(0, 'descending')
      })

      it('should call a select all callback when the header select column is checked', () => {
        const { component, onSelectRow, rows } = createComponents({
          selectable: true,
          expandable: false,
        })
        const expectedResult = rows.map((row, index) => index)
        component
          .find(TableHead)
          .find(Checkbox)
          .find('input')
          .simulate('change')

        expect(onSelectRow).toBeCalledWith(expectedResult)
      })

      describe('should throw the surplus columns in the expansible space', () => {
        const { component, rows, columns, visibleColumnsCount } = createComponents({
          selectable: false,
          expandable: true,
          expandedRows: [0],
        })
        const rowData = rows[0]
        const expandedRow = component
          .find(TableExpandedRow)
          .first()
        const surplusColumns = drop(visibleColumnsCount, columns)

        it('should the expanded row exists', () => {
          expect(expandedRow.exists()).toBe(true)
        })

        describe('should expanded rows items exists', () => {
          const surplusItems = expandedRow.find('li')

          surplusItems.forEach((item, index) => {
            const { acessor, renderer } = surplusColumns[index]
            it(`should ${acessor} child exists`, () =>
              expect(item.children().exists()).toBe(true)
            )
            if (renderer) {
              const nodeItem = item
                .findWhere(node =>
                  node.type() === 'p' &&
                  node.find('span').exists()
                ).first()
              const text = path(acessor, rowData) || 'no data'

              it(`should ${acessor} child  use renderer function`, () => {
                expect(nodeItem.exists()).toBe(true)
                expect(nodeItem.find('span').text().trim()).toBe(text)
              })
            } else if (path(acessor, rowData)) {
              const contentSpan = item.find('span').last()
              it(`should ${acessor} child use accessor prop`, () => {
                expect(contentSpan.exists()).toBe(true)
                expect(contentSpan.text()).toBe(path(acessor, rowData).toString())
              })
            } else {
              it(`should ${acessor} child be empty'`, () =>
                expect(item.find(TableEmptyItem).exists()).toBe(true)
              )
            }
          })
        })
      })
    })

    describe('Rows', () => {
      it('should call a expand function when expand button is cilcked', () => {
        const { component, onExpandRow } = createComponents({
          selectable: false,
          expandable: true,
        })
        component
          .find(TableRow)
          .first()
          .find(Button)
          .last()
          .simulate('click')

        expect(onExpandRow).toBeCalledWith([0])
      })

      describe('No expandable table', () => {
        it('should call a calbakck when a line is cilcked', () => {
          const { component, onRowClick } = createComponents({
            expandable: false,
          })
          const rowIndex = 1

          component
            .find(TableRow)
            .at(rowIndex)
            .simulate('click')

          expect(onRowClick).toBeCalledWith(rowIndex)
        })
      })

      it('should call a callback for the button inside the expansible data', () => {
        const { component, onActionButtonClick } = createComponents({
          selectable: false,
          expandable: true,
          expandedRows: [0],
        })
        const tr = component
          .find(TableExpandedRow)
          .first()

        tr.find(Button)
          .last()
          .simulate('click')

        expect(onActionButtonClick).toBeCalled()
      })

      it('should call a select function callback when the select column is checked', () => {
        const { component, onSelectRow } = createComponents({
          selectable: true,
        })
        component
          .find(TableRow)
          .first()
          .find(Checkbox)
          .find('input')
          .simulate('change')

        expect(onSelectRow).toBeCalledWith([0])
      })
    })
  })
})
