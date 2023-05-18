import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BasePagination from "../components/base/BasePagination.vue";

describe("BasePagination", () => {
  it("renders properly", () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 2, modelValue: 1 },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders 2 pagination btns and 2 arrow btns when lastPage is 2", () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 2, modelValue: 1 },
    });
    const btns = wrapper.findAll("button");

    expect(btns.length).toBe(4);

    ["Previous", "1", "2", "Next"].forEach((text) => {
      expect(btns.findIndex((btn) => btn.text() === text)).not.toBe(-1);
    });
  });

  it("renders correct number of pagination buttons", () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 5, modelValue: 1, maxPageDisplay: 3 },
    });

    const btns = wrapper.findAll("button");
    const numberButtons = btns.filter(
      (btn) => btn.text() !== "Previous" && btn.text() !== "Next"
    );

    expect(numberButtons.length).toBe(3);
  });

  it("correctly emits page number when pagination button is clicked", () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 5, modelValue: 1 },
    });

    const btns = wrapper.findAll("button");
    const secondButton = btns.filter((btn) => btn.text() === "2")[0];

    secondButton.trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual([2]);
  });

  it("set prev and last page", () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 5, modelValue: 3 },
    });

    expect(wrapper.vm.prevPage).toBe(2);
    expect(wrapper.vm.nextPage).toBe(4);
  });

  it("set display pages array", () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 10, modelValue: 3, maxPageDisplay: 5 },
    });

    expect(wrapper.vm.pagesArray).toEqual([2, 3, 4, 5]);
  });

  it("emits page number when arrow button is clicked", async () => {
    const wrapper = mount(BasePagination, {
      props: { lastPage: 5, modelValue: 1 },
    });

    const btns = wrapper.findAll("button");
    const nextButton = btns.filter((btn) => btn.text() === "Next")[0];

    nextButton.trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual([2]);

    await wrapper.setProps({ modelValue: 5 });
    nextButton.trigger("click");
    expect(wrapper.emitted("update:modelValue")[1]).toEqual([5]);

    await wrapper.setProps({ modelValue: 2 });
    const previousButton = btns.filter((btn) => btn.text() === "Previous")[0];

    previousButton.trigger("click");
    expect(wrapper.emitted("update:modelValue")[2]).toEqual([1]);

    previousButton.trigger("click");
    expect(wrapper.emitted("update:modelValue")[3]).toEqual([1]);
  });
});
