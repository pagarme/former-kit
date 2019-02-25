import classNames from 'classnames'

export const inputClasses = ({
  theme,
  focused,
  active,
  error,
}) => classNames(
  theme.dateInput,
  {
    [theme.focus]: !error && focused,
    [theme.active]: !error && active,
    [theme.error]: error,
  }
)

export const startClasses = ({
  theme,
  focusedInput,
  isValid,
}) =>
  classNames(
    theme.start,
    {
      [theme.active]: isValid && focusedInput === 'startDate',
      [theme.error]: !isValid,
    }
  )

export const endClasses = ({
  theme,
  focusedInput,
  isValid,
}) =>
  classNames(
    theme.end,
    {
      [theme.active]: isValid && focusedInput === 'endDate',
      [theme.error]: !isValid,
    }
  )
