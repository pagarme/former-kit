import {
  createComponents,
} from './common'

const allProps = createComponents()

const noSelectable = createComponents({
  selectable: false,
})

const noExpandable = createComponents({
  expandable: false,
})

const columnLimit = createComponents({
  columnsNumber: 8,
})

const aggregationRow = createComponents({
  showAggregationRow: true,
})

const columnsCases = [
  {
    name: 'with all props',
    ...allProps,
  },
  {
    name: 'with no selectable',
    ...noSelectable,
  },
  {
    name: 'with no expandable',
    ...noExpandable,
  },
  {
    name: 'with a column limit',
    ...columnLimit,
  },
]

const rowsCases = [
  {
    name: 'with all props',
    ...allProps,
  },
  {
    name: 'with no selectable',
    ...noSelectable,
  },
  {
    name: 'with no expandable',
    ...noExpandable,
  },
  {
    name: 'with a column limit',
    ...columnLimit,
  },
  {
    name: 'with a aggregation row',
    ...aggregationRow,
  },
]

export {
  columnsCases,
  rowsCases,
}
