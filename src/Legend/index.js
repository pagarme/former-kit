import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { themr } from 'react-css-themr'
import {
  pipe,
  split,
  map,
  join,
  toUpper,
  head,
} from 'ramda'

const applyThemr = themr('UILegend')

const defineInitials = pipe(
  split(' '),
  map(head),
  join(''),
  toUpper
)

const Legend = ({
  color,
  children,
  outline,
  acronym,
  hideLabel,
  theme,
}) => {
  const labelClasses = cx(
    theme.acronym,
    {
      [theme.outline]: outline,
    }
  )

  return (
    <div className={theme.legend}>
      <abbr
        title={children}
        className={labelClasses}
        style={{ background: color }}
      >
        {acronym || defineInitials(children)}
      </abbr>
      {!hideLabel &&
        <span className={theme.text}>
          {children}
        </span>
      }
    </div>
  )
}

Legend.propTypes = {
  theme: PropTypes.shape({
    acronym: PropTypes.string,
    outline: PropTypes.string,
    legend: PropTypes.string,
    text: PropTypes.string,
  }),
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  acronym: PropTypes.string,
  hideLabel: PropTypes.bool,
}

Legend.defaultProps = {
  theme: {},
  outline: false,
  acronym: '',
  hideLabel: false,
}

export default applyThemr(Legend)
