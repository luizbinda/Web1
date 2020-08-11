import { HeaderData } from "./header.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  private _headerDate = new BehaviorSubject<HeaderData>({
    title: "Início",
    icon: "home",
    routeUrl: "",
  });
  constructor() {}

  get headerDate(): HeaderData {
    return this._headerDate.value;
  }

  set headerDate(newData: HeaderData) {
    this._headerDate.next(newData);
  }
}
