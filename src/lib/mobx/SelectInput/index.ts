import { makeAutoObservable } from "mobx";

import { DomainStore } from "./domainStore";
import { UIStore } from "./uistore";

export class SelectInputStore {
  domainStore: DomainStore;
  uiStore: UIStore;

  constructor(options: string[]) {
    this.domainStore = new DomainStore(options, this);
    this.uiStore = new UIStore(this);
    makeAutoObservable(this);
  }
}
