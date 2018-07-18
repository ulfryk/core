export interface ITestIdProps {
  readonly 'data-e2e-id': string
}

export const getTestId = (id: string): ITestIdProps | undefined => {
  if (!Boolean(process.env.TEST)) {
    return undefined
  }
  return { ['data-e2e-id']: id }
}
