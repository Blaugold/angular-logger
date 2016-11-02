import { Injectable } from '@angular/core'

import { Logger, LoggerImpl, LoggerDummy } from './logger.class'
import { LogBackend } from './log-backend.service'

export abstract class LogService {
  abstract getLogger(name: string): Logger
}

@Injectable()
export class LogServiceImpl implements LogService {

  constructor(private backend: LogBackend) {}

  getLogger(name: string): Logger {
    return new LoggerImpl(name, this.backend)
  }
}

export class LogServiceDummy implements LogService {
  getLogger(name: string): Logger {
    return new LoggerDummy()
  }
}

