import classNames from 'classnames'

export const inputClasses = ({
  active,
  error,
  focused,
  theme,
}) => classNames(
  theme.dateInput,
  {
    [theme.focus]: !error && focused,
    [theme.active]: !error && active,
    [theme.error]: error,
  }
)

export const startClasses = ({
  focusedInput,
  isValid,
  theme,
}) => classNames(
  theme.start,
  {
    [theme.active]: isValid && focusedInput === 'startDate',
    [theme.error]: !isValid,
  }
)

export const endClasses = ({
  focusedInput,
  isValid,
  theme,
}) => classNames(
  theme.end,
  {
    [theme.active]: isValid && focusedInput === 'endDate',
    [theme.error]: !isValid,
  }
)
