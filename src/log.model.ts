import { LogProducer } from './log-producer'

export enum LogLevel {
  Log,
  Trace,
  Debug,
  Info,
  Warn,
  Error
}

export class Log {
  time: Date

  constructor(public level: LogLevel,
              public poducer: LogProducer,
              public args: any) {
    this.time = new Date()
  }
}
