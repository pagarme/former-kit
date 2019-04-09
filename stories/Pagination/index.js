import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'

import Pagination from '../../src/Pagination'
import Section from '../Section'

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
    const {
      disabled,
      format,
      size,
      strings,
    } = this.props

    const error = totalPages < currentPage || currentPage === 0

    return (
      <div>
        <Pagination
          currentPage={currentPage}
          disabled={disabled}
          format={format}
          onPageChange={this.pageChanged}
          size={size}
          strings={strings}
          totalPages={totalPages}
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
  format: PropTypes.oneOf([
    'range',
    'single',
  ]),
}

PaginationState.defaultProps = {
  format: 'range',
}


storiesOf('Pagination', module)
  .add('Default', () => (
    <div>
      <Section title="Default">
        <PaginationState
          currentPage={2}
          totalPages={8}
        />
      </Section>

      <Section title="Tiny size">
        <PaginationState
          currentPage={2}
          size="tiny"
          totalPages={8}
        />
      </Section>

      <Section title="Single page">
        <PaginationState
          currentPage={1}
          totalPages={1}
        />
      </Section>

      <Section title="First page">
        <PaginationState
          currentPage={1}
          totalPages={10}
        />
      </Section>

      <Section title="Intermediate page">
        <PaginationState
          currentPage={5}
          totalPages={10}
        />
      </Section>

      <Section title="Last page">
        <PaginationState
          currentPage={10}
          totalPages={10}
        />
      </Section>

      <Section title="So many pages">
        <PaginationState
          currentPage={1}
          totalPages={10000}
        />
      </Section>

      <Section title="Wrong page">
        <PaginationState
          currentPage={2}
          totalPages={1}
        />
      </Section>

      <Section title="Translated to portuguese">
        <PaginationState
          currentPage={1}
          totalPages={10}
          strings={{
            of: 'de',
          }}
        />
      </Section>

      <Section title="With disabled prop">
        <PaginationState
          currentPage={1}
          totalPages={10}
          disabled
        />
      </Section>

      <Section title="Single Format">
        <PaginationState
          currentPage={1}
          totalPages={10}
          format="single"
        />
      </Section>
    </div>
  ))
