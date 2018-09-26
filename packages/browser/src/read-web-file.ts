import { Maybe } from 'monet'

export const readWebFile = (file: File) =>
  new Promise<string>((resolve, reject) => {

    const fileReader = new FileReader()

    fileReader.onload = (readEvent: any) => {
      Maybe.fromNull(readEvent.target).cata<void>(
        () => {
          reject('No FileReaderProgressEvent target.')
        },
        (target: FileReader) => {
          resolve(target.result as string)
        })
    }

    fileReader.onerror = () => {
      reject(fileReader.error)
    }

    fileReader.readAsText(file) // starts async read
  })
