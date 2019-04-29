import React, { Fragment } from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { addReadme, configureReadme } from 'storybook-readme'

configureReadme({
  StoryPreview: ({ children }) => <Fragment>{children}</Fragment>,
})

addParameters({
  readme: {
    codeTheme: 'darcula',
  },
})

addDecorator(addReadme)
