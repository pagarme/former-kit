import React from 'react'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import {
  shape,
  string,
  node,
  bool,
} from 'prop-types'

const applyThemr = themr('UIGrid')

const classnames = ({
  theme,
  flex,
  stretch,
  className,
}) =>
  classNames(
    className,
    theme.row,
    {
      [theme.flex]: flex,
      [theme.stretch]: stretch,
    }
  )

const Row = ({
  theme,
  children,
  flex,
  stretch,
  className,
}) => (
  <div className={classnames({ theme, flex, stretch, className })}>
    {children}
  </div>
)

Row.propTypes = {
  theme: shape({
    row: string,
    flex: string,
    stretch: string,
  }),
  children: node,
  flex: bool,
  stretch: bool,
  className: string,
}

Row.defaultProps = {
  theme: {},
  children: null,
  flex: false,
  stretch: false,
  className: null,
}

export default applyThemr(Row)
