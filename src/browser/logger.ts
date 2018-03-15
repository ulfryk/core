import { Inject, Injectable } from '@samwise-tech/di';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Bind } from '../decorators';
import { LogLevel } from '../model';
import { IEvent, Logger } from '../services';
import { JsConsole } from './js-console';

type ConsoleMethod = 'debug' | 'error' | 'info' | 'log' | 'warn';

@Injectable()
class BrowserLogger extends Logger {

  private readonly events$ = new Subject<IEvent>();

  constructor(
    @Inject(JsConsole) private readonly console: JsConsole,
  ) {
    super();
    Bind.to(this);
  }

  @Bind public getConsoleEvents(allowedLogLevels: LogLevel[]): Observable<IEvent> {
    return this.events$
      .filter(({ level }) => allowedLogLevels.includes(level));
  }

  @Bind public log(...args: any[]): void {
    this.callMethod(LogLevel.Log, ...args);
  }

  @Bind public warn(warnMsg: any, ...args: any[]): void {
    this.callMethod(LogLevel.Warn, ...[warnMsg, ...args]);
  }

  @Bind public error(errMsg: any): void {
    const error = errMsg instanceof Error ? errMsg : new Error(errMsg);
    this.callMethod(LogLevel.Error, error);
  }

  @Bind public debug(...args: any[]): void {
    this.callMethod(LogLevel.Debug, ...args);
  }

  @Bind public info(infoMsg: any, ...args: any[]): void {
    this.callMethod(LogLevel.Info, ...[infoMsg, ...args]);
  }

  public onCatch<T>(label: string) {
    return (err: any) => {
      if (err instanceof Error) {
        this.error(err);
      } else {
        this.error(label);
        this.debug(`${label} Due:`, err);
      }
      return Promise.reject<T>(err);
    };
  }

  private callMethod(level: LogLevel, ...args: any[]): void {
    if (process.env.NODE_ENV !== 'production') {
      this.events$.next({ level, data: args });
      (this.console[level as ConsoleMethod] as (...args: any[]) => void)(...args);
    }
  }

}

export { BrowserLogger };
