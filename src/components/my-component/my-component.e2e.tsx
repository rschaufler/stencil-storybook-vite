import { render, h, describe, it, expect } from '@stencil/vitest'

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await render(<my-component />)
    expect(root).toHaveClass('hydrated')
  })
})
