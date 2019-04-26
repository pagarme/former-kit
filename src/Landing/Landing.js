import React from 'react'
import {
  arrayOf,
  element,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'
import {
  Grid,
  Row,
} from '../Grid'

const consumeTheme = ThemeConsumer('UILanding')

/**
 * Provides an interface to create a simple layout,
 * with two sections of content with a contrast based
 * on the place where it's applyed, this contrast can
 * be changed using the prop base in the sections.
 * This component children must be a PrimarySection and a
 * SecondarySection components.
 */
const Landing = ({
  children,
  className,
  theme,
}) => (
  <div className={classNames(theme.container, className)}>
    <Grid fullHeight>
      <Row stretch>
        {children}
      </Row>
    </Grid>
  </div>
)

Landing.propTypes = {
  /**
   * React elements which will stay in the secondary column.
  */
  children: oneOfType([
    element,
    arrayOf(element),
  ]),
  /**
   * Custom CSS classes.
   */
  className: string,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    column: string,
    columnContainer: string,
    container: string,
    dark: string,
    light: string,
  }),
}

Landing.defaultProps = {
  children: null,
  className: '',
  theme: {},
}

export default consumeTheme(Landing)
