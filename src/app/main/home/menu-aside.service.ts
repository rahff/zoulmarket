import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MenuAsideService {
    public toggleAside = new Subject<Event>()
    public toggleNavbar = new Subject<MouseEvent>()
    public toggleOptionList = new Subject<{toggle: MouseEvent, location: string}>()
    constructor(){}
    observeMenuState(): Observable<Event>{
        return this.toggleAside.asObservable()
    }
    toggleMenuAside(event: Event): void {
        this.toggleAside.next(event)
    }
    toggleMenuNavBar(toggle: MouseEvent): void{
        this.toggleNavbar.next(toggle)
    }
    toggleOptionListMenu(toggle: MouseEvent, location: string): void{
        this.toggleOptionList.next({toggle, location })
    }
}