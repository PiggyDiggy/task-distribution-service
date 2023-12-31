import { makeAutoObservable } from "mobx";

import { SelectInputStore } from ".";

export class DomainStore {
  filter: string;
  options: string[];
  private parentStore: SelectInputStore;

  constructor(options: string[], parentStore: SelectInputStore) {
    this.options = options;
    this.filter = "";
    this.parentStore = parentStore;
    makeAutoObservable(this, { options: false });
  }

  get filteredOptions() {
    return this.options.filter((option) => option.includes(this.filter));
  }

  setFilter = (newFilter: string) => {
    const oldSelected = this.filteredOptions[this.parentStore.uiStore.selectedIndex];
    this.filter = newFilter.trim();

    const oldSelectedIndex = this.filteredOptions.indexOf(oldSelected);
    this.parentStore.uiStore.selectedIndex =
      oldSelectedIndex === -1 ? this.filteredOptions.length - 1 : oldSelectedIndex;
  };

  selectOption = (option?: string) => {
    this.parentStore.uiStore.setInputValue(
      option || this.filteredOptions[this.parentStore.uiStore.selectedIndex] || this.parentStore.uiStore.inputValue
    );
    this.parentStore.uiStore.setIsOpen(false);
  };
}
