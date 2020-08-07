import { SubstanceType } from '../types';

export default (substanceList: SubstanceType[], substance: SubstanceType) => {
  const index = substanceList.findIndex(sub => sub._id === substance._id);

  const newSubstanceList = [...substanceList];
  newSubstanceList.splice(index, 1);
  return newSubstanceList;
};
