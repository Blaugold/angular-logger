import { Injectable } from '@angular/core'

import { LogBackend } from './log-backend.service'
import { Log, LogLevel } from './log.model'

export abstract class Logger {
  public abstract name: string
  abstract debug(message: string, customData?: Object): void
  abstract info(message: string, customData?: Object): void
  abstract warn(message: string, customData?: Object): void
  abstract error(message: string, error?: Error | any, customData?: Object): void
}

export class LoggerDummy implements Logger {
  public name: string = 'LoggerDummy'
  debug(message: string, customData?: Object): void {}
  info(message: string, customData?: Object): void {}
  warn(message: string, customData?: Object): void {}
  error(message: string, error?: Error | any, customData?: Object): void {}
}

@Injectable()
export class LoggerImpl implements Logger {

  constructor(public name: string, private backend: LogBackend) { }

  debug(message: string, customData?: Object): void {
    this.backend.log(new Log(LogLevel.Debug, this, message, customData, null))
  }

  info(message: string, customData?: Object): void {
    this.backend.log(new Log(LogLevel.Info, this, message, customData, null))
  }

  warn(message: string, customData?: Object): void {
    this.backend.log(new Log(LogLevel.Warn, this, message, customData, null))
  }

  error(message: string, error?: Error | any, customData?: Object): void {
    this.backend.log(new Log(LogLevel.Error, this, message, customData, error))
  }
}
