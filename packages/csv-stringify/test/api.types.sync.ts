import "should";
import {
  stringify,
  CsvError,
  CsvErrorCode,
  RecordDelimiter,
  Cast,
  PlainObject,
  Input,
  ColumnOption,
  CastingContext,
  Options,
} from "../lib/sync.js";

describe("API Types", function () {
  it("stringify return string", function () {
    const input: Input = [[1, 2, 3]];
    const stringifier: string = stringify(input);
    stringifier;
  });

  it("Options", function () {
    (options: Options) => {
      const rd: RecordDelimiter | undefined = options.record_delimiter;
      const cast = options.cast;
      const castBoolean: Cast<boolean> | undefined = cast?.boolean;
      const columns:
        | ReadonlyArray<string | ColumnOption>
        | PlainObject<string>
        | undefined = options.columns;
      return [rd, castBoolean, columns];
    };
  });

  it("CastingContext", function () {
    const options: Options = {
      cast: {
        boolean: (value: boolean, context: CastingContext) => {
          return `${value} ${context.index}`;
        },
      },
    };
    return options;
  });

  it("allows cast to return an object", function () {
    const options: Options = {
      cast: {
        boolean: (value: boolean) => ({
          value: value.toString(),
          delimiter: ";",
          quote: false,
        }),
      },
    };
    options;
  });

  it("CsvError", function () {
    try {
      stringify([], {
        // @ts-expect-error delimiter must be a string or a buffer
        delimiter: 1,
      });
    } catch (err) {
      if (err instanceof CsvError) {
        const code: CsvErrorCode = err.code;
        code.should.eql("CSV_OPTION_DELIMITER_INVALID_TYPE");
        return;
      }
      throw Error("Invalid assessment", { cause: err });
    }
    throw Error("Invalid assessment");
  });
});
