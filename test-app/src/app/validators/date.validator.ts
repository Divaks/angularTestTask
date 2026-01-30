import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = control.get('startTime')?.value;
  const end = control.get('endTime')?.value;

  if (!start || !end) return null;

  const startDate = new Date(start);
  const endDate = new Date(end);

  return endDate <= startDate ? { dateRangeInvalid: true } : null;
};
