export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMin: number;
  speakingTimeMin: number;
  longestWord: string;
  avgWordLength: number;
  keywordDensity: { word: string; count: number; percent: number }[];
}
