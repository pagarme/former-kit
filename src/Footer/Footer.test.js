import React from 'react'
import { mount } from 'enzyme'
import MdAirplanemodeActive from 'react-icons/lib/md/airplanemode-active'

import Footer from './index'

const links = [
  {
    title: 'Documentação',
    onClick: () => null,
  },
  {
    title: 'Suporte',
    onClick: () => null,
  },
  {
    title: 'Política de Privacidade',
    onClick: () => null,
  },
  {
    title: 'Contato',
    onClick: () => null,
  },
]

describe('Footer', () => {
  it('should mount', () => {
    mount(
      <Footer
        links={links}
      >
        <button onClick={() => null}><MdAirplanemodeActive /></button>
        <button onClick={() => null}><MdAirplanemodeActive /></button>
        <button onClick={() => null}><MdAirplanemodeActive /></button>
      </Footer>
    )
  })

  it('should have correct number of links', () => {
    const component = mount(
      <Footer
        links={links}
      >
        <button onClick={() => null}><MdAirplanemodeActive /></button>
        <button onClick={() => null}><MdAirplanemodeActive /></button>
        <button onClick={() => null}><MdAirplanemodeActive /></button>
      </Footer>
    )

    expect(component.find('nav').first().find('a')).toHaveLength(links.length)
  })
})
