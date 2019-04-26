import React from 'react'
import {
  arrayOf,
  element,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'
import {
  Col,
} from '../Grid'

const consumeTheme = ThemeConsumer('UILanding')

/**
 * Layout secondary section, this component do not receive
 * a base prop and will be positioning its
 * content in the layout's right side when the screen with
 * is bigger than 1024px otherwise it will be positioned
 * under the primary section.
 */
const LandingSecondarySection = ({
  base,
  children,
  theme,
}) => (
  <Col
    tv={5}
    desk={5}
    tablet={5}
    palm={12}
    className={
      classNames(
        theme[base],
        theme.secondary,
        theme.column
      )
    }
  >
    {children}
  </Col>
)

LandingSecondarySection.propTypes = {
  /**
   * Prop which will define the sections contrast.
   */
  base: oneOf(['dark', 'light']),
  /**
   * React elements which will stay in the secondary column.
   */
  children: oneOfType([element, arrayOf(element)]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    column: string,
    secondary: string,
  }),
}

LandingSecondarySection.defaultProps = {
  base: 'light',
  children: null,
  theme: {},
}

export default consumeTheme(LandingSecondarySection)
