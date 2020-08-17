export const SUBSTANCE_TO_SHOW_AMOUNT = 20;

export const EMPTY_FIELD_VALUE = '-';

export enum ErrorStatus {
  OK,
  DUPLICATE_CAS_NUMBER,
  LOADING_FAILED,
  WRONG_LOGIN_DATA
}

export enum AuthorizationStatus {
  AUTH,
  NO_AUTH
}

export enum ModalWindowStatus {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  NONE = 'NONE'
}
