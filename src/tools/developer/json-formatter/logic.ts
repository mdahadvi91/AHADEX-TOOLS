import type { ParseResult, FormatOptions, IndentOption } from "./types";

export const MAX_INPUT_SIZE = 10 * 1024 * 1024; // 10 MB

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

interface StatsAcc {
  keys: number;
  arrays: number;
  maxDepth: number;
}

function walk(value: unknown, depth: number, acc: StatsAcc): void {
  if (depth > acc.maxDepth) acc.maxDepth = depth;
  if (Array.isArray(value)) {
    acc.arrays += 1;
    for (const item of value) walk(item, depth + 1, acc);
  } else if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
      acc.keys += 1;
      walk(obj[key], depth + 1, acc);
    }
  }
}

export function analyze(input: string): ParseResult {
  const emptyStats = {
    bytes: new Blob([input]).size,
    lines: input ? input.split("\n").length : 0,
    chars: input.length,
    keys: 0,
    arrays: 0,
    depth: 0,
  };

  if (!input.trim()) {
    return { valid: true, stats: emptyStats };
  }

  try {
    const data = JSON.parse(input);
    const acc: StatsAcc = { keys: 0, arrays: 0, maxDepth: 0 };
    walk(data, 1, acc);
    return {
      valid: true,
      data,
      stats: {
        ...emptyStats,
        keys: acc.keys,
        arrays: acc.arrays,
        depth: acc.maxDepth,
      },
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    // Try to extract line/column from message
    const posMatch = msg.match(/position\s+(\d+)/i);
    let line: number | undefined;
    let column: number | undefined;
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const before = input.slice(0, pos);
      line = before.split("\n").length;
      column = pos - before.lastIndexOf("\n");
    }
    return {
      valid: false,
      error: { message: msg, line, column },
      stats: emptyStats,
    };
  }
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(obj).sort()) {
      sorted[key] = sortObject(obj[key]);
    }
    return sorted;
  }
  return value;
}

function indentUnit(indent: IndentOption): string | number {
  if (indent === "tab") return "\t";
  return indent;
}

export function stringify(data: unknown, opts: FormatOptions): string {
  const prepared = opts.sortKeys ? sortObject(data) : data;
  return JSON.stringify(prepared, null, indentUnit(opts.indent));
}

export function minify(data: unknown): string {
  return JSON.stringify(data);
}
