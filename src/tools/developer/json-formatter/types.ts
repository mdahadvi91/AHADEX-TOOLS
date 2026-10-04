export type IndentOption = 2 | 4 | "tab";
export type OutputMode = "formatted" | "minified";

export interface ParseResult {
  valid: boolean;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
  data?: unknown;
  stats: {
    bytes: number;
    lines: number;
    chars: number;
    keys: number;
    arrays: number;
    depth: number;
  };
}

export interface FormatOptions {
  indent: IndentOption;
  sortKeys: boolean;
}
