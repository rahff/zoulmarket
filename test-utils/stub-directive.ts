import { Directive, Input, HostListener } from "@angular/core"

@Directive({
    selector: "[routerLink]"
  })
  export class RouterLinkDirective{
    @Input('routerLink') linkParams: string | string[] |null = null
    navigateTo: string | string[] | null = null
    @HostListener('click') private navigate(): void {
      this.navigateTo = this.linkParams
    }
  }