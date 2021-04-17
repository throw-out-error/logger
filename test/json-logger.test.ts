import { Spec } from "@hayspec/spec";
import { JsonLogger } from "../src";

const spec = new Spec();

spec.test("Should log Hello world!", (ctx) => {
    const logger = new JsonLogger({
        prefix: "Test",
    });
    logger.info("Hello world!");
    ctx.deepEqual(logger.opts.base, console);
    ctx.deepEqual(logger.opts.prefix, "Test");
});

export default spec;
