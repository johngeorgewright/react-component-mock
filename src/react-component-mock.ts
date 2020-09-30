export default function reactComponentMock(name: string) {
  return (props: Record<string | symbol, any> = {}) => {
    const stringifiedProps = stringifyProps(props)
    return `{${name}${stringifiedProps ? ` ${stringifiedProps}` : ''}}`
  }
}

function stringifyProps(props: Record<string | symbol, any>) {
  return Object.entries(props)
    .map(([key, value]) => stringifyProp(key, value))
    .join(' ')
}

function stringifyProp(key: string | symbol, value: any): string {
  switch (typeof value) {
    case 'boolean':
      return !value ? `!${key.toString()}` : key.toString()
    default:
      const m = key.toString()
      return `${m}=${stringifyPropValue(value)}`
  }
}

function stringifyPropValue(value: any): string {
  switch (typeof value) {
    case 'object':
      return value === null
        ? 'null'
        : Array.isArray(value)
        ? `[${value.map(stringifyPropValue).join(', ')}]`
        : value.hasOwnProperty('$$typeof') // react component
        ? reactComponentMock(
            typeof value.type === 'function' ? value.type.name : value.type
          )(value.props)
        : `{ ${stringifyProps(value)} }`
    case 'string':
      return `\`${value}\``
    default:
      return value.toString()
  }
}
