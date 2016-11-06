import { Injectable, Optional, Inject } from '@angular/core'
import { LogService, logServiceV0 } from './log.service'
import { Logger, LoggerDef, LoggerImp, NoopLogger } from './logger.class'

@Injectable()
export class LoggerFactory {

  constructor(@Inject(logServiceV0) @Optional() private logService: LogService) {
  }

  createLogger(loggerDef: LoggerDef): Logger {
    if (this.logService) {
      return new LoggerImp(this.logService, loggerDef)
    } else {
      return new NoopLogger()
    }
  }
}