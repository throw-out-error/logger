import { Spec } from "@hayspec/spec";
import { PrefixLogger } from "../src/index.js";

const spec = new Spec();

spec.test("Should log Hello world!", (ctx) => {
    const logger = new PrefixLogger({
        prefix: "Test",
        separator: " : ",
        color: true,
    });
    logger.info("Hello world!");
    ctx.deepEqual(logger.opts.base, console);
    ctx.deepEqual(logger.opts.prefix, "Test");
});

spec.test("Prefix logger hould be extendable", (ctx) => {
    const og = new PrefixLogger({
        prefix: "Test",
        separator: " > ",
        color: true,
    });
    const logger = og.extend({ prefix: "Sub-Logger", separator: ": " });
    logger.info("Hello sub-logger!");

    ctx.deepEqual(og.opts.base, console);
    ctx.deepEqual(logger.opts.base, og);
    ctx.deepEqual(logger.opts.prefix, "Sub-Logger");
});

export default spec;
