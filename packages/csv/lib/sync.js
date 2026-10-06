// Alias to the modules exposing the sync API

import { generate } from "csv-generate/sync";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import { transform } from "stream-transform/sync";

export { generate, parse, stringify, transform };

export * as generator from "csv-generate/sync";
export * as parser from "csv-parse/sync";
export * as transformer from "stream-transform/sync";
export * as stringifier from "csv-stringify/sync";
