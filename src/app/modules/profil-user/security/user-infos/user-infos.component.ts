import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit {

  public user!: User;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user']
  }
  editInfosUser(subject:string): void {
    this.router.navigate(["/profil","security",this.user.id,"update", subject])

  }
}
