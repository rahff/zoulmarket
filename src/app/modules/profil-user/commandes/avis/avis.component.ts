import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MakeAlert, myValidators } from 'src/app/shared/functions';
import { Product } from 'src/app/shared/models/product';
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
  public stars: string[] = ["star_border","star_border","star_border","star_border","star_border"]
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder,
              private router: Router) { }

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
        stars.push("star")
      }else{
        stars.push("star_border")
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
        const body: Product = {
          ...this.product,
          avis:[...this.product.avis,{
          user: this.userId,
          rating: this.currentRating,
          title: this.title?.value,
          commentaire: this.mainComment?.value
        }]
        }
        this.productService.addRatingComponentOnProduct(this.product.id, body).subscribe(()=>{
          MakeAlert('Votre commentaire à été ajouté avec succès', "success", 1500).then(()=>{
            this.router.navigate(['..']);
          })
        },
        (error)=>{
          MakeAlert('Une erreur c\'est produite...', "error", 1500).then(()=>{
            this.router.navigate([".."]);
          })
        })
      }
    }
  }
}
