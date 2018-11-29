import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import DoubleImageCta from './index'

const mockData = {
  link_text: [{ text: 'Lorem ipsum' }]
}

storiesOf('DoubleImageCta', module).add('default', () => (
  <DoubleImageCta primary={mockData} />
))
