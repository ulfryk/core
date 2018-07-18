import { ComponentClass, ReactElement } from 'react'
import { connect } from 'react-redux'

export type ConnectClass<S = any> =
  <SP, OP = {}>(state2props: (state: S, ownProps?: OP) => SP) =>
    (comp: ComponentClass<OP & SP>) =>
      (props: OP) => ReactElement<OP>

export const connectClass = connect as any as ConnectClass
