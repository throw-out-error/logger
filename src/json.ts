import { AbstractLogger, ILogger, ILogInfo, LogLevel } from "./base.js";

export interface JsonLoggerOptions {
    prefix: string;
    base?: ILogger;
}

export class JsonLogger extends AbstractLogger<JsonLoggerOptions> {
    constructor(opts: JsonLoggerOptions) {
        super(opts);
        if (!opts.base) opts.base = console;
    }

    debug(message?: unknown, ...args: unknown[]): void {
        return this.log("debug", message, ...args);
    }

    error(message?: unknown, ...args: unknown[]): void {
        return this.log("error", message, ...args);
    }

    info(message?: unknown, ...args: unknown[]): void {
        return this.log("info", message, ...args);
    }

    trace(message?: unknown, ...args: unknown[]): void {
        return this.log("trace", message, ...args);
    }

    warn(message?: unknown, ...args: unknown[]): void {
        return this.log("warn", message, ...args);
    }

    log<L extends string = LogLevel>(
        level: L,
        message?: unknown,
        ...args: unknown[]
    ): void {
        const info: ILogInfo<L> = {
            level,
            prefix: this.opts.prefix,
            args,
            children: [],
            message:
                typeof message === "string" ? message : JSON.stringify(message),
        };
        return this.opts.base?.log(JSON.stringify(info));
    }

    extend(opts: JsonLoggerOptions): JsonLogger {
        return new JsonLogger({
            ...this.opts,
            base: this,
            ...opts,
        });
    }
}
