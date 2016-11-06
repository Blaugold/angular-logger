import { NgModule, ModuleWithProviders } from '@angular/core'

import { ConsoleWriterConfig, ConsoleWriter, CONSOLE } from './console-writer.service'
import { logConsumer, logConsumerProviders } from './log-consumer'

@NgModule()
export class ConsoleWriterModule {
  static forRoot(config = new ConsoleWriterConfig()): ModuleWithProviders {
    return {
      ngModule:  ConsoleWriterModule,
      providers: [
        { provide: logConsumer, useClass: ConsoleWriter, multi: true },
        { provide: CONSOLE, useValue: global.console },
        { provide: ConsoleWriterConfig, useValue: config },
        logConsumerProviders
      ]
    }
  }
}