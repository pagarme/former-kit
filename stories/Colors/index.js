import React from 'react'

import { storiesOf } from '@storybook/react'
import {
  groupBy,
  mapObjIndexed,
  pipe,
} from 'ramda'

import style from './style.css'

const groupByColorName = groupBy(prop => prop.split('-')[4])
const sortColorNumber = (a, b) => +a.split('-')[5] < +b.split('-')[5]
const groupItemsAndSort = pipe(
  groupByColorName,
  mapObjIndexed(colorList => colorList.sort(sortColorNumber))
)

const getThemeColors = (theme) => {
  const isRoot = rule => rule.selectorText === ':root'
  const isColorProperty = prop => prop.startsWith(theme)

  const result = Array.from(document.styleSheets).reduce((accProperties, sheet) => {
    const rules = Array.from(sheet.cssRules).filter(isRoot)

    const cssText = rules.reduce((acc, rule) => {
      let themeProperties = Array.from(rule.style).filter(isColorProperty)

      themeProperties = themeProperties.filter(prop => !acc.includes(prop))

      return acc.concat(themeProperties)
    }, [])

    return accProperties.concat(cssText)
  }, [])

  return groupItemsAndSort(result)
}


class Colors extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      colors: [],
    }
  }

  componentWillMount () {
    const theme = getThemeColors(this.props.theme)

    this.setState({
      colorNames: Object.keys(theme),
      colors: theme,
    })
  }

  render () {
    return (
      <div className={style.container}>
        {this.state.colorNames.map(name => (
          <div key={name}>
            <h2>{name}</h2>

            <div>
              {this.state.colors[name].map(customProp => (
                <div key={customProp}>
                  <div
                    style={{ background: `var(${customProp})` }}
                    className={style.row}
                  >
                    <div className={style.rowText}>
                      {customProp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

storiesOf('Colors', module)
  .add('all', () => (
    <div className={style.root}>
      <h1>Light Theme</h1>
      <Colors theme="--color-light" />
    </div>
  ))
