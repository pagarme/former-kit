/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, setAddon, getStorybook } from '@storybook/react'
import createPercyAddon from '@percy-io/percy-storybook'
import mockDate from 'mockdate'
import inPercy from '@percy-io/in-percy'

if (inPercy()) {
  mockDate.set(1506815400000)
}

const { percyAddon, serializeStories } = createPercyAddon()

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
setAddon(percyAddon)

serializeStories(getStorybook)
