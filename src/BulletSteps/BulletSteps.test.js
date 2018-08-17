import React from 'react'
import { mount } from 'enzyme'

import BulletSteps from './'
import BulletStep from './BulletStep'

const Component = () => (
  <BulletSteps
    status={[
      { id: 'id1', status: 'previous' },
      { id: 'id2', status: 'current' },
      { id: 'id3', status: 'next' },
    ]}
    steps={[
      { id: 'id1' },
      { id: 'id2' },
      { id: 'id3' },
    ]}
  />
)

describe('Steps', () => {
  let component
  let bulletSteps

  beforeAll(() => {
    component = mount(<Component />)

    bulletSteps = component
      .find(BulletSteps)
      .first()
      .find(BulletStep)
  })

  it('should render bullet steps', () => {
    expect(component).toHaveLength(1)
  })

  it('should have three steps', () => {
    expect(bulletSteps).toHaveLength(3)
  })

  it('should have correctly props for each step', () => {
    const stepsProps = bulletSteps.map(element => element.props())

    expect(stepsProps).toEqual([
      { status: 'previous' },
      { status: 'current' },
      { status: 'next' },
    ])
  })
})
