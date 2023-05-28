import { h } from 'vue';

const PaginationButton = ({ page, currentPage }, { slots }) => {
  const noHighlightClasses = 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 border-gray-300';
  const highlightClasses = 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700';

  return h(
    'li',
    h(
      'button',
      {
        class: [
          'px-3 py-2 leading-tight border',
          currentPage === page && !slots.default ? highlightClasses : noHighlightClasses,
        ],
      },
      slots.default ? slots.default() : page,
    ),
  );
};

export default PaginationButton;
