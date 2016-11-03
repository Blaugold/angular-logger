import { Injectable } from '@angular/core'

import { LogService } from './log.service'
import { Log, LogLevel } from './log.model'
import { LogProducer } from './log-producer'

export class LoggerDef {

  /* @internal */
  _level: LogLevel

  /* @internal */
  name: string

  constructor(name: string) {
    this.name   = name
    this._level = LogLevel.Info
  }

  level(level: LogLevel): this {
    this._level = level
    return this
  }
}

@Injectable()
export class Logger implements LogProducer {

  constructor(private logService: LogService,
              private def: LoggerDef) {
  }

  getName(): string {
    return this.def.name
  }

  log(message: string, ...optionalArgs: any[]): void {
    if (this.def._level <= LogLevel.Log) {
      this.logService.dispatchLog(new Log(LogLevel.Log, this, message, optionalArgs))
    }
  }

  trace(message: string, ...optionalArgs: any[]): void {
    if (this.def._level <= LogLevel.Trace) {
      this.logService.dispatchLog(new Log(LogLevel.Trace, this, message, optionalArgs))
    }
  }

  debug(message: string, ...optionalArgs: any[]): void {
    if (this.def._level <= LogLevel.Debug) {
      this.logService.dispatchLog(new Log(LogLevel.Debug, this, message, optionalArgs))
    }
  }

  info(message: string, ...optionalArgs: any[]): void {
    if (this.def._level <= LogLevel.Info) {
      this.logService.dispatchLog(new Log(LogLevel.Info, this, message, optionalArgs))
    }
  }

  warn(message: string, ...optionalArgs: any[]): void {
    if (this.def._level <= LogLevel.Warn) {
      this.logService.dispatchLog(new Log(LogLevel.Warn, this, message, optionalArgs))
    }
  }

  error(message: string, ...optionalArgs: any[]): void {
    if (this.def._level <= LogLevel.Error) {
      this.logService.dispatchLog(new Log(LogLevel.Error, this, message, optionalArgs))
    }
  }
}