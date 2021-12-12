import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ItemCart } from 'src/app/shared/models/item-cart.model';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('sizeBtns') public sizeBtns!: QueryList<ElementRef<HTMLLabelElement>>;
  @ViewChildren('qtyBtns') public qtyBtns!: QueryList<ElementRef<HTMLLabelElement>>;
  public BASE_URL_IMG = environment.URL_IMG;
  public currentImg: string = this.BASE_URL_IMG + '';
  public arraySmallImg: string[] = [];
  public arrayBigImg: string[] = [];
  public product!: Product;
  public arrayQuantity: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  public currentQuantity: number = 0;
  public sizes: string[] | null = null;
  public currentSize: string | null = null;
  public characteristics: string[] = [];
  public haveToChooseOneSize: boolean = false;
  public productId: string | null = null;
  private subscription: Subscription = new Subscription();
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe((queryParam: ParamMap) => {
        this.productId = queryParam.get('id');
        if (this.productId) {
          this.productService
            .getProductById(this.productId)
            .subscribe((product: Product) => {
              this.product = product;
              console.log(this.product);
              
              this.initImg();
              this.sizes = this.product.tailles;
              if(this.sizes?.length){
                this.haveToChooseOneSize = true;
              }
            });
        }
      })
    );
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setQuantity(1,0)
    }, 150);
  }
  setSize(size: string, index: number): void{
    this.sizeBtns.forEach((btn)=>{
      btn.nativeElement.classList.remove('active')
    })
    this.sizeBtns.get(index)?.nativeElement.classList.add('active');
    this.currentSize = size
  }
  setQuantity(qty: number, index: number): void{
    this.qtyBtns.forEach((btn)=>{
      btn.nativeElement.classList.remove('active')
    })
    this.qtyBtns.get(index)?.nativeElement.classList.add('active');
    this.currentQuantity = qty;
  }
  initImg(): void {
    this.currentImg = this.BASE_URL_IMG + `${this.product.img[0].img_big}`;
    this.arraySmallImg = this.extractSmallImg();
    this.arrayBigImg = this.extractBigImg();
    this.characteristics = this.extractCharacteristics(
      this.product.characteristics
    );
  }
  extractSmallImg(): string[] {
    const result: string[] = [];
    for (const obj of this.product.img) {
      const element = obj['img_mini'];
      result.push(`${this.BASE_URL_IMG + element}`);
    }
    return result;
  }
  extractBigImg(): string[] {
    const result: string[] = [];
    for (const obj of this.product.img) {
      const element = obj['img_big'];
      result.push(`${this.BASE_URL_IMG + element}`);
    }
    return result;
  }
  extractCharacteristics(data: any): string[] {
    const result: string[] = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        result.push(element);
      }
    }
    return result;
  }
  changeImg(index: number): void {
    this.currentImg = this.arrayBigImg[index];
  }
  addToCart(): void {
    if(this.haveToChooseOneSize && !this.currentSize){
      this.alertService.MakeAlert('Vous devez choisir une taille pour voter article !', "info", 1500);
      return;
    }else{
      const itemCart: ItemCart = {
        cost: this.product.price * this.currentQuantity,
        product: this.product,
        quantity: this.currentQuantity,
        size: this.currentSize
      }
      this.cartService.addItemToCart(itemCart);
      this.alertService.alertAddCart()
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
