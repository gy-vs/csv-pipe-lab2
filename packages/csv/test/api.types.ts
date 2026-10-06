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
      const err = new parser.CsvError("CSV_INVALID_ARGUMENT", "message");
      const code: parser.CsvErrorCode = err.code;
      (err instanceof parser.CsvError).should.be.true();
      code.should.eql("CSV_INVALID_ARGUMENT");
    });

    it("stringifier.CsvError", function () {
      const err = new stringifier.CsvError("CSV_INVALID_ARGUMENT", "message");
      const code: stringifier.CsvErrorCode = err.code;
      (err instanceof stringifier.CsvError).should.be.true();
      code.should.eql("CSV_INVALID_ARGUMENT");
    });
  });
});
