import "should";
import { generate, parse, stringify, transform } from "../lib/sync.js";
import { generator, parser, stringifier, transformer } from "../lib/sync.js";

describe("API Types", function () {
  describe("usage with named export", function () {
    it("generate", function () {
      // with options + handler
      const output: string = generate(1);
      return output;
    });

    it("parse", function () {
      const output: string[][] = parse("");
      return output;
    });

    it("stringify", function () {
      const output: string = stringify([]);
      return output;
    });

    it("transform", function () {
      const output: void[] = transform([], () => {});
      return output;
    });
  });

  describe("usage with default export", function () {
    it("csv.generate", function () {
      const options: generator.Options = {};
      return options;
    });

    it("csv.parse", function () {
      const options: parser.Options = {};
      return options;
    });

    it("csv.stringifier", function () {
      const options: stringifier.Options = {};
      return options;
    });

    it("csv.transform", function () {
      const options: transformer.Options = {};
      return options;
    });
  });

  describe("namespaces", function () {
    it("parser.CsvError", function () {
      let err;
      try {
        parse("a,b\nc,d,e", { columns: true });
      } catch (e) {
        err = e;
      }
      (err instanceof parser.CsvError).should.be.true();
      const code: parser.CsvErrorCode = (err as parser.CsvError).code;
      code.should.eql("CSV_RECORD_INCONSISTENT_COLUMNS");
    });

    it("stringifier.CsvError", function () {
      let err;
      try {
        stringify([["a"]], { delimiter: 123 as unknown as string });
      } catch (e) {
        err = e;
      }
      (err instanceof stringifier.CsvError).should.be.true();
      const code: stringifier.CsvErrorCode = (err as stringifier.CsvError).code;
      code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
    });
  });
});
