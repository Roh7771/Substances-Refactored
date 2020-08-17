import { QueryStringDataType } from '../types';

export default (queryStringData: QueryStringDataType) => {
  const queryString = [];

  if (queryStringData.search.value !== '') {
    queryString.push(
      `${queryStringData.search.type}=${queryStringData.search.value}`,
    );
  }
  if (queryStringData.locations.length !== 0) {
    queryString.push(`location=${queryStringData.locations.join(',')}`);
  }
  return queryString.join('&');
};
