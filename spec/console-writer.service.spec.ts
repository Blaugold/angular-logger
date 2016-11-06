import { getTestBed, inject } from '@angular/core/testing'
import { logConsumer, ConsoleWriter, ConsoleWriterModule } from '../'
import { LogLevel } from '../src/log.model'
import { LoggerDef, Logger } from '../src/logger.class'
import { LoggerModule } from '../src/logger.module'

describe('Console Writer', function () {
  beforeEach(() => getTestBed().configureTestingModule({
    imports: [
      ConsoleWriterModule.forRoot(),
      LoggerModule.forStd(new LoggerDef('Logger').level(LogLevel.Log))
    ],
  }))

  it('should add itself to logConsumers', inject([logConsumer], (logConsumer: any[]) => {
    const consoleWriter = logConsumer.filter(consumer => consumer instanceof ConsoleWriter)[0]
    expect(consoleWriter).toBeDefined('ConsoleWriter should be in logConsumer multi provider.')
  }))

  it('should log', inject([Logger], (log: Logger) => {
    log.log('Log me')
    log.trace('Trace me')
    log.debug('Debug me')
    log.info('Inform me')
    log.warn('Warn me')
    log.error('Error me')
  }))
})