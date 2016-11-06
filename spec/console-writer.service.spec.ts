import { getTestBed, inject } from '@angular/core/testing'

import { logConsumer, ConsoleWriter, ConsoleWriterModule } from '../'

describe('Console Writer', function () {
  beforeEach(() => getTestBed().configureTestingModule({
    imports: [
      ConsoleWriterModule.forRoot()
    ],
  }))

  it('should add itself to logConsumers', inject([logConsumer], (logConsumer: any[]) => {
    const consoleWriter = logConsumer.filter(consumer => consumer instanceof ConsoleWriter)[0]
    expect(consoleWriter).toBeDefined('ConsoleWriter should be in logConsumer multi provider.')
  }))
})