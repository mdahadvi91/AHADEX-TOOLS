export type Mode = "encode" | "decode";
export type Scope = "component" | "fullUri";

export interface TransformResult {
  output: string;
  error?: string;
  byteDelta: number;
}
