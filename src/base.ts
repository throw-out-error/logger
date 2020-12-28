export type LogLevel = "info" | "debug" | "trace" | "warn" | "error";

export type ILoggerWithSignature = {
    [key in LogLevel]: (
        message?: unknown,
        ...optionalParams: unknown[]
    ) => void;
};

export interface ILogger extends ILoggerWithSignature {
    log<L extends string = LogLevel>(
        level: L,
        message?: unknown,
        ...args: unknown[]
    ): void;
}

export interface AbstractLoggerOptions {
    color?: boolean;
}

export abstract class AbstractLogger<
    O extends AbstractLoggerOptions = AbstractLoggerOptions
> implements ILogger {
    abstract debug(message?: unknown, ...args: unknown[]): void;

    abstract error(message?: unknown, ...args: unknown[]): void;

    abstract info(message?: unknown, ...args: unknown[]): void;

    abstract trace(message?: unknown, ...args: unknown[]): void;

    abstract warn(message?: unknown, ...args: unknown[]): void;

    protected constructor(public readonly opts: O) {}

    log<L extends string = LogLevel>(
        level: L,
        message?: unknown,
        ...args: unknown[]
    ): void {
        return this[level as LogLevel](message, ...args);
    }
}
