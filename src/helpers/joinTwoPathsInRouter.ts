const PATH_SEPARATOR = '/';

const getPathWithoutSeparators = (path: string) => {
  let preparedPath = path;

  if (preparedPath[0] === PATH_SEPARATOR) {
    preparedPath = preparedPath.substring(1);
  }

  if (preparedPath[preparedPath.length - 1] === PATH_SEPARATOR) {
    preparedPath = preparedPath.substring(0, preparedPath.length - 1);
  }

  return preparedPath;
};

export const joinTwoPathsInRouter = (parentPath: string, childrenPath: string) => {
  const preparedParentPath = getPathWithoutSeparators(parentPath);
  const preparedChildrenPath = getPathWithoutSeparators(childrenPath);

  const joinedPaths = [preparedParentPath, preparedChildrenPath].filter(Boolean).join(PATH_SEPARATOR);

  return `${PATH_SEPARATOR}${joinedPaths}`;
};
