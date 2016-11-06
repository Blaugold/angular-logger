import { inject, TestBed } from '@angular/core/testing'
import { LoggerModule, Logger, LoggerDef, Log, LogLevel, logServiceV0 } from '../'

const auxLoggerDef = new LoggerDef('Aux')
const stdLoggerDef = new LoggerDef('Std')
let mockLogService

describe('Logger', function () {


  beforeEach(() => {
    mockLogService = { dispatchLog(log: Log) {} }
    spyOn(mockLogService, 'dispatchLog')

    TestBed.configureTestingModule({
      imports:   [
        LoggerModule.forStdLogger(stdLoggerDef),
        LoggerModule.forAuxLogger([auxLoggerDef])
      ],
      providers: [{ provide: logServiceV0, useValue: mockLogService }]
    })
  })

  it('module should provide standard logger', inject([Logger], (logger: Logger) => {
    expect(logger).toBeDefined('Standard logger should exist.')
  }))

  it('#name()', inject([Logger], (logger: Logger) => {
    expect(logger.getName()).toBe('Std')
  }))

  it('#isRoot()', inject([Logger], (logger: Logger) => {
    expect(logger.isRoot()).toBeTruthy('Logger should be root.')
  }))

  describe('children', function () {
    let childA
    let childB

    beforeEach(inject([Logger], (logger: Logger) => {
      childA = logger.child('A')
      childB = childA.child('B')
    }))

    it('#fullName()', () => {
      expect(childA.getFullName()).toBe('Std::A')
      expect(childB.getFullName()).toBe('Std::A::B')
    })
  })

  it('should inject aux logger with LoggerDef as symbol',
    inject([auxLoggerDef], (auxLogger: Logger) => {
      expect(auxLogger).toBeDefined('Aux logger should exist.')
      expect(auxLogger.getName()).toBe('Aux')
    }))

  Object.keys(LogLevel)
    .map(key => parseInt(key))
    .filter(key => !isNaN(key))
    .forEach((level: LogLevel) =>
      it(LogLevel[level], inject([Logger], (logger: Logger) =>
          testLogLevel(level, logger)
        )
      )
    )
})

function testLogLevel(logLevel: LogLevel, logger: Logger) {
  const levelAsString: string = LogLevel[logLevel]
  const methodName            = levelAsString.toLowerCase()
  const upperLogLevel         = (logLevel as number + 1) as LogLevel

  if (logLevel !== LogLevel.Error) {
    stdLoggerDef.level(upperLogLevel)
    logger[methodName]('A')
    expect(mockLogService.dispatchLog).not.toHaveBeenCalled()
  }

  stdLoggerDef.level(logLevel)
  logger[methodName]('A')
  expect(mockLogService.dispatchLog).toHaveBeenCalledTimes(1)
}
