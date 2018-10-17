import React from 'react'
import { shallow, mount } from 'enzyme'
import { Transition } from './index'

const springOptions = {
  damping: 26,
  precision: 0.01,
  stiffness: 170,
}

const enterStyles = {
  width: 0,
  zIndex: 10,
  opacity: 0,
}

const activeStyles = {
  width: 100,
  opacity: 1,
}

const leaveStyles = {
  width: 15,
  opacity: 0,
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
        <div key="overlay" >
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
        <div key="overlay" >
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
