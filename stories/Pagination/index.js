import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import ArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import ArrowRight from 'react-icons/lib/md/keyboard-arrow-right'
import Pagination from '../../src/Pagination'

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
          icons={{
            previous: <ArrowLeft size={13} viewBox="10 10 20 20" />,
            next: <ArrowRight size={13} viewBox="10 10 20 20" />,
          }}
          strings={this.props.strings}
        />
        {error &&
          <p>Epic fail!</p>
        }
        <p>Current page: {currentPage}</p>
        <label htmlFor="totalPages" > Total pages: {totalPages}</label>
      </div>
    )
  }
}

PaginationState.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}


storiesOf('Pagination', module)
  .add('defaultTheme', () => (
    <div>
      <h1>Pagination usage</h1>

      <section>
        <h2>Single page</h2>
        <PaginationState
          currentPage={1}
          totalPages={1}
        />
      </section>

      <section>
        <h2>First page</h2>
        <PaginationState
          currentPage={1}
          totalPages={10}
        />
      </section>

      <section>
        <h2>Intermediate page</h2>
        <PaginationState
          currentPage={5}
          totalPages={10}
        />
      </section>

      <section>
        <h2>Last page</h2>
        <PaginationState
          currentPage={10}
          totalPages={10}
        />
      </section>

      <section>
        <h2>A biiiiig number of pages</h2>
        <PaginationState
          currentPage={1}
          totalPages={10000}
        />
      </section>

      <section>
        <h2>Wrong page</h2>
        <PaginationState
          currentPage={2}
          totalPages={1}
        />
      </section>

      <section>
        <h2>Translated to portuguese</h2>
        <PaginationState
          currentPage={1}
          totalPages={10}
          strings={{
            of: 'de',
          }}
        />
      </section>

    </div>
  ))
