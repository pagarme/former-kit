import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import IconUser from 'emblematic-icons/svg/User32.svg'

import Section from '../Section'
import Image from '../../src/Image'

storiesOf('Image', module)
  .add('default', () => (
    <Fragment>
      <Section title="With valid source">
        <Image
          alt="Pagar.me"
          fallback={<span>The image cannot be loaded</span>}
          source="https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg"
          width={200}
        />
      </Section>

      <Section title="With invalid source">
        <Image
          alt="Pagar.me"
          fallback={<span>The image cannot be loaded</span>}
          source="aaa"
        />
      </Section>

      <Section title="With invalid source and element fallback">
        <Image
          alt="Pagar.me"
          fallback={<IconUser width={32} height={32} />}
          source="aaa"
        />
      </Section>
    </Fragment>
  ))
