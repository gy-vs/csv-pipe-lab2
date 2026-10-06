import { Input, Options } from "./index.cjs";

declare function stringify(input: Input, options?: Options): string;

export { stringify };

export {
  RecordDelimiter,
  Cast,
  PlainObject,
  Input,
  ColumnOption,
  CastingContext,
  Options,
  OptionsNormalized,
  CsvErrorCode,
  CsvError,
} from "./index.cjs";
