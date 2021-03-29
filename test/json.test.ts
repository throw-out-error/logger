import { expect } from "chai";
import { JsonLogger } from "../src";

describe("json logger", () => {
    it("Should log Hello world!", () => {
        const logger = new JsonLogger({
            prefix: "Test",
        });
        logger.info("Hello world!");
        expect(logger.opts.base).to.be.eq(console);
        expect(logger.opts.prefix).to.be.eq("Test");
    });
});
