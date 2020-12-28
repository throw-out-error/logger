import { Logger } from "ts-log";

export abstract class AbstractLogger implements Logger {
    abstract debug(message?: unknown, ...optionalParams: unknown[]): void;

    abstract error(message?: unknown, ...optionalParams: unknown[]): void;

    abstract info(message?: unknown, ...optionalParams: unknown[]): void;

    abstract trace(message?: unknown, ...optionalParams: unknown[]): void;

    abstract warn(message?: unknown, ...optionalParams: unknown[]): void;
}
