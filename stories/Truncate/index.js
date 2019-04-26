import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import classNames from 'classnames'
import Section from '../Section'
import Button from '../../src/Button'
import Truncate from '../../src/Truncate'
import style from './style.css'

const defaultState = { editableText: '', text: '' }

const demoText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

const TruncateState = () => {
  const [state, setState] = useState(defaultState)

  const handleClick = () => {
    setState({
      ...state,
      text: state.editableText,
    })
  }

  const handleChangeText = (evt) => {
    setState({
      ...state,
      editableText: evt.target.value,
    })
  }

  useEffect(() => {
    if (!state.text && !state.editableText) {
      setState({
        editableText: demoText,
        text: demoText,
      })
    }
  }, [state])

  return (
    <div className={style.context}>
      <textarea
        className={classNames(style.textarea, style.multiLine)}
        onChange={handleChangeText}
        value={state.editableText}
      />
      <div className={classNames(style.resizable, style.multiLine)}>
        <Truncate
          ellipsis="..."
          multiline
          resisableByWindow
          text={state.text}
          tooltipPlacement="rightMiddle"
        />
      </div>
      <div>
        <Button
          onClick={handleClick}
        >
          Fit text
        </Button>
      </div>
    </div>
  )
}

storiesOf('Truncate', module)
  .add('Inline', () => (
    <Section>
      <div className={style.singleLine}>
        <Truncate
          text={demoText}
        />
      </div>
    </Section>
  ))
  .add('Block', () => (
    <Section>
      <div className={style.multiLine}>
        <Truncate
          ellipsis="..."
          multiline
          resizableByWindow
          text={demoText}
        />
      </div>
    </Section>
  ))
  .add('Resizable block', () => <TruncateState />)
