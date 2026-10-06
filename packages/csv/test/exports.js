import "should";
import {
  generate,
  generator,
  parse,
  parser,
  stringifier,
  stringify,
  transform,
  transformer,
} from "../lib/index.js";
import * as sync from "../lib/sync.js";

describe("exports", function () {
  describe("main entry", function () {
    it("expose the stream and callback APIs", function () {
      generate.should.be.a.Function();
      parse.should.be.a.Function();
      stringify.should.be.a.Function();
      transform.should.be.a.Function();
    });

    it("expose the underlying modules as namespaces", function () {
      generator.generate.should.eql(generate);
      parser.parse.should.eql(parse);
      stringifier.stringify.should.eql(stringify);
      transformer.transform.should.eql(transform);
    });

    it("expose CsvError inside the parser namespace", function () {
      parser.CsvError.should.be.a.Function();
      try {
        parse("a,b", { delimiter: 1 });
      } catch (err) {
        err.should.be.an.instanceof(parser.CsvError);
        err.code.should.eql("CSV_INVALID_OPTION_DELIMITER");
        return;
      }
      throw Error("Invalid assessment");
    });

    it("expose CsvError inside the stringifier namespace", function () {
      stringifier.CsvError.should.be.a.Function();
      try {
        stringify({ delimiter: 1 });
      } catch (err) {
        err.should.be.an.instanceof(stringifier.CsvError);
        err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
        return;
      }
      throw Error("Invalid assessment");
    });
  });

  describe("sync entry", function () {
    it("expose the sync APIs", function () {
      sync.generate.should.be.a.Function();
      sync.parse.should.be.a.Function();
      sync.stringify.should.be.a.Function();
      sync.transform.should.be.a.Function();
    });

    it("expose the underlying modules as namespaces", function () {
      sync.generator.generate.should.eql(sync.generate);
      sync.parser.parse.should.eql(sync.parse);
      sync.stringifier.stringify.should.eql(sync.stringify);
      sync.transformer.transform.should.eql(sync.transform);
    });

    it("expose CsvError inside the parser namespace", function () {
      sync.parser.CsvError.should.be.a.Function();
      try {
        sync.parse("a,b", { delimiter: 1 });
      } catch (err) {
        err.should.be.an.instanceof(sync.parser.CsvError);
        err.code.should.eql("CSV_INVALID_OPTION_DELIMITER");
        return;
      }
      throw Error("Invalid assessment");
    });

    it("expose CsvError inside the stringifier namespace", function () {
      sync.stringifier.CsvError.should.be.a.Function();
      try {
        sync.stringify([], { delimiter: 1 });
      } catch (err) {
        err.should.be.an.instanceof(sync.stringifier.CsvError);
        err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
        return;
      }
      throw Error("Invalid assessment");
    });
  });
});
