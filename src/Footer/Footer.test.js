import React from 'react'
import { mount } from 'enzyme'

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
        <button onClick={() => null}><svg /></button>
        <button onClick={() => null}><svg /></button>
        <button onClick={() => null}><svg /></button>
      </Footer>
    )
  })

  it('should have correct number of links', () => {
    const component = mount(
      <Footer
        links={links}
      >
        <button onClick={() => null}><svg /></button>
        <button onClick={() => null}><svg /></button>
        <button onClick={() => null}><svg /></button>
      </Footer>
    )

    expect(component.find('nav').first().find('button')).toHaveLength(links.length)
  })
})
