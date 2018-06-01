import React from 'react'
import { mount } from 'enzyme'

import Image from './index'

describe('Image', () => {
  it('should mount with no errors', () => {
    const component = mount(
      <Image
        source="https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg"
        alt="Pagar.me"
        fallback={<svg />}
      />
    )

    expect(component).toHaveLength(1)
  })

  it('should render an image', () => {
    const component = mount(
      <Image
        source="https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg"
        alt="Pagar.me"
        fallback={<svg />}
      />
    )

    expect(component.find('img')).toHaveLength(1)
  })
})
