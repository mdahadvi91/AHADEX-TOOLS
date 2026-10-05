export interface Platform {
  id: string;
  name: string;
  nameBn: string;
  limit: number;
  emoji: string;
  note: string;
  noteBn: string;
}

export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  paragraphs: number;
  remaining: Record<string, number>;
  overLimit: string[];
}
