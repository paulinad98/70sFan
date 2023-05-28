export function setPaginationPagesArray(maxPageDisplay, lastPage, currentPage) {
  const pages = [];

  let lastPageDisplay, firstPageDisplay;

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

export function getHalfPages(maxPageDisplay) {
  return Math.floor((maxPageDisplay - 1) / 2);
}

export function getNextPage (currentPage, lastPage) {
  if (currentPage + 1 <= lastPage) {
    return currentPage + 1;
  } else {
    return lastPage;
  }
}

export function getPrevPage(currentPage) {
  if (currentPage - 1 > 0) {
    return currentPage - 1;
  } else {
    return 1;
  }
}

export function hasFirstPageDots(maxPageDisplay, currentPage) {
  return currentPage > maxPageDisplay - getHalfPages(maxPageDisplay) + 1;
}

export function hasLastPageDots(maxPageDisplay, currentPage, lastPage) {
  return currentPage < lastPage - getHalfPages(maxPageDisplay) - 1;
}

export function hasPrevPage(currentPage) {
  return 'sss' + currentPage ;
}