import {
    AbstractLogger,
    AbstractLoggerOptions,
    ILogger,
    LogLevel,
} from "./base";
import chalk from "chalk";

export interface PrefixLoggerOptions extends AbstractLoggerOptions {
    prefix: string;
    base?: ILogger;
    separator?: string;
}

export const colorLevel = (level: string): string => {
    switch (level) {
        case "warn":
            return chalk.yellow(level);
        case "info":
            return chalk.green(level);
        case "debug":
            return chalk.blue(level);
        case "trace":
            return chalk.grey(level);
        case "error":
            return chalk.red(level);
    }
};

export class PrefixLogger extends AbstractLogger<PrefixLoggerOptions> {
    constructor(opts?: PrefixLoggerOptions) {
        super(opts);
        if (!opts.base) opts.base = console;
        if (!opts.separator) opts.separator = " ";
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

    log<L extends string = LogLevel>(level: L, message?: unknown): void {
        return this.opts.base.log(
            `${this.opts.color ? colorLevel(level) : level}`,
            `${this.opts.prefix}${this.opts.separator}${message}`
        );
    }

    extend(opts?: PrefixLoggerOptions): PrefixLogger {
        return new PrefixLogger({ base: this, ...opts });
    }
}
