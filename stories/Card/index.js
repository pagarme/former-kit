import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import CardExamples from './CardExamples'
import CardSectionDoubleLineTitle from './CardSectionDoubleLineTitle'
import CardSectionTitle from './CardSectionTitle'
import CardSectionTitleBottom from './CardSectionTitleBottom'
import Section from '../Section'

storiesOf('Cards', module)
  .add('Default', () => (
    <div>
      <Section title="Custom title, subtitle and content">
        <CardExamples.TitleText />
      </Section>
      <Section title="Title, subtitle, icon and content">
        <CardExamples.TitleIcon />
      </Section>
      <Section title="Title, custom subtitle, icon and content">
        <CardExamples.TitleCustomSubtitle />
      </Section>
      <Section title="Title, content and actions">
        <CardExamples.TitleTextActions />
      </Section>
      <Section title="Graphic, title, content and actions">
        <CardExamples.GraphicTitleTextActions />
      </Section>
      <Section title="Title on event handler">
        <CardExamples.TitleTextAdvanced />
      </Section>
      <Section title="Simple card section">
        <CardExamples.SimpleSection />
      </Section>
      <Section title="Card section with collapsible content">
        <CardSectionTitle />
      </Section>
      <Section title="Card section with collapsible content and expanded title at bottom">
        <CardSectionTitleBottom />
      </Section>
      <Section title="Card section with icon on the left">
        <CardSectionDoubleLineTitle
          subtitle="Verifique ou edite as informações da sua empresa"
        />
      </Section>
      <Section title="Card section with node subtitle">
        <CardSectionDoubleLineTitle
          subtitle={(
            <Fragment>
              <span>Bem vindo</span>
              <strong> usuário</strong>
            </Fragment>
          )}
        />
      </Section>
    </div>
  ))
