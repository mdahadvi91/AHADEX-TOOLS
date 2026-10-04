export interface PasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  requireEach: boolean;
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  labelBn: string;
  color: string;
  entropy: number;
  crackTime: string;
  crackTimeBn: string;
}

export interface GeneratedPassword {
  id: string;
  value: string;
  strength: PasswordStrength;
}
