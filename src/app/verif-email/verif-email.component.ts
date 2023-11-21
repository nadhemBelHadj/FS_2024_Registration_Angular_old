import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent  implements OnInit{

  code:string="";
  Obj:any;
  user:User=new User();
  err="";
  constructor(private route:ActivatedRoute,private authService:AuthService,
    private router:Router
    ) {}

    
    ngOnInit(): void {
      this.user =this.authService.regitredUser;
  
    }

onValidateEmail(){
  this.authService.validateEmail(this.code).subscribe({
    next : (res)=> {
    alert('Login successful');

    this.authService.login(this.user).subscribe({
      next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
      }
      });
    },
  error: (err: any) => {
    if(err.status=400){
      this.err= err.error.message;
       }
    console.log(err.errorCode);
  }});
}
}
