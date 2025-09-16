export type Gender = 'm' | 'v' | 'x';
export type Method = 'een_leven';

export interface CalculationInput {
  value: number;
  age: number;
  gender: Gender;
  method: Method;
}

export interface Calculation {
  method: Method;
  value: number;
  age_group: {
    from: number;
    to: number;
  },
  gender: Gender;
  factor: number;
  usage_value: number;
}
