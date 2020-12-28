import { expect } from "chai";
import { PrefixLogger } from "../src";

describe("log 1", () => {
    it("Should log Hello world!", () => {
        const logger = new PrefixLogger({
            prefix: "Test",
            separator: ": ",
            color: true,
        });
        logger.info("Hello world!");
        expect(logger.opts.base).to.be.eq(console);
        expect(logger.opts.prefix).to.be.eq("Test");
    });
    it("Should be extendable", () => {
        const og = new PrefixLogger({
            prefix: "Test",
            separator: " > ",
            color: true,
        });
        const logger = og.extend({ prefix: "Sub-Logger", separator: ": " });
        logger.info("Hello sub-logger!");

        expect(og.opts.base).to.be.eq(console);
        expect(logger.opts.base).to.be.eq(og);
        expect(logger.opts.prefix).to.be.eq("Sub-Logger");
    });
});
