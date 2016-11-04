import { NgModule, ModuleWithProviders, OpaqueToken, APP_INITIALIZER } from '@angular/core'
import { LoggerDef, Logger, ConsoleLogLevelSetter } from './logger'
import { LogService } from './log.service'

export const logConsumer = new OpaqueToken('Log Consumer')

const getLogProvider = (logDef: LoggerDef) => ({
  provide:    logDef,
  useFactory: (logSvc) => new Logger(logSvc, logDef),
  deps:       [LogService]
})

const getStdLoggerProvider = (logDef) => ({
  provide:    Logger,
  useFactory: (logSvc) => new Logger(logSvc, logDef),
  deps:       [LogService]
})

@NgModule()
export class LoggerModule {

  static forRoot(config: {
    stdLogger?: LoggerDef,
    auxLoggers?: LoggerDef[],
    logatOnWindow?: boolean
  } = {}): ModuleWithProviders {
    config.stdLogger   = config.stdLogger || new LoggerDef('')
    config.auxLoggers  = config.auxLoggers || []
    config.logatOnWindow = config.logatOnWindow || true

    if (config.logatOnWindow) {
      new ConsoleLogLevelSetter(config.stdLogger).putOnWindow('logat')
    }

    return {
      ngModule:  LoggerModule,
      providers: [
        LogService,
        getStdLoggerProvider(config.stdLogger),
        ...config.auxLoggers.map(getLogProvider),
        { provide: APP_INITIALIZER, multi: true, useFactory: () => () => {}, deps: [logConsumer] },
        { provide: logConsumer, multi: true, useValue: null }
      ]
    }
  }

}
