import React from 'react'
import { shallow } from 'enzyme'

import Tag from './index'

describe('Tag', () => {
  it('should mount', () => {
    shallow(
      <Tag>Hello world</Tag>
    )
  })
})
