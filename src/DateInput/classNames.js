import classNames from 'classnames'

export const inputClasses = ({ theme, focused, active, error }) => classNames(
  theme.dateInput,
  {
    [theme.focus]: !error && focused,
    [theme.active]: !error && active,
    [theme.error]: error,
  }
)

export const startClasses = ({
  theme,
  showDateSelector,
  focusedInput,
  isValid,
}) =>
  classNames(
    theme.start,
    {
      [theme.active]: isValid && focusedInput === 'startDate' && showDateSelector,
      [theme.error]: !isValid,
    }
  )

export const endClasses = ({
  theme,
  showDateSelector,
  focusedInput,
  isValid,
}) =>
  classNames(
    theme.end,
    {
      [theme.active]: isValid && focusedInput === 'endDate' && showDateSelector,
      [theme.error]: !isValid,
    }
  )
