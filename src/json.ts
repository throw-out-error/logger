import { AbstractLogger, ILogger, ILogInfo, LogLevel } from "./base";

export interface JsonLoggerOptions {
    prefix: string;
    base?: ILogger;
}

export class JsonLogger extends AbstractLogger<JsonLoggerOptions> {
    constructor(opts?: JsonLoggerOptions) {
        super(opts);
        if (!opts.base) opts.base = console;
    }

    debug(message?: unknown): void {
        return this.log("debug", message);
    }

    error(message?: unknown): void {
        return this.log("error", message);
    }

    info(message?: unknown): void {
        return this.log("info", message);
    }

    trace(message?: unknown): void {
        return this.log("trace", message);
    }

    warn(message?: unknown): void {
        return this.log("warn", message);
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
        return this.opts.base.log(JSON.stringify(info));
    }

    extend(opts?: JsonLoggerOptions): JsonLogger {
        return new JsonLogger({
            base: this,
            ...opts,
        });
    }
}
