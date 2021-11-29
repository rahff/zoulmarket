import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { Product } from 'src/app/shared/models/product';
import { Variation } from 'src/app/shared/models/variation.model';
import { defineSizeOfProduct, isVariable, VariationService } from './utils';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  public onScreen: boolean = false;
  public product: Product | null = null;
  public onMobile: boolean = false;
  public subciption: Subscription = new Subscription();
  public itemForCart: any;
  public showAvis: boolean = false;
  public variations: Variation[] | null | undefined = null;
  public nameOfProduct: string | null = '';
  public sizeMode!: 'Taille' | 'Pointure' | null;
  public currentSize: any[] | null = null;
  public choicedSize: any;
  public enableAddToCart: boolean = false;
  public diameter: number = 500;
  public loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private variationService: VariationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.onMobile = true;
      this.diameter = 200;
    }
    this.onScreen = true;
    this.initValue();
    this.subciption.add(
      this.variationService.variation$.subscribe((obj) => {
        if (this.variations) {
          if (obj) {
            this.variations[obj.index] = obj.variation;
            if (this.product) {
              if(this.product.variations){
                this.product.variations[obj.index] = {
                  FNSKU: this.product.FNSKU,
                  description: this.product.description,
                  id: this.product.id,
                  img: this.product.img,
                  name: this.product.name,
                  price: this.product.price
                }
              }
              this.product = {
                ...this.product,
                description: obj.variation.description,
                img: obj.variation.img,
                name: obj.variation.name,
                price: obj.variation.price,
                FNSKU: obj.variation.FNSKU,
              };
            }
          }
        }
      })
    );
    this.subciption.add(
      this.variationService.size$.subscribe((size) => {
        if (size) {
          this.setChoisedSize(size);
        }
      })
    );
    this.sizeMode = defineSizeOfProduct(this.product).sizeMode;
    this.currentSize = defineSizeOfProduct(this.product).currentSize;
    if (!this.currentSize) {
      this.enableAddToCart = true;
    }
  }
  initValue(): void {
    this.product = this.activatedRoute.snapshot.data['product'];    
    if(this.product){
      console.log(this.product)
      this.nameOfProduct = this.product.name;
      if (isVariable(this.product)) {
        this.variations = this.product.variations;
      } else {
        this.product.variations = [];
      }
    }
  }
  setChoisedSize(size: any) {
    this.choicedSize = size;
    this.enableAddToCart = true;
  }
  sendProductToCart(obj: any): void {
    const itemForCart: ItemCart = {
      quantity: obj.quantity,
      size: this.choicedSize,
      cost: +(obj.product.price * obj.quantity).toFixed(2),
      product: obj.product,
    };
    this.cartService.addItemToCart(itemForCart);
  }
  showAvisAndScroll(event: boolean): void {
    this.showAvis = event;
    setTimeout(() => {
      document.getElementById('avis')?.scrollIntoView({behavior: "smooth"})
    }, 100);
  }
  nbrOfStarForAvis(rating: number): any[] {
    console.log(rating);
    
    const array: number[] = [];
    for (let i = 0; i < rating; i++) {
      array.push(i);
    }
    return array;
  }
  setFace(rating: number): string {
    if (rating >= 4) {
      return 'sentiment_satisfied_alt';
    } else if ((rating = 3)) {
      return 'sentiment_neutral';
    } else {
      return 'sentiment_dissatisfied';
    }
  }
  ngOnDestroy(): void {
    this.subciption.unsubscribe();
    this.onScreen = false;
  }
}
