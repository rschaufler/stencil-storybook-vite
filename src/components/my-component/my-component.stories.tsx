import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import { Components } from '../../components'

const meta: Meta = {
  title: 'Components/MyComponent',
  parameters: {
    layout: 'fullscreen'
  },
  render: (args: Components.MyComponent) =>
    html`<my-component
      first=${ifDefined(args.first)}
      middle=${ifDefined(args.middle)}
      last=${ifDefined(args.last)}
    >
    </my-component>`
}

export default meta

type Story = StoryObj<Components.MyComponent>

export const MyComponent: Story = {
  args: {
    first: 'John',
    middle: 'Max',
    last: 'Doe'
  }
}
