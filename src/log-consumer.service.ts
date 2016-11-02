import { Injectable, OpaqueToken, Optional } from '@angular/core';
import { Log, LogLevel } from './log.model'

export const logConsumers = new OpaqueToken('Log Consumers')

export abstract class LogConsumer {
  abstract consumeLog(log: Log): void
}

export class ConsoleLoggerConfig {
  level: LogLevel

  constructor(config: {
    level: LogLevel
  } = {
    level: LogLevel.Info
  }) {
    this.level = config.level
  }
}

@Injectable()
export class ConsoleLogger implements LogConsumer {

  constructor(@Optional() private config: ConsoleLoggerConfig) {
    this.config = config || new ConsoleLoggerConfig()
  }

  consumeLog(log: Log): void {
    if (log.level < this.config.level) {
      return
    }

    switch (log.level) {
      case LogLevel.Debug:
      case LogLevel.Info:
      case LogLevel.Warn:
        console.log(ConsoleLogger.getMessage(log), log.customData || '')
        break;
      case LogLevel.Error:
        console.error(ConsoleLogger.getMessage(log), log.error || '', log.customData || '')
    }
  }

  private static getMessage(log: Log) {
    return `[${LogLevel[log.level]}] ${log.time.toLocaleString()} - ${log.logger.name}: ${log.message}`
  }
}
