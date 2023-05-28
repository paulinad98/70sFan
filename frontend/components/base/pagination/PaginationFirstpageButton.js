import PaginationButton from "@/components/base/pagination/PaginationButton";

import { h } from "vue";
import { hasFirstPageDots } from "@/utils/pagination";

const PaginationFirstpageButton = (
  { maxPageDisplay, currentPage },
  { emit }
) => {
  return [
    h(PaginationButton, {
      page: 1,
      currentPage: currentPage,
      onClick: () => {
        emit("click");
      },
    }),
    hasFirstPageDots(maxPageDisplay, currentPage) &&
      h("li", { class: "text-gray-500 mx-1" }, "..."),
  ];
};

PaginationFirstpageButton.emits = ["click"];

export default PaginationFirstpageButton;
