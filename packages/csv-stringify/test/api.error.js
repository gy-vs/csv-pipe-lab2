import "should";
import { CsvError, stringify } from "../lib/index.js";
import {
  CsvError as CsvErrorSync,
  stringify as stringify_sync,
} from "../lib/sync.js";

describe("API CsvError", function () {
  it("is exposed by the main entry", function () {
    CsvError.should.be.a.Function();
    const err = new CsvError("CSV_INVALID_ARGUMENT", ["a", "b"]);
    err.should.be.an.instanceof(Error);
    err.code.should.eql("CSV_INVALID_ARGUMENT");
    err.message.should.eql("a b");
  });

  it("is exposed by the sync entry", function () {
    CsvErrorSync.should.be.a.Function();
    CsvErrorSync.should.eql(CsvError);
  });

  it("is thrown on invalid options with the stream API", function () {
    try {
      stringify({ delimiter: 1 });
    } catch (err) {
      err.should.be.an.instanceof(CsvError);
      err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
      return;
    }
    throw Error("Invalid assessment");
  });

  it("is thrown on invalid options with the sync API", function () {
    try {
      stringify_sync([], { delimiter: 1 });
    } catch (err) {
      err.should.be.an.instanceof(CsvErrorSync);
      err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
      return;
    }
    throw Error("Invalid assessment");
  });
});
