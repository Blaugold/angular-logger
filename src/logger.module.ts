import { NgModule, ModuleWithProviders } from '@angular/core'
import { LoggerDef, Logger, ConsoleLogLevelSetter } from './logger.class'
import { LoggerFactory } from './logger-factory.service'


const getLogProvider = (logDef: LoggerDef) => ({
  provide:    logDef,
  useFactory: (loggerFactory: LoggerFactory) => loggerFactory.createLogger(logDef),
  deps:       [LoggerFactory]
})

const getStdLoggerProvider = (logDef) => ({
  provide:    Logger,
  useFactory: (loggerFactory: LoggerFactory) => loggerFactory.createLogger(logDef),
  deps:       [LoggerFactory]
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
        LoggerFactory,
        getStdLoggerProvider(config.stdLogger),
        config.auxLoggers.map(getLogProvider)
      ]
    }
  }

}
