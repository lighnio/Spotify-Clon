import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = ''

  @HostListener('error') errorHandler(): void {
    const localImg = '../../../../assets/images/spotify-logo.png'
    console.log('This img is broken --->', this.theHost);
    const nativeElement = this.theHost.nativeElement;
    this.customImg.length > 0 ? nativeElement.src = this.customImg : nativeElement.src = localImg
    
  }

  constructor(private theHost: ElementRef) {

  }

}
