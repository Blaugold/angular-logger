import { NgModule, ModuleWithProviders } from '@angular/core'
import { LoggerDef, Logger, ConsoleLogLevelSetter } from './logger.class'
import { LoggerFactory } from './logger-factory.service'

const getLogProvider = (logDef: LoggerDef, stdLogger: boolean = false) => ({
  provide:    stdLogger ? Logger : logDef,
  useFactory: (loggerFactory: LoggerFactory) => loggerFactory.createLogger(logDef),
  deps:       [LoggerFactory]
})

@NgModule()
export class LoggerModule {

  static forStd(stdLogger: LoggerDef = new LoggerDef(''),
                logatOnWindow: boolean = true): ModuleWithProviders {

    if (logatOnWindow) {
      new ConsoleLogLevelSetter(stdLogger).putOnWindow('logat')
    }

    return {
      ngModule:  LoggerModule,
      providers: [
        LoggerFactory,
        getLogProvider(stdLogger, true),
      ]
    }
  }

  static forAux(auxLoggers: LoggerDef[]): ModuleWithProviders {
    return {
      ngModule:  LoggerModule,
      providers: [
        LoggerFactory,
        auxLoggers.map(loggerDef => getLogProvider(loggerDef))
      ]
    }
  }
}
