import { Injectable, OpaqueToken, Inject } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { LogService, logServiceV0 } from './log.service'
import { LogLevel, Log } from './log.model'

export class ConsoleWriterConfig {
  level: LogLevel

  constructor(config: {
    level: LogLevel
  } = {
    level: LogLevel.Log
  }) {
    this.level = config.level
  }
}

export const CONSOLE = new OpaqueToken('Console')

@Injectable()
export class ConsoleWriter {
  $logLevel: BehaviorSubject<LogLevel>

  console: Console

  constructor(@Inject(logServiceV0) private logService: LogService,
              @Inject(CONSOLE) console: any,
              private config: ConsoleWriterConfig) {
    this.$logLevel = new BehaviorSubject<LogLevel>(this.config.level)
    this.console   = console as Console

    this.logService.$logEntries
      .skipWhile(log => log.level < this.$logLevel.getValue())
      .subscribe(log => this.write(log))
  }

  private write(log: Log) {

    switch (log.level) {
      case LogLevel.Error:
        this.console.error(log.message, ...log.customData)
        break
      case LogLevel.Warn:
        this.console.warn(log.message, ...log.customData)
        break
      case LogLevel.Info:
        this.console.info(log.message, ...log.customData)
        break
      case LogLevel.Debug:
        this.console.debug(log.message, ...log.customData)
        break
      case LogLevel.Trace:
        this.console.trace(log.message, ...log.customData)
        break
      case LogLevel.Log:
        this.console.log(log.message, ...log.customData)
        break
    }
  }
}