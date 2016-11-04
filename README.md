## Angular Logger

## Installation
```
    npm i --save @blaugold/angular-logger
```

## Usage

Include the `LoggerModule` and the `ConsoleWriterModule` at the root module.

```typescript
@NgModule({
    imports: [
        LoggerModule.forRoot(),
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
```
    LoggerModule.forRoot({ stdLogger: new LoggerDef().level(LogLevel.Warn) })
```

