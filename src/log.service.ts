import { Injectable, APP_INITIALIZER, forwardRef } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { Log } from './log.model'

export const logConsumer = 'logConsumer'

export const logServiceV0 = 'logServiceV0'

@Injectable()
export class LogService {
  $logEntries: Observable<Log>

  constructor() {
    this.$logEntries = new BehaviorSubject<Log>(null).filter(x => !!x)
  }

  dispatchLog(log: Log) {
    (this.$logEntries as BehaviorSubject<Log>).next(log)
  }
}

export const logServiceProviders = [
  { provide: logServiceV0, useClass: LogService },
  { provide: APP_INITIALIZER, multi: true, useFactory: () => () => {}, deps: [logConsumer] },
  { provide: logConsumer, multi: true, useValue: null }
]
