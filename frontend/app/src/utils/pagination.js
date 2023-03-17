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
