import React from 'react'

import { storiesOf } from '@storybook/react'

import style from './style.css'

storiesOf('Typography', module)
  .add('Famílias de Fonte', () => (
    <div className={style.fontBook}>
      <div>
        <span>Heading 1</span>
        <h1>Assistant 24</h1>
      </div>
      <div>
        <span>Heading 2</span>
        <h2>Assistant 20</h2>
      </div>
      <div>
        <span>Heading 3</span>
        <h3>Assistant 18</h3>
      </div>
      <div>
        <span>Body</span>
        <div>
          <p>
            Assistant Regular 14
          </p>
          <p>
            <i>
              Assistant Italic 14
            </i>
          </p>
          <p>
            <b>
              Assistant Bold 14
            </b>
          </p>
        </div>
      </div>
    </div>
  ))
  .add('Aplicações', () => (
    <div>
      <h1>Parágrafo</h1>
      <p>
        Curabitur at finibus neque. In efficitur sapien ut lectus suscipit
        consequat. Proin eget aliquam leo.
        <a href="http://www.lipsum.com">Maecenas mattis</a>&nbsp;
        quis nisi vel venenatis. Proin sit amet purus nec magna ornare
        iaculis. Curabitur at finibus neque. In efficitur sapien ut lectus
        suscipit consequat. Proin eget aliquam leo. Maecenas mattis quis nisi
        vel venenatis. Proin sit amet ec
        <a href="http://www.lipsum.com">magna ornare</a> iaculis.
      </p>
      <h1>Listas</h1>
      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <ul>
          <li>Lorem ipsum dolor sit amet</li>
          <ul>
            <li>Lorem ipsum dolor sit amet</li>
          </ul>
        </ul>
        <li>Lorem ipsum dolor sit amet</li>
      </ul>
      <h1>Citação</h1>
      <blockquote>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with
        desktop publishing software like Aldus PageMaker including versions of
        Lorem Ipsum.
      </blockquote>
    </div>
  ))

