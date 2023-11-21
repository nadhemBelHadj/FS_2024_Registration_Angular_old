import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {


  user = new User();
  err : number = 0;

  enabled : boolean=true;

  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      this.authService.isUserEnabledbled(this.user.username).subscribe( {next: (enabled=> {
        if (enabled)
        {
            
          this.authService.login(this.user).subscribe({
            next: (data) => {

              let jwToken = data.headers.get('Authorization')!;
              this.authService.saveToken(jwToken);
              this.router.navigate(['/']); 
    
            },
            error: (err) => {
            this.err = 1; 
            }
            });
        }
        else{
            this.enabled=false;
            }
      }
        )})
    }
}
