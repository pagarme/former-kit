import React from 'react'
import { mount } from 'enzyme'

import Footer from './index'

const links = [
  {
    onClick: () => null,
    title: 'Documentação',
  },
  {
    onClick: () => null,
    title: 'Suporte',
  },
  {
    onClick: () => null,
    title: 'Política de Privacidade',
  },
  {
    onClick: () => null,
    title: 'Contato',
  },
]

describe('Footer', () => {
  it('should mount', () => {
    mount(
      <Footer
        links={links}
      >
        <button onClick={() => null} type="button"><svg /></button>
        <button onClick={() => null} type="button"><svg /></button>
        <button onClick={() => null} type="button"><svg /></button>
      </Footer>
    )
  })

  it('should have correct number of links', () => {
    const component = mount(
      <Footer
        links={links}
      >
        <button onClick={() => null} type="button"><svg /></button>
        <button onClick={() => null} type="button"><svg /></button>
        <button onClick={() => null} type="button"><svg /></button>
      </Footer>
    )

    expect(component.find('nav').first().find('button')).toHaveLength(links.length)
  })
})
