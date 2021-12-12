import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[active]'
})
export class ActiveDirective implements OnInit {

  @HostListener('click') private addClassActive(){
    this.el.nativeElement.classList.add('active')
  }
  constructor(private renderer: Renderer2, private el: ElementRef<HTMLElement>) { }
  ngOnInit(): void {
    console.log(this.el.nativeElement);
  }

}
