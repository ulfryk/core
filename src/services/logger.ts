import { Observable } from 'rxjs/Observable';

import { LogLevel } from '../model';

export interface IEvent {
  readonly level: LogLevel;
  readonly data: any;
}

export abstract class Logger {
  public abstract getConsoleEvents(allowedLogLevels: LogLevel[]): Observable<IEvent>;
  public abstract debug(message?: any, ...optionalParams: any[]): void;
  public abstract error(message?: any, ...optionalParams: any[]): void;
  public abstract info(message?: any, ...optionalParams: any[]): void;
  public abstract log(message?: any, ...optionalParams: any[]): void;
  public abstract warn(message?: any, ...optionalParams: any[]): void;
  public abstract onCatch<T>(label: string): (err: any) => Promise<T>;
}
