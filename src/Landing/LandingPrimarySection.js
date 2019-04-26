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
 * Layout main section, this component will apply the base
 * prop style to it children and will be positioning its
 * content in the layout's left side when the screen with
 * is bigger than 1024px otherwise it will be positioned
 * over the secondary section.
 */
const LandingPrimarySection = ({
  base,
  children,
  theme,
}) => (
  <Col
    className={
      classNames(
        theme[base],
        theme.primary,
        theme.column
      )
    }
    tv={7}
    desk={7}
    tablet={7}
    palm={12}
  >
    {children}
  </Col>
)

LandingPrimarySection.propTypes = {
  /**
   * Prop which will define the sections contrast.
   */
  base: oneOf(['dark', 'light']),
  /**
   * React elements which will stay in the main column.
   */
  children: oneOfType([element, arrayOf(element)]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    column: string,
    dark: string,
    light: string,
    primary: string,
  }),
}

LandingPrimarySection.defaultProps = {
  base: 'dark',
  children: null,
  theme: {},
}

export default consumeTheme(LandingPrimarySection)
