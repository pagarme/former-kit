import React, { Component } from 'react'
import {
  element,
  func,
  number,
  oneOf,
  shape,
  string,
} from 'prop-types'
import { isNil } from 'ramda'
import shortid from 'shortid'
import classNames from 'classnames'
import Button from '../Button'
import {
  fade,
  Transition,
} from '../Transition'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISnackbar')

/**
 * The Snackbar component exists to inform the users certain actions he did
 * in the page.
 */
class Snackbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: true,
    }

    this.id = shortid.generate()

    this.handleDismiss = this.handleDismiss.bind(this)

    if (props.dismissTimeout) {
      setTimeout(this.handleDismiss, props.dismissTimeout)
    }
  }

  handleDismiss () {
    this.setState({
      visible: false,
    })
  }

  render () {
    const {
      children,
      icon,
      onDismiss,
      theme,
      type,
    } = this.props
    const { visible } = this.state
    return (
      <Transition
        atActive={fade.atActive}
        atEnter={fade.atEnter}
        atLeave={fade.atLeave}
        didLeave={onDismiss}
        mapStyles={fade.mapStyles}
        runOnMount
        springOptions={fade.springOptions}
      >
        {visible && (
          <div
            className={classNames(theme.snackbar, theme[type])}
            key={this.id}
          >
            <div className={theme.content}>
              {children}
            </div>
            {!isNil(onDismiss) && (
              <Button
                fill="clean"
                icon={icon}
                iconAlignment="end"
                onClick={this.handleDismiss}
              />
            )}
          </div>
        )}
      </Transition>
    )
  }
}

Snackbar.propTypes = {
  /**
  * The children prop allow you to pass React components as content for the Snackbar,
  * so anything inside tag <Snackbar> gets in the Snackbar component as a prop.
  * Remember the content received in this prop must be a React element.
   */
  children: element.isRequired,
  /**
  * The time which the Snackbar will wait to call the  callback action after
  * Snackbar visibility fades out.
  * It must receive a number representing the milliseconds for the component to disappear.
  * Giving the dismissTimeOut as a prop inside the tag <Snackbar> will make the component
  * to call the onDismiss props (which is a function) after the set milliseconds.
   */
  dismissTimeout: number,
  /**
  * The close icon which must receive a React element its behavior is like a button,
  * which it really is.
  * The generated button will trigger the fade animation and call the onDismiss function.
   */
  icon: element,
  /**
   * The action callback. This action will only be called after the button click.
   */
  onDismiss: func,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    error: string,
    icon: string,
    info: string,
    success: string,
    warning: string,
  }),
  /**
   * The types the snackbar can have. The background color changes based on the
   * class related to the defined type.
   */
  type: oneOf([
    'error',
    'info',
    'success',
    'warning',
  ]).isRequired,
}

Snackbar.defaultProps = {
  dismissTimeout: 0,
  icon: null,
  onDismiss: null,
  theme: {},
}

export default consumeTheme(Snackbar)
