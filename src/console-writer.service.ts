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
        this.console.error(this.getPrefix(log), ...log.args)
        break
      case LogLevel.Warn:
        this.console.warn(this.getPrefix(log), ...log.args)
        break
      case LogLevel.Info:
        this.console.info(this.getPrefix(log), ...log.args)
        break
      case LogLevel.Debug:
        this.console.debug(this.getPrefix(log), ...log.args)
        break
      case LogLevel.Trace:
        this.console.trace(this.getPrefix(log), ...log.args)
        break
      case LogLevel.Log:
        this.console.log(this.getPrefix(log), ...log.args)
        break
    }
  }
  
  private getPrefix(log): string {
    const name = log.poducer.getFullName()
    if (name.length > 0) {
      return name + ':'
    }
    return ''
  }
}