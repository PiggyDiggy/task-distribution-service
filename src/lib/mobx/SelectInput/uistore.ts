import { makeAutoObservable } from "mobx";

import { SelectInputStore } from ".";

export class UIStore {
  inputValue: string;
  isOpen: boolean;
  selectedIndex: number;
  private parentStore: SelectInputStore;

  constructor(parentStore: SelectInputStore) {
    this.parentStore = parentStore;
    this.inputValue = parentStore.domainStore.options[0] || "";
    this.isOpen = false;
    this.selectedIndex = 0;
    makeAutoObservable(this);
  }

  setInputValue = (newValue: string) => {
    this.inputValue = newValue;
    this.parentStore.domainStore.setFilter(newValue);
  };

  setIsOpen = (newState: boolean) => {
    this.isOpen = newState;

    if (!newState) {
      this.parentStore.domainStore.setFilter("");
      this.selectedIndex = 0;
    }
  };

  toggleIsOpen = () => {
    this.setIsOpen(!this.isOpen);
  };

  selectNext = () => {
    if (this.selectedIndex === this.parentStore.domainStore.filteredOptions.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  };

  selectPrev = () => {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.parentStore.domainStore.filteredOptions.length - 1;
    } else {
      this.selectedIndex--;
    }
  };
}
