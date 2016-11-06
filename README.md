## Angular Logger
[![CircleCI](https://circleci.com/gh/blaugold/angular-logger.svg?style=svg&circle-token=5343dadbd6986a309a2d1e9293ea52d8fd703e7e)](https://circleci.com/gh/blaugold/angular-logger)

[![npm version](https://badge.fury.io/js/%40blaugold%2Fangular-logger.svg)](https://badge.fury.io/js/%40blaugold%2Fangular-logger)

Logger for Angular 2 Apps.

## Installation
```
    npm i --save @blaugold/angular-logger
```

## Usage

Include the `LoggerModule` and the `ConsoleWriterModule` at the root module.

```typescript
@NgModule({
    imports: [
        LoggerModule.forStd(),
        ConsoleWriterModule.forRoot()
    ]
})
export class AppModule {
}
```

In your components, directives, pipes and services get the `Logger` through DI.

```typescript
@Injectable()
export class MyService {

    constructor(private log: Logger) {}
    
    getSome() {
        this.log.trace('Getting something for MyService')
    }
}
```

To change the log level at which the logger emits logs, type in the console `logat.trace` to set
the logger to log level `Trace` for example. Per default the logger is set to `Info`. You can also
permanently change the log level:
```typescript
    LoggerModule.forStd(new LoggerDef().level(LogLevel.Warn))
```

## Noop Logger

When testing classes which use a logger, but you are not interested in what is logged,
add `LoggerModule.forStd()` to the testing module. As long as there is no log consumer like the
`ConsoleWriterModule` imported the `LoggerModule` will inject a noop logger for the `Logger` token.

## Package Logger

Packages which are included in other apps to provide some functionality can make use of aux loggers
in their classes:

```typescript
    export const myPkgLogger = new LoggerDef('MyPkg')
    
    @Injectable()
    export class MyService {
        constructor(@Inject(myPkgLogger) log: Logger) {
            log.info('MyService was instantiated')
        }
    }
    
    @NgModule({
        imports: [
            LoggerModule.forAux([myPkgLogger])
        ]
    })
    export class MyPkgModule {
    }
```

Consumers of this package can use `myPkgLogger` to set the log level of the package's logger.
If the consuming app or package does not register a `LogConsumer` the classes are injected with
a noop logger.
