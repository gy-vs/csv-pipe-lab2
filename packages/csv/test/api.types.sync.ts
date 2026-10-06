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
      try {
        parse("a,b", {
          // @ts-expect-error delimiter must be a string or a buffer
          delimiter: 1,
        });
      } catch (err) {
        if (err instanceof parser.CsvError) {
          const code: parser.CsvErrorCode = err.code;
          code.should.eql("CSV_INVALID_OPTION_DELIMITER");
          return;
        }
        throw Error("Invalid assessment", { cause: err });
      }
      throw Error("Invalid assessment");
    });

    it("stringifier.CsvError", function () {
      try {
        stringify([], {
          // @ts-expect-error delimiter must be a string or a buffer
          delimiter: 1,
        });
      } catch (err) {
        if (err instanceof stringifier.CsvError) {
          const code: stringifier.CsvErrorCode = err.code;
          code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
          return;
        }
        throw Error("Invalid assessment", { cause: err });
      }
      throw Error("Invalid assessment");
    });
  });
});
