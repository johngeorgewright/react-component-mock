export default function reactComponentMock(name: string) {
  return (props: Record<string, any> = {}) => {
    const stringifiedProps = stringifyProps(props)
    return `{${name}${stringifiedProps ? ` ${stringifiedProps}` : ''}}`
  }
}

function stringifyProps(props: Record<string, any>) {
  return Object.entries(props)
    .map(([key, value]) => stringifyProp(key, value))
    .join(' ')
}

function stringifyProp(key: string, value: any): string {
  switch (typeof value) {
    case 'boolean':
      return !key ? `!${key}` : key
    default:
      return `${key}=${stringifyPropValue(value)}`
  }
}

function stringifyPropValue(value: any): string {
  switch (typeof value) {
    case 'object':
      return Array.isArray(value)
        ? `[${value.map(stringifyPropValue).join(', ')}]`
        : `{ ${stringifyProps(value)} }`
    case 'string':
      return `\`${value}\``
    default:
      return value
  }
}
