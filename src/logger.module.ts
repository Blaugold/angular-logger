import { NgModule, ModuleWithProviders, Type } from '@angular/core'

import { LogServiceImpl, LogService } from './logger.service'
import { LogBackendImpl, LogBackend } from './log-backend.service'
import { LogConsumer, logConsumers } from './log-consumer.service'

@NgModule()
export class LoggerModule {
  static forRoot(consumers: Type<LogConsumer>[] = []): ModuleWithProviders {
    const consumerProviders = consumers.map(consumer => ({
      provide: logConsumers, useClass: consumer, multi: true
    }))

    return {
      ngModule:  LoggerModule,
      providers: [
        LogServiceImpl,
        { provide: LogService, useExisting: LogServiceImpl },
        LogBackendImpl,
        { provide: LogBackend, useExisting: LogBackendImpl },
        ...consumerProviders
      ]
    }
  }
}
