import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-form-update-infos-user',
  templateUrl: './form-update-infos-user.component.html',
  styleUrls: ['./form-update-infos-user.component.css']
})
export class FormUpdateInfosUserComponent implements OnInit {

  public subject: string | null = ''
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.subject = paramMap.get('subject')
    })
  }

}
