import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef<HTMLElement>) { }
  ngOnInit(): void {
    console.log(this.el.nativeElement.children);
    this.el.nativeElement.classList.add('active')
  }

}
