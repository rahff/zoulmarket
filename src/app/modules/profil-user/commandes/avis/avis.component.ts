import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
import { myValidators } from 'src/app/shared/functions';
import { Product } from 'src/app/shared/models/product';
import { Avis } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {

  public userId: string | null = null;
  public product!: Product;
  public username: string | null = null;
  public loading: boolean = true;
  public diameter: number = 500;
  public URL_IMG = environment.URL_IMG;
  public countComment: number = 0;
  private currentRating: number = 0;
  public comment!: FormGroup;
  public cols: number = 80;
  public rows: number = 8;
  get mainComment(){
    return this.comment.get('mainComment');
  }
  get title(){
    return this.comment.get('title')
  }
  public stars: string[] = ["bi-star","bi-star","bi-star","bi-star","bi-star"]
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.comment = this.fb.group({
      title: ['', [Validators.required, myValidators.validatorText]],
      mainComment: ['', [Validators.required, myValidators.validatorText]]
    })
    if(window.innerWidth < 600){
      this.diameter = 200;
    }
    this.activatedRoute.queryParamMap.subscribe((queryParam: ParamMap)=>{
        const id = queryParam.get('productId');
        this.userId = queryParam.get('userId');
        this.username = queryParam.get('username')
        console.log({a: this.username, b: this.userId});
        if(id){
          this.productService.getProductById(id).subscribe((product: Product)=>{
            this.product = product;
            console.log(this.product);
            this.loading = false;
          })
        }
    })
  }
  setRating(note: number):void {
    const stars: string[] = []
   this.stars.forEach((star: string, index: number)=>{
      if(index <= note){
        stars.push("bi-star-fill")
      }else{
        stars.push("bi-star")
      }
    })
   this.stars = [...stars]
   this.currentRating = note +1;
  }
  checkLonger(): void {
    if(this.mainComment){
      const value: string[] = this.mainComment.value.split('')
      this.countComment = value.length
      if(this.countComment > 300){
        this.mainComment.setErrors({toLong: true})
      }
    }
  }
  onSubmit(): void {
    if(this.comment.valid){
      if(this.userId){
        const body: Avis = { 
          user: this.userId,
          rating: this.currentRating,
          title: this.title?.value,
          commentaire: this.mainComment?.value,
          product: this.product.id,
          username: this.username ? this.username : "Anonyme"
          
        }
        console.log(this.product);
        
        this.productService.addRatingComponentOnProduct(body).subscribe(()=>{
          this.alertService.MakeAlert('Votre commentaire ?? ??t?? ajout?? avec succ??s', "success", 1500).then(()=>{
            this.router.navigate(['..']);
          })
        },
        (error)=>{
          this.alertService.MakeAlert('Une erreur c\'est produite...', "error", 1500).then(()=>{
            this.router.navigate([".."]);
          })
        })
      }
    }
  }
}
