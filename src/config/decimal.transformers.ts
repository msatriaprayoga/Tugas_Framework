import { ValueTransformer } from 'typeorm';

// TypeORM mengembalikan kolom DECIMAL sebagai string.
// Transformer ini mengubahnya menjadi number di sisi aplikasi.
export const decimalTransformer: ValueTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) =>
    value === null || value === undefined ? value : parseFloat(value),
};