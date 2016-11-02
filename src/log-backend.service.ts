import { Injectable, Inject } from '@angular/core'
import { Log } from './log.model'
import { LogConsumer, logConsumers } from './log-consumer.service'

export abstract class LogBackend {
  abstract log(log: Log): void
}

@Injectable()
export class TestLogBackend implements LogBackend {
  logs: Log[] = []

  log(log: Log): void {
    this.logs.push(log)
  }
}

@Injectable()
export class LogBackendImpl implements LogBackend {

  constructor(@Inject(logConsumers) private consumers: LogConsumer[] = []) {}

  log(log: Log): void {
    this.consumers.forEach(consumer => consumer.consumeLog(log))
  }
}

