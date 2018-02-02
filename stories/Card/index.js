import React from 'react'
import { storiesOf } from '@storybook/react'

import CardExamples from './CardExamples'

storiesOf('Cards', module)
  .add('default theme', () => (
    <div>
      <section>
        <h2>Title and content</h2>
        <CardExamples.TitleText />
      </section>
      <section>
        <h2>Title, icon and content</h2>
        <CardExamples.TitleIcon />
      </section>
      <section>
        <h2>Title, content and actions</h2>
        <CardExamples.TitleTextActions />
      </section>
      <section>
        <h2>Graphic, title, content and actions</h2>
        <CardExamples.GraphicTitleTextActions />
      </section>
      <section>
        <h2>Title on event handler</h2>
        <CardExamples.TitleTextAdvanced />
      </section>
      <section>
        <h2>Card section with collapsible content</h2>
        <CardExamples.CollapsableSection />
      </section>
      <section>
        <h2>Simple card section</h2>
        <CardExamples.SimpleSection />
      </section>
    </div>
  ))
