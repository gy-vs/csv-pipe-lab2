import "should";
import {
  generate,
  parse,
  parser,
  stringifier,
  stringify,
  transform,
} from "../lib/index.js";

describe("API Types", function () {
  describe("Initialisation", function () {
    it("generate", function () {
      // with options + handler
      generate(
        { length: 1 },
        (err: Error | undefined, records) => err || records,
      );
    });

    it("parse", function () {
      // With input + handler
      parse(
        "abc,def",
        {},
        (err: parser.CsvError | undefined, records: unknown) =>
          err?.message || (records as Array<Array<string>>),
      );
    });

    it("stringify", function () {
      // With handler
      stringify((err: Error | undefined, output: string) => err || output);
    });

    it("transform", function () {
      // With handler
      const transformer = transform((record) => record);
      transformer.should.be.an.Object(); // Disable unused variable warning
      // With handler + callback
      transform(
        (record) => record,
        (err, records) => err || records,
      );
      // With records + handler
      transform(["record"], (record) => record);
      // With options + handler
      transform({ consume: true }, (record) => record);
      // With records + options + handler
      transform(["record"], { consume: true }, (record) => record);
      // With records + options + handler + callback
      transform(
        ["record"],
        { consume: true },
        (record) => record,
        (err, records) => err || records,
      );
    });
  });

  describe("Namespaces", function () {
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
        stringify({
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
