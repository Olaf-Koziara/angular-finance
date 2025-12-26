export const numericValidator = (value: number | null | undefined): boolean => {
  return value !== null && value !== undefined && !isNaN(value) && isFinite(value);
};
