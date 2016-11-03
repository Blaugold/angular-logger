import { Injectable, Provider, OpaqueToken, Inject } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LogService } from './log.service'
import { LogLevel, Log } from './log.model'
import { logConsumer } from './logger.module'

export class ConsoleWriterConfig {
  level: LogLevel

  constructor(config: {
    level: LogLevel
  } = {
    level: LogLevel.Info
  }) {
    this.level = config.level
  }
}

export const CONSOLE = new OpaqueToken('Console')

export function provideConsoleWriter(config = new ConsoleWriterConfig()): Provider[] {
  return [
    { provide: logConsumer, useClass: ConsoleWriter, multi: true },
    { provide: CONSOLE, useValue: global.console },
    { provide: ConsoleWriterConfig, useValue: config }
  ]
}

@Injectable()
export class ConsoleWriter {
  $logLevel: BehaviorSubject<LogLevel>

  console: Console

  constructor(private logService: LogService,
              @Inject(CONSOLE) console: any,
              private config: ConsoleWriterConfig) {
    this.$logLevel = new BehaviorSubject<LogLevel>(this.config.level)
    this.console = console as Console

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