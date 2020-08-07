export type SubstanceType = {
  name: string,
  amount?: string,
  casNumber?: string,
  location: number,
  place: string,
  number: number,
  _id?: number,
  company?: string
}

export type LoginDataType = {
  name: string,
  password: string
}

export type QueryStringDataType = {
  search: {
    type: string,
    value: string,
  },
  locations: number[]
}

export type LocationCollectionType = Map<number, Set<string>>

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
