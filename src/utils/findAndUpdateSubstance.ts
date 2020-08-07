import { SubstanceType } from '../types';

export default (
  substanceList: SubstanceType[],
  substance: SubstanceType,
) => substanceList.map(sub => (sub._id === substance._id ? substance : sub));
