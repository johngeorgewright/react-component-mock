import reactComponentMock from './react-component-mock'

test('no props', () => {
  expect(reactComponentMock('Foo')()).toMatchInlineSnapshot(`"{Foo}"`)
})

test('basic props', () => {
  expect(
    reactComponentMock('Foo')({ foo: 'bar', num: 123, bool: true })
  ).toMatchInlineSnapshot(`"{Foo foo=\`bar\` num=123 bool}"`)
})

test('array props', () => {
  expect(
    reactComponentMock('Foo')({
      nums: [1, 2, 3],
      strs: ['a', 'b', 'c'],
      nested: [
        ['a', 'b'],
        ['c', 'd'],
      ],
    })
  ).toMatchInlineSnapshot(
    `"{Foo nums=[1, 2, 3] strs=[\`a\`, \`b\`, \`c\`] nested=[[\`a\`, \`b\`], [\`c\`, \`d\`]]}"`
  )
})

test('nested', () => {
  expect(
    reactComponentMock('Foo')({ obj: { obj2: { foo: 'bar' } } })
  ).toMatchInlineSnapshot(`"{Foo obj={ obj2={ foo=\`bar\` } }}"`)
})
