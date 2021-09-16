import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { DataMenuProfilUser, User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public user!: User | null ;
  public cardsMenu!: DataMenuProfilUser[] ;
  public onScreen = false;
  constructor(private route: ActivatedRoute,
              private userService: UserService ) { }

  ngOnInit(): void {
    this.onScreen = true
    this.user = this.route.snapshot.data['userInfos']
    this.userService.subjectUser$.next(this.user)
    this.cardsMenu = this.route.snapshot.data['cardsMenu']
  }

  ngOnDestroy(): void{
    this.onScreen = false
  }

}
