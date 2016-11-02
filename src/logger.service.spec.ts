/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing'

import { LogService, LogServiceImpl } from './logger.service'
import { TestLogBackend, LogBackend } from './log-backend.service'
import { Log, LogLevel } from './log.model'

describe('Service: Logger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogServiceImpl,
        { provide: LogService, useExisting: LogServiceImpl },
        TestLogBackend,
        { provide: LogBackend, useExisting: TestLogBackend }
      ]
    });
  });

  it('should create logger', inject([LogService], (service: LogService) => {
    const logger = service.getLogger('logger')
    expect(logger).toBeDefined()
  }));

  it('Log should set timestamp on creation', () => {
    const log = new Log(null, null, null, null, null)
    expect(log.time.getTime()).toBeCloseTo(Date.now())
  })

  it('should log debug', inject([LogService, TestLogBackend],
    (service: LogService, backend: TestLogBackend) => {
      expectLogsFor(LogLevel.Debug, service, backend)
    }))

  it('should log info', inject([LogService, TestLogBackend],
    (service: LogService, backend: TestLogBackend) => {
      expectLogsFor(LogLevel.Info, service, backend)
    }))

  it('should log warn', inject([LogService, TestLogBackend],
    (service: LogService, backend: TestLogBackend) => {
      expectLogsFor(LogLevel.Warn, service, backend)
    }))

  it('should log error', inject([LogService, TestLogBackend],
    (service: LogService, backend: TestLogBackend) => {
      expectLogsForError(service, backend)
    }))
});

function expectLogsFor(level: LogLevel, service: LogService, backend: TestLogBackend) {
  const customData = {}
  const logger     = service.getLogger('logger')
  const error      = new Error('error')
  const fnName     = LogLevel[level].toLowerCase()

  logger[fnName]('message')
  logger[fnName]('customData', customData)

  const messageLog: Log = backend.logs[0]
  expect(messageLog.level).toEqual(level)
  expect(messageLog.message).toEqual('message')

  const customDataLog: Log = backend.logs[1]
  expect(customDataLog.level).toEqual(level)
  expect(customDataLog.message).toEqual('customData')
  expect(customDataLog.customData).toBe(customData)
}

function expectLogsForError(service: LogService, backend: TestLogBackend) {
  const customData = {}
  const logger     = service.getLogger('logger')
  const error      = new Error('error')

  logger.error('message')
  logger.error('messageError', error)
  logger.error('messageErrorCustomData', error, customData)

  const messageLog: Log = backend.logs[0]
  expect(messageLog.level).toEqual(LogLevel.Error)
  expect(messageLog.message).toEqual('message')
  expect(messageLog.error).not.toBeDefined()

  const messageErrorLog: Log = backend.logs[1]
  expect(messageErrorLog.level).toEqual(LogLevel.Error)
  expect(messageErrorLog.message).toEqual('messageError')
  expect(messageErrorLog.error).toEqual(error)

  const messageErrorCustomDataLog: Log = backend.logs[2]
  expect(messageErrorCustomDataLog.level).toEqual(LogLevel.Error)
  expect(messageErrorCustomDataLog.message).toEqual('messageErrorCustomData')
  expect(messageErrorCustomDataLog.error).toEqual(error)
  expect(messageErrorCustomDataLog.customData).toEqual(customData)
}

