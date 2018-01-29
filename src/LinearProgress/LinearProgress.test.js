import React from 'react'
import { shallow } from 'enzyme'

import LinearProgress from './index'

describe('LinearProgress', () => {
  it('should mount basic component', () => {
    shallow(
      <LinearProgress
        percent={25}
      />
    )
  })

  it('should mount with disabled', () => {
    shallow(
      <LinearProgress
        disabled
        percent={75}
      />
    )
  })
})
