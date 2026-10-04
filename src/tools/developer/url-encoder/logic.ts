import type { Mode, Scope, TransformResult } from "./types";

export const MAX_INPUT_SIZE = 5 * 1024 * 1024;

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

function byteLen(s: string): number {
  return new Blob([s]).size;
}

export function transform(
  input: string,
  mode: Mode,
  scope: Scope
): TransformResult {
  const empty: TransformResult = { output: "", byteDelta: 0 };
  if (!input) return empty;

  try {
    let output: string;
    if (mode === "encode") {
      output =
        scope === "component"
          ? encodeURIComponent(input)
          : encodeURI(input);
    } else {
      output =
        scope === "component"
          ? decodeURIComponent(input)
          : decodeURI(input);
    }
    return {
      output,
      byteDelta: byteLen(output) - byteLen(input),
    };
  } catch (e) {
    return {
      output: "",
      error: e instanceof Error ? e.message : "Transform failed",
      byteDelta: 0,
    };
  }
}

export const SAMPLES = {
  en: {
    url: "https://example.com/search?q=hello world&lang=en",
    component: "hello world & special chars: @#$%",
    encoded:
      "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3Den",
  },
  bn: {
    url: "https://example.com/search?q=বাংলা ভাষা&lang=bn",
    component: "বাংলা ভাষা & special chars: @#$%",
    encoded:
      "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3D%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE&lang%3Dbn",
  },
};
