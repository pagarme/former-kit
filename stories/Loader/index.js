import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Section from '../Section'

import {
  Card,
  CardContent,
  CardTitle,
  CardActions,
} from '../../src/Card'
import Button from '../../src/Button'
import withLoader from '../../src/Loader'
import styles from './style.css'

const observeLoading = action('loading')

const withLoaderSpinner = withLoader(
  <div className={styles.overlay} id="using-id-as-key">
    <span className={styles.spinner} />
  </div>
)

const CardExample = ({ onClick }) => (
  <Card>
    <CardTitle
      title={
        <h2>
          Lorem ipsum <small>dolor sit amet</small>
        </h2>
      }
      subtitle="Lorem ipsum"
    />
    <CardContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
      venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
      blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
      In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
      sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
      feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
    </CardContent>
    <CardActions>
      <Button onClick={onClick}>load</Button>
    </CardActions>
  </Card>
)

const CardWithLoader = withLoaderSpinner(CardExample)

class CardLoader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ loading: true }, () => observeLoading(this.state.loading))
    setTimeout(
      () => this.setState({
        loading: false,
      }, () => observeLoading(this.state.loading)),
      1000
    )
  }

  render () {
    const { loading } = this.state

    return (
      <Section title="Loader">
        <CardWithLoader
          loading={loading}
          onClick={this.handleClick}
        />
      </Section>
    )
  }
}

storiesOf('Loader', module)
  .add('Default', () => <CardLoader />)
