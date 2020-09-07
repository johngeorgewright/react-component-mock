# react-component-mock

A simple way to mock react components when testing.

The module creates a new component which will render a string representation of the component and it's props

## Install

````
npm i -D @johngw/react-component-mock

## Usage (Jest)

```typescript
// App.tsx

import React from 'react'
import Hello from './Hello'

export default function App() {
  return <Hello name="World" />
}
````

```typescript
// __mocks__/Hello.tsx

import reactComponentMock from 'react-component-mock'

export default reactComponentMock('Hello')
```

```typescript
// __tests__/App.test.tsx

import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

jest.mock('../Hello')

test('App', () => {
  const { container } = render(<App />)
  expect(container).toMatchInlineSnapshot(`
    {Hello name=\`World\`}
  `)
})
```
