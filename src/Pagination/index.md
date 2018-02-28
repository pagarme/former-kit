#### **Example** ####

``` jsx
class PaginationState extends React.Component {
  constructor (props) {
    super(props)

    const {
      currentPage,
      totalPages,
    } = props

    this.state = {
      currentPage: currentPage || 1,
      totalPages: totalPages || 10,
    }

    this.pageChanged = this.pageChanged.bind(this)
  }

  pageChanged (page) {
    this.setState({
      currentPage: page,
    })
  }

  render () {
    const { currentPage, totalPages } = this.state

    const error = totalPages < currentPage || currentPage === 0

    return (
      <div style={{ padding: '10px' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.pageChanged}
          strings={this.props.strings}
        />
      </div>
    )
  }
}

<PaginationState currentPage={1} totalPages={10} />
```
