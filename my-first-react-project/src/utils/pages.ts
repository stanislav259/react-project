export const getPagesCount = (
  totalCount: number, 
  limit: number,
  ): number => {
  return Math.ceil(totalCount / limit);
}

export const getPagesArray = (
  totalPages: number,
  ): number[] => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
}