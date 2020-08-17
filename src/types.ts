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

export type AllSubstancesServerResponseType = {
  substances: SubstanceType[];
};

export type CSRFTokenServerResponseType = {
  csrfToken: string;
};

export type OneSubstanceServerResponseType = {
  substance: SubstanceType;
};
