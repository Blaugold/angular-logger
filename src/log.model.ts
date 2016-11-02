
import { Logger } from './logger.class'

export enum LogLevel {
  Debug,
  Info,
  Warn,
  Error
}


export class Log {
  time: Date

  constructor(public level: LogLevel,
              public logger: Logger,
              public message: string,
              public customData: any,
              public error?: any) {
    this.time = new Date()
  }
}
