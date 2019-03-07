import { isMoment } from 'moment'

export default (props, propName) => {
  const propValue = props[propName]

  if (propValue && !isMoment(propValue)) {
    return new Error(`Prop ${propName} must be an instance of Moment`)
  }

  return null
}
