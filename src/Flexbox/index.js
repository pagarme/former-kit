import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIFlexbox')

const Flexbox = ({
  alignItems,
  children,
  className,
  direction,
  justifyContent,
  theme,
}) => (
  <div className={classNames(theme.flexbox, className, {
      [theme.alignCenter]: alignItems === 'center',
      [theme.alignFlexEnd]: alignItems === 'flex-end',
      [theme.alignFlexStart]: alignItems === 'flex-start',
      [theme.baseline]: alignItems === 'baseline',
      [theme.column]: direction === 'column',
      [theme.columnReverse]: direction === 'column-reverse',
      [theme.justifyCenter]: justifyContent === 'center',
      [theme.justifyFlexEnd]: justifyContent === 'flex-end',
      [theme.justifyFlexStart]: justifyContent === 'flex-start',
      [theme.row]: direction === 'row',
      [theme.rowReverse]: direction === 'row-reverse',
      [theme.spaceAround]: justifyContent === 'space-around',
      [theme.spaceBetween]: justifyContent === 'space-between',
      [theme.spaceEvenly]: justifyContent === 'space-evenly',
      [theme.stretch]: alignItems === 'stretch',
    })}
  >
    {children}
  </div>
)

Flexbox.propTypes = {
  /**
   * The align-items props
   */
  alignItems: PropTypes.oneOf([
    'baseline',
    'center',
    'flex-end',
    'flex-start',
    'stretch',
  ]),
  /**
   * Children can be any html node.
   */
  children: PropTypes.node.isRequired,
  /**
   * ClassName can be used to attach your own styles.
   */
  className: PropTypes.string,
  /**
   * Control how elements will be rendered by Flexbox.
   */
  direction: PropTypes.oneOf([
    'column-reverse',
    'column',
    'row-reverse',
    'row',
  ]),
  /**
   * How childrens will be distribuited.
   */
  justifyContent: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    alignCenter: PropTypes.string,
    alignFlexEnd: PropTypes.string,
    alignFlexStart: PropTypes.string,
    baseline: PropTypes.string,
    column: PropTypes.string,
    columnReverse: PropTypes.string,
    justifyCenter: PropTypes.string,
    justifyFlexEnd: PropTypes.string,
    justifyFlexStart: PropTypes.string,
    row: PropTypes.string,
    rowReverse: PropTypes.string,
    spaceAround: PropTypes.string,
    spaceBetween: PropTypes.string,
    spaceEvenly: PropTypes.string,
    stretch: PropTypes.string,
  }),
}

Flexbox.defaultProps = {
  alignItems: 'flex-start',
  className: null,
  direction: 'row',
  justifyContent: 'flex-start',
  theme: {},
}

export default consumeTheme(Flexbox)
