import PaginationButton from "@/components/base/pagination/PaginationButton";

import { h } from "vue";
import { hasLastPageDots } from "@/utils/pagination";

const PaginationLastpageButton = (
  { maxPageDisplay, currentPage, lastPage },
  { emit }
) => {
  return [
    hasLastPageDots(maxPageDisplay, currentPage, lastPage) &&
      h("li", { class: "text-gray-500 mx-1" }, "..."),
    h(PaginationButton, {
      page: lastPage,
      currentPage: currentPage,
      onClick: () => {
        emit("click");
      },
    }),
  ];
};

PaginationLastpageButton.emits = ["click"];

export default PaginationLastpageButton;
