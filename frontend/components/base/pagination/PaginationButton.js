import { h } from "vue";

const PaginationButton = ({ page, currentPage }, { slots }) => {
  const baseClasses =
    "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700";
  const highlightClasses =
    "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700";

  return h(
    "li",
    h(
      "button",
      {
        class: [
          baseClasses,
          currentPage === page && !slots.default && highlightClasses,
        ],
      },
      slots.default ? slots.default() : page
    )
  );
};

export default PaginationButton;
