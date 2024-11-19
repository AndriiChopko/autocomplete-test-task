export interface InputValues {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type AutocompleteDataType = Record<keyof InputValues, string[]>;

export type SnackbarReturnValues = {
  isOpen: boolean,
  message: string,
  isSuccess: boolean,
  open(message: string, success: boolean): void,
  close(): void,
}