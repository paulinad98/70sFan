import { h } from 'vue';
import PaginationButton from '@/components/base/pagination/PaginationButton';

import { hasFirstPageDots } from '@/utils/pagination';

const PaginationFirstpageButton = (
  { maxPageDisplay, currentPage },
  { emit },
) => [
  h(PaginationButton, {
    page: 1,
    currentPage,
    onClick: () => {
      emit('click');
    },
  }),
  hasFirstPageDots(maxPageDisplay, currentPage)
      && h('li', { class: 'text-gray-500 mx-1' }, '...'),
];

PaginationFirstpageButton.emits = ['click'];

export default PaginationFirstpageButton;
