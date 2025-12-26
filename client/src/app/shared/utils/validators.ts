import { SchemaPath } from '@angular/forms/signals';

export const numericValidator = (value: number | null | undefined): boolean => {
  console.log(value);
  return value !== null && value !== undefined && !isNaN(value) && isFinite(value);
};
