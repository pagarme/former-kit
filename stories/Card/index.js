import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import CardExamples from './CardExamples'

storiesOf('Cards', module)
  .add('Default', () => (
    <div>
      <Section title="Title and content">
        <CardExamples.TitleText />
      </Section>
      <Section title="Title, icon and content">
        <CardExamples.TitleIcon />
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
      <Section title="Card section with collapsible content">
        <CardExamples.CollapsableSection />
      </Section>
      <Section title="Simple card section">
        <CardExamples.SimpleSection />
      </Section>
    </div>
  ))
