import { ReactElement } from 'react'
import { connect } from 'react-redux'

export type ConnectPure<S = any, OP = {}> =
  <SP>(state2props: (state: S, ownProps?: OP) => SP) =>
    (comp: (props: SP & OP) => ReactElement<SP & OP>) =>
      (props: OP) => ReactElement<OP>

export const connectPure = connect as any as ConnectPure
