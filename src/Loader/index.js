import React from 'react'
import { curry } from 'ramda'
import PropTypes from 'prop-types'
import { fade, Transition } from '../Transition'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UILoader')

const withLoader = curry((renderer, Component) => {
  const Loader = ({ loading, theme, ...props }) => (
    <div className={theme.container}>
      <Transition
        atActive={fade.atActive}
        atEnter={fade.atEnter}
        atLeave={fade.atLeave}
        mapStyles={fade.mapStyles}
        springOptions={fade.springOptions}
      >
        {loading &&
          React.cloneElement(renderer, { key: renderer.props.id || 'loader' })
        }
      </Transition>
      <Component {...props} />
    </div>
  )

  Loader.propTypes = {
    loading: PropTypes.bool,
    theme: PropTypes.shape({
      container: PropTypes.string.isRequired,
    }),
  }

  Loader.defaultProps = {
    loading: false,
    theme: {},
  }

  return consumeTheme(Loader)
})

export default withLoader
