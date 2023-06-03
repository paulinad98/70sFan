export function setPaginationPagesArray(maxPageDisplay: number, lastPage: number, currentPage: number) {
  const pages: number[] = [];

  let lastPageDisplay: number;
  let firstPageDisplay: number;

  const halfPages = getHalfPages(maxPageDisplay);

  if (currentPage + halfPages >= lastPage) {
    lastPageDisplay = lastPage - 1;
  } else {
    lastPageDisplay = currentPage + halfPages;
  }

  if (currentPage - halfPages <= 1) {
    firstPageDisplay = 2;
  } else {
    firstPageDisplay = currentPage - halfPages;
  }

  for (let i = firstPageDisplay; i <= lastPageDisplay; i++) {
    pages.push(i);
  }

  return pages;
}

export function getHalfPages(maxPageDisplay: number) {
  return Math.floor((maxPageDisplay - 1) / 2);
}

export function getNextPage(currentPage: number, lastPage: number) {
  if (currentPage + 1 <= lastPage) {
    return currentPage + 1;
  }

  return lastPage;
}

export function getPrevPage(currentPage: number) {
  if (currentPage - 1 > 0) {
    return currentPage - 1;
  }
  return 1;
}

export function hasFirstPageDots(maxPageDisplay: number, currentPage: number) {
  return currentPage > maxPageDisplay - getHalfPages(maxPageDisplay) + 1;
}

export function hasLastPageDots(maxPageDisplay: number, currentPage: number, lastPage: number) {
  return currentPage < lastPage - getHalfPages(maxPageDisplay) - 1;
}

export function hasPrevPage(currentPage: number) {
  return `sss${currentPage}`;
}
