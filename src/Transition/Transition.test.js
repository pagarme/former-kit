import React from 'react'
import { shallow, mount } from 'enzyme'
import { Transition } from './index'

const springOptions = {
  damping: 26,
  precision: 0.01,
  stiffness: 170,
}

const enterStyles = {
  opacity: 0,
  width: 0,
  zIndex: 10,
}

const activeStyles = {
  opacity: 1,
  width: 100,
}

const leaveStyles = {
  opacity: 0,
  width: 15,
}

describe('Legend', () => {
  it('should mount basic component', () => {
    const mapStyles = jest.fn()
    shallow(
      <Transition
        atActive={activeStyles}
        atEnter={enterStyles}
        atLeave={leaveStyles}
        mapStyles={mapStyles}
        springOptions={springOptions}
      >
        <div key="overlay">
          <div>
            <h3>Loading</h3>
          </div>
        </div>
      </Transition>
    )
  })

  it('should call mapStyles with correct parameters', () => {
    const mapStyles = jest.fn()
    mount(
      <Transition
        atActive={activeStyles}
        atEnter={enterStyles}
        atLeave={leaveStyles}
        mapStyles={mapStyles}
        runOnMount
        springOptions={springOptions}
      >
        <div key="overlay">
          <div>
            <h3>Loading</h3>
          </div>
        </div>
      </Transition>
    )
    expect(mapStyles).toBeCalled()
    expect(mapStyles).toBeCalledWith(enterStyles)
  })
})
