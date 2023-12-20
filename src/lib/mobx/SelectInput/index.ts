import { makeAutoObservable } from "mobx";

import { DomainStore } from "./domainStore";
import { UIStore } from "./uistore";

export class SelectInputStore {
  domainStore: DomainStore;
  uiStore: UIStore;

  constructor(options: string[], editable: boolean) {
    this.domainStore = new DomainStore(options, editable, this);
    this.uiStore = new UIStore(this);
    makeAutoObservable(this);
  }
}
