import { LogService, logServiceV0 } from './log.service'
import { APP_INITIALIZER } from '@angular/core'

export const logConsumer = 'logConsumer'

export const logConsumerProviders = [
  { provide: logServiceV0, useClass: LogService },
  { provide: APP_INITIALIZER, multi: true, useFactory: () => () => {}, deps: [logConsumer] },
  { provide: logConsumer, multi: true, useValue: null }
]