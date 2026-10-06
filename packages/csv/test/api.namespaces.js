import "should";
import * as csv from "../lib/index.js";
import * as sync from "../lib/sync.js";

describe("api namespaces", function () {
  describe("stream and callback API", function () {
    it("expose the generator namespace", function () {
      csv.generator.should.be.an.Object();
      csv.generator.generate.should.equal(csv.generate);
    });

    it("expose the parser namespace", function () {
      csv.parser.should.be.an.Object();
      csv.parser.parse.should.equal(csv.parse);
    });

    it("expose the transformer namespace", function () {
      csv.transformer.should.be.an.Object();
      csv.transformer.transform.should.equal(csv.transform);
    });

    it("expose the stringifier namespace", function () {
      csv.stringifier.should.be.an.Object();
      csv.stringifier.stringify.should.equal(csv.stringify);
    });

    it("parser.CsvError catches parse errors", function (next) {
      csv.parse("a,b\nc,d,e", { columns: true }, (err) => {
        try {
          (err instanceof csv.parser.CsvError).should.be.true();
          err.code.should.eql("CSV_RECORD_INCONSISTENT_COLUMNS");
          next();
        } catch (assertionError) {
          next(assertionError);
        }
      });
    });

    it("stringifier.CsvError catches stringify errors", function () {
      let err;
      try {
        csv.stringify([["a"]], { delimiter: 123 });
      } catch (e) {
        err = e;
      }
      (err instanceof csv.stringifier.CsvError).should.be.true();
      err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
    });
  });

  describe("sync API", function () {
    it("expose the generator namespace", function () {
      sync.generator.should.be.an.Object();
      sync.generator.generate.should.equal(sync.generate);
    });

    it("expose the parser namespace", function () {
      sync.parser.should.be.an.Object();
      sync.parser.parse.should.equal(sync.parse);
    });

    it("expose the transformer namespace", function () {
      sync.transformer.should.be.an.Object();
      sync.transformer.transform.should.equal(sync.transform);
    });

    it("expose the stringifier namespace", function () {
      sync.stringifier.should.be.an.Object();
      sync.stringifier.stringify.should.equal(sync.stringify);
    });

    it("parser.CsvError catches parse errors", function () {
      let err;
      try {
        sync.parse("a,b\nc,d,e", { columns: true });
      } catch (e) {
        err = e;
      }
      (err instanceof sync.parser.CsvError).should.be.true();
      err.code.should.eql("CSV_RECORD_INCONSISTENT_COLUMNS");
    });

    it("stringifier.CsvError catches stringify errors", function () {
      let err;
      try {
        sync.stringify([["a"]], { delimiter: 123 });
      } catch (e) {
        err = e;
      }
      (err instanceof sync.stringifier.CsvError).should.be.true();
      err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
    });
  });
});
