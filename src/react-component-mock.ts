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
        ? stringifyArray(value)
        : isReactComponent(value)
        ? strinigifyReactComponent(value)
        : stringifyObject(value)
    case 'string':
      return `\`${value}\``
    default:
      return value.toString()
  }
}

function stringifyArray(array: any[]) {
  return `[${array.map(stringifyPropValue).join(', ')}]`
}

function strinigifyReactComponent(component: Component) {
  return reactComponentMock(
    typeof component.type === 'function' ? component.type.name : component.type
  )(component.props)
}

function stringifyObject(object: Record<string | symbol, any>) {
  return `{ ${stringifyProps(object)} }`
}

function isReactComponent(x: any): x is Component {
  return x.hasOwnProperty('$$typeof') && x.hasOwnProperty('type')
}

interface Component {
  $$typeof: symbol
  type: string | Function
  props?: Record<string | symbol, any>
}
