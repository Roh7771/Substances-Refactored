import { SubstanceType } from '../types';

export default (substances: SubstanceType[]) => {
  const locationCollection = new Map<number, Set<string>>();

  substances.forEach(substance => {
    if (locationCollection.has(Number(substance.location))) {
      const placeCollection = locationCollection.get(Number(substance.location)) as Set<string>;
      placeCollection.add(substance.place);
      locationCollection.set(Number(substance.location), placeCollection);
    } else {
      const placeCollection = new Set<string>();
      placeCollection.add(substance.place);
      locationCollection.set(Number(substance.location), placeCollection);
    }
  });

  return locationCollection;
};
