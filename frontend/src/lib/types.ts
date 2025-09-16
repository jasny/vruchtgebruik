export type Gender = 'm' | 'v' | 'x';

export interface MethodOption {
  value: string;
  label: string;
}

export interface CalculationInput {
  value: number;
  age: number;
  gender: Gender;
  method: string;
}

export interface Calculation {
  method: string;
  value: number;
  ageGroup: {
    from: number;
    to: number;
  },
  gender: Gender;
  factor: number;
  usageValue: number;
}
