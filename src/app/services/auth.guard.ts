import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, of } from "rxjs";
import { MakeAlert, CheckYourMails } from "../shared/functions";
import { User } from "../shared/models/user.model";
import { PlatformDetector } from "./platform-detection.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private userService: UserService,
                private router: Router,
                private detectPlatform: PlatformDetector){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
         let isLoggedIn = false
         this.userService.user$.subscribe((user: User | null)=>{
             if(user && user.confirmed){
                 isLoggedIn =  !!user
             }else if(user && !user.confirmed){
                 isLoggedIn = false;
                 MakeAlert('Vous devez valider votre compte', 'error', 2000).then(()=>{
                    CheckYourMails(this.detectPlatform.UserPlatform.value)
                 })
             }
        })
        if(!isLoggedIn){
            MakeAlert("Veuillez vous connectez", "error", 1500).then(()=>{
                this.router.navigate(['/connexion'])
            })
        }
        return of(isLoggedIn)
    }
    canLoad(route: Route, segment: UrlSegment[]): Observable<boolean>{
        let isLoggedIn = false
        this.userService.user$.subscribe((user: User | null)=>{
            if(user && user.confirmed){
                isLoggedIn =  !!user
            }else if(user && !user.confirmed){
                isLoggedIn = false;
                MakeAlert('Vous devez valider votre compte', 'error', 2000).then(()=>{
                   CheckYourMails(this.detectPlatform.UserPlatform.value)
                })
            }
       })
       if(!isLoggedIn){
           MakeAlert("Veuillez vous connectez", "error", 1500).then(()=>{
               this.router.navigate(['/connexion'])
           })
       }
       return of(isLoggedIn)
    }
}