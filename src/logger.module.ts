import { NgModule, ModuleWithProviders, OpaqueToken, APP_INITIALIZER } from '@angular/core'
import { LoggerDef, Logger } from './logger'
import { LogService } from './log.service'

export const logConsumer = new OpaqueToken('Log Consumer')

const getLogProvider = (logDef: LoggerDef) => ({
  provide:    logDef,
  useFactory: (logSvc) => new Logger(logSvc, logDef),
  deps:       [LogService]
})

const defaultLogger = {
  provide:    Logger,
  useFactory: (logSvc) => new Logger(logSvc, new LoggerDef('')),
  deps:       [LogService]
}

@NgModule()
export class LoggerModule {
  static forRoot(config: {
    loggers?: LoggerDef[],
  } = {}): ModuleWithProviders {
    config.loggers = config.loggers || []

    return {
      ngModule:  LoggerModule,
      providers: [
        LogService,
        defaultLogger,
        ...config.loggers.map(getLogProvider),
        { provide: APP_INITIALIZER, multi: true, useFactory: () => () => {}, deps: [logConsumer] },
        { provide: logConsumer, multi: true, useValue: null }
      ]
    }
  }
}
