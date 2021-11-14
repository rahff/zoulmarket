import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MenuAsideService {
    public toggleAside = new Subject<Event>()
    constructor(){}
    toggleMenuAside(event: Event): void {
        this.toggleAside.next(event)
    }
}