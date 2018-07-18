import { Maybe } from 'monet';

export const readWebFile = (file: File) =>
  new Promise<string>((resolve, reject) => {

    const fileReader = new FileReader();

    fileReader.onload = (readEvent: FileReaderProgressEvent) => {
      Maybe.fromNull(readEvent.target).cata(
        () => {
          reject('No FileReaderProgressEvent target.');
        },
        (target: FileReader) => {
          resolve(target.result);
        });
    };

    fileReader.onerror = () => {
      reject(fileReader.error);
    };

    fileReader.readAsText(file); // starts async read
  });
