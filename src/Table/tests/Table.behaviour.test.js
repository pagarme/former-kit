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
          expandable: false,
          selectable: false,
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
          expandable: false,
          selectable: true,
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
        const {
          columns,
          component,
          rows,
          visibleColumnsCount,
        } = createComponents({
          expandable: true,
          expandedRows: [0],
          selectable: false,
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
            const { accessor, renderer } = surplusColumns[index]
            it(`should ${accessor} child exists`, () => expect(
              item.children().exists()
            ).toBe(true))
            if (renderer) {
              const nodeItem = item
                .findWhere(node => (
                  node.type() === 'p'
                  && node.find('span').exists()
                )).first()
              const text = path(accessor, rowData) || 'no data'

              it(`should ${accessor} child  use renderer function`, () => {
                expect(nodeItem.exists()).toBe(true)
                expect(nodeItem.find('span').text().trim()).toBe(text)
              })
            } else if (path(accessor, rowData)) {
              const contentSpan = item.find('span').last()
              it(`should ${accessor} child use accessor prop`, () => {
                expect(contentSpan.exists()).toBe(true)
                expect(contentSpan.text())
                  .toBe(path(accessor, rowData).toString())
              })
            } else {
              it(`should ${accessor} child be empty'`, () => expect(
                item.find(TableEmptyItem).exists()
              ).toBe(true))
            }
          })
        })
      })
    })

    describe('Rows', () => {
      it('should call a expand function when expand button is cilcked', () => {
        const { component, onExpandRow } = createComponents({
          expandable: true,
          selectable: false,
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
          expandable: true,
          expandedRows: [0],
          selectable: false,
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

    describe('Loading', () => {
      it('should render a loading text', () => {
        const { component } = createComponents({
          loading: true,
        })

        expect(component.find('tr').last().text()).toBe('loading...')
      })

      it('should render a custom renderer', () => {
        const { component } = createComponents({
          loaderRenderer: 'no puedo estoy ocupadito...',
          loading: true,
        })

        expect(component.find('tr').last().text()).toBe('no puedo estoy ocupadito...')
      })
    })
  })
})
