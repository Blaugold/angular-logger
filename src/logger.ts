import { Injectable } from '@angular/core'

import { LogService } from './log.service'
import { Log, LogLevel } from './log.model'
import { LogProducer } from './log-producer'

export class LoggerDef {

  /* @internal */
  _level: LogLevel

  /* @internal */
  name: string

  constructor(name = '') {
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

  private parent: Logger = null

  constructor(private logService: LogService,
              private def: LoggerDef) {
  }

  isRoot(): boolean {
    return this.parent === null
  }

  getFullName(): string {
    let name = this.def.name
    if (this.parent) {
      name = `${this.parent.getFullName()}::${name}`
    }
    return name
  }

  getName(): string {
    return this.def.name
  }

  child(name: string): Logger {
    const childDef     = new LoggerDef(name).level(this.def._level)
    const childLogger  = new Logger(this.logService, childDef)
    childLogger.parent = this
    return childLogger
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

export class ConsoleLogLevelSetter {
  constructor(private logDef: LoggerDef) {}

  get log(): string {
    this.logDef.level(LogLevel.Log)
    return LogLevel[LogLevel.Log]
  }

  get trace(): string {
    this.logDef.level(LogLevel.Trace)
    return LogLevel[LogLevel.Trace]
  }

  get debug(): string {
    this.logDef.level(LogLevel.Debug)
    return LogLevel[LogLevel.Debug]
  }

  get info(): string {
    this.logDef.level(LogLevel.Info)
    return LogLevel[LogLevel.Info]
  }

  get warn(): string {
    this.logDef.level(LogLevel.Warn)
    return LogLevel[LogLevel.Warn]
  }

  get error(): string {
    this.logDef.level(LogLevel.Error)
    return LogLevel[LogLevel.Error]
  }

  putOnWindow(key: string) {
    window[key] = this
  }
}