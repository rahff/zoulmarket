import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BodyMail, DataMenuProfilUser, User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public subjectUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  public user$ = this.subjectUser$.asObservable()
  private URL_API = environment.URL_API;
  constructor(private http: HttpClient) { }

  getDataMenuProfilUser(): Observable<DataMenuProfilUser[]>{
    return this.http.get<any>(this.URL_API + "profil-user-menu").pipe(
      map((data)=>{
        return data.card
      }),
      map((data: any[])=>{
        const arrayData: DataMenuProfilUser[] = [];
        for (let i = 0; i < data.length; i++) {
          const card: DataMenuProfilUser = {
            logo: data[i].logo.formats ? data[i].logo.formats.thumbnail.url : data[i].logo.url,
            text: data[i].text,
            title: data[i].title,
            link: data[i].link
          };
          arrayData.push(card)
        }
        return arrayData
      })
    )
  }
  postMessage(body: BodyMail): Observable<{message: string, status: boolean}>{
    return this.http.post<any>("https://www.digitaldevelopment.fr/zoulmarket/contact", body).pipe(
      map((res)=>{
        if(res.status === 200){
          return {message: res.result, status: true}
        }else{
          return {message: "echec de l'envoi", status: false}
        }
      })
    )
  }
}
