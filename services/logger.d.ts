import { Observable } from 'rxjs/Observable';
import { LogLevel } from '../model';
export interface IEvent {
    readonly level: LogLevel;
    readonly data: any;
}
export declare abstract class Logger {
    abstract getConsoleEvents(allowedLogLevels: LogLevel[]): Observable<IEvent>;
    abstract debug(message?: any, ...optionalParams: any[]): void;
    abstract error(message?: any, ...optionalParams: any[]): void;
    abstract info(message?: any, ...optionalParams: any[]): void;
    abstract log(message?: any, ...optionalParams: any[]): void;
    abstract warn(message?: any, ...optionalParams: any[]): void;
    abstract onCatch<T>(label: string): (err: any) => Promise<T>;
}
