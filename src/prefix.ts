import {
    AbstractLogger,
    AbstractLoggerOptions,
    ILogger,
    LogLevel,
} from "./base";
import * as chalk from "colorette";

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
            return chalk.gray(level);
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

    debug(message?: unknown, ...args: unknown[]): void {
        return this.log("debug", message, args);
    }

    error(message?: unknown, ...args: unknown[]): void {
        return this.log("error", message, args);
    }

    info(message?: unknown, ...args: unknown[]): void {
        return this.log("info", message, args);
    }

    trace(message?: unknown, ...args: unknown[]): void {
        return this.log("trace", message, args);
    }

    warn(message?: unknown, ...args: unknown[]): void {
        return this.log("warn", message, args);
    }

    log<L extends string = LogLevel>(level: L, ...args: unknown[]): void {
        return this.opts.base.log(
            `${this.opts.color ? colorLevel(level) : level}`,
            `${this.opts.prefix}${this.opts.separator}${args.join(" ")}`
        );
    }

    extend(opts?: PrefixLoggerOptions): PrefixLogger {
        return new PrefixLogger({
            separator: this.opts.separator,
            base: this,
            ...opts,
        });
    }
}
