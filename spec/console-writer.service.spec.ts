import { getTestBed, inject } from '@angular/core/testing'

import { LoggerModule, logConsumer } from '../src/logger.module'
import { ConsoleWriterModule, ConsoleWriter } from '../src/console-writer.service'

describe('Console Writer', function () {
  beforeEach(() => getTestBed().configureTestingModule({
    imports: [
      LoggerModule.forRoot(),
      ConsoleWriterModule.forRoot()
    ],
  }))

  it('should add itself to logConsumers', inject([logConsumer], (logConsumer: any[]) => {
    const consoleWriter = logConsumer.filter(consumer => consumer instanceof ConsoleWriter)[0]
    expect(consoleWriter).toBeDefined('ConsoleWriter should be in logConsumer multi provider.')
  }))
})