import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  container: boolean = false;


  constructor(private cookie: CookieService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.checkValidCookie()? this.container = true : this.container = false

      if(!this.container){
        this.router.navigateByUrl('/auth/login')
        return false
      } else {
        return true
      }
  }

  checkValidCookie(): boolean {
    try {

      const token = this.cookie.check('auth_token')

      if(token == true) return token

      this.router.navigate(['/', 'auth'])
      return false
  
      
    } catch (e) {
      console.log('Somethings gone wrong...');
      return false
      
    }
     return true
  }
  
}
