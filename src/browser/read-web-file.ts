export interface IFileReadEvent extends Event {
  readonly target: EventTarget & { readonly result: string; };
}

export const readWebFile = (file: File) =>
  new Promise<string>((resolve, reject) => {

    const fileReader = new FileReader();

    fileReader.onload = (readEvent: IFileReadEvent) => {
      resolve(readEvent.target.result);
    };

    fileReader.onerror = () => {
      reject(fileReader.error);
    };

    fileReader.readAsText(file); // starts async read
  });
