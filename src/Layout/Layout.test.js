import React from 'react'
import { mount } from 'enzyme'
import Layout from './index'
import { Header } from '../Header'
import Footer from '../Footer'
import {
  Sidebar,
  SidebarHeader,
} from '../Sidebar'

const links = [
  {
    onClick: () => {},
    title: 'Documentação',
  },
]

const SidebarExample = () => (
  <Sidebar>
    <SidebarHeader>
      <p>Pagar.me</p>
    </SidebarHeader>
  </Sidebar>
)

const HeaderExample = () => (<Header>Open source</Header>)

const FooterExample = () => (<Footer links={links}>Github</Footer>)

describe('Layout', () => {
  it('should render component with all props', () => {
    const component = mount(
      <Layout
        sidebar={<SidebarExample />}
        header={<HeaderExample />}
        footer={<FooterExample />}
      >
        Former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(true)
    expect(component.find(Header).first().exists()).toBe(true)
    expect(component.find(Footer).first().exists()).toBe(true)
  })

  it('should render component without Sidebar', () => {
    const component = mount(
      <Layout
        header={<HeaderExample />}
        footer={<FooterExample />}
      >
        Former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(false)
    expect(component.find(Header).first().exists()).toBe(true)
    expect(component.find(Footer).first().exists()).toBe(true)
  })

  it('should render component without Header', () => {
    const component = mount(
      <Layout
        sidebar={<SidebarExample />}
        footer={<FooterExample />}
      >
        Former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(true)
    expect(component.find(Header).first().exists()).toBe(false)
    expect(component.find(Footer).first().exists()).toBe(true)
  })

  it('should render component without Footer', () => {
    const component = mount(
      <Layout
        sidebar={<SidebarExample />}
        header={<HeaderExample />}
      >
        Former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(true)
    expect(component.find(Header).first().exists()).toBe(true)
    expect(component.find(Footer).first().exists()).toBe(false)
  })

  it('should render component only with Sidebar', () => {
    const component = mount(
      <Layout
        sidebar={<SidebarExample />}
      >
        Former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(true)
    expect(component.find(Header).first().exists()).toBe(false)
    expect(component.find(Footer).first().exists()).toBe(false)
  })

  it('should render component only with Header', () => {
    const component = mount(
      <Layout
        header={<HeaderExample />}
      >
        former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(false)
    expect(component.find(Header).first().exists()).toBe(true)
    expect(component.find(Footer).first().exists()).toBe(false)
  })

  it('should render component only with Footer', () => {
    const component = mount(
      <Layout
        footer={<FooterExample />}
      >
        former-kit
      </Layout>
    )

    expect(component.find(Sidebar).first().exists()).toBe(false)
    expect(component.find(Header).first().exists()).toBe(false)
    expect(component.find(Footer).first().exists()).toBe(true)
  })
})
