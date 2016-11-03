import { getTestBed, inject } from '@angular/core/testing'
import { LoggerModule } from '../src/logger.module'
import { Logger } from '../src/logger'
import { provideConsoleWriter } from '../src/console-writer.service'

describe('Logger', function () {

  beforeEach(() => getTestBed().configureTestingModule({
    imports:   [LoggerModule.forRoot()],
    providers: [
      provideConsoleWriter(),
    ]
  }))

  it('should work', inject([Logger], (logger: Logger) => {
    expect(logger).toBeDefined()
    spyOn(console, 'error')
    logger.error('Freak accident')
    logger.error('Freak accident')
    expect(console.error).toHaveBeenCalledTimes(2)
  }))
})
