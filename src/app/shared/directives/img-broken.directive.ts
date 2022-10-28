import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') errorHandler(): void {
    console.log('This img is broken --->', this.theHost);
    const nativeElement = this.theHost.nativeElement;
    nativeElement.src = '../../../../assets/images/spotify-logo.png'
    
  }

  constructor(private theHost: ElementRef) {

  }

}
