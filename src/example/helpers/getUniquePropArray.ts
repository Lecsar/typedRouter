export const getUniquePropArray = <T extends Record<string, any>>(arr: T[], propName: keyof T) => {
  const uniqueDictionary = arr.reduce((acc, entity) => {
    acc[entity[propName]] = true;
    return acc;
  }, {} as Record<string, boolean>);

  return Object.keys(uniqueDictionary);
};
