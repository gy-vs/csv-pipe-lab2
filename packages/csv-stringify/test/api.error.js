import "should";
import { CsvError, stringify } from "../lib/index.js";
import {
  CsvError as CsvErrorSync,
  stringify as stringifySync,
} from "../lib/sync.js";

describe("API CsvError", function () {
  it("main entry exports CsvError", function () {
    CsvError.should.be.a.Function();
    const err = new CsvError("CSV_INVALID_ARGUMENT", "A message");
    err.should.be.an.Error();
    err.code.should.eql("CSV_INVALID_ARGUMENT");
    err.message.should.eql("A message");
  });

  it("sync entry exports the same CsvError", function () {
    CsvErrorSync.should.be.a.Function();
    CsvErrorSync.should.equal(CsvError);
  });

  it("joins message arrays", function () {
    const err = new CsvError("CSV_INVALID_ARGUMENT", ["a", "b", "c"]);
    err.message.should.eql("a b c");
  });

  it("copies context properties", function () {
    const err = new CsvError("CSV_INVALID_ARGUMENT", "A message", {
      a_key: "a value",
    });
    err.a_key.should.eql("a value");
  });

  it("thrown errors are instances of CsvError", function () {
    (() => {
      stringify([], { delimiter: 123 });
    }).should.throw({ code: "CSV_OPTION_DELIMITER_INVALID_TYPE" });
    let err;
    try {
      stringify([], { delimiter: 123 });
    } catch (e) {
      err = e;
    }
    (err instanceof CsvError).should.be.true();
    err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
  });

  it("thrown sync errors are instances of CsvError", function () {
    let err;
    try {
      stringifySync([["a"]], { delimiter: 123 });
    } catch (e) {
      err = e;
    }
    (err instanceof CsvError).should.be.true();
    (err instanceof CsvErrorSync).should.be.true();
    err.code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
  });
});
