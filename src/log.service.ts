import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { Log } from './log.model'

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
