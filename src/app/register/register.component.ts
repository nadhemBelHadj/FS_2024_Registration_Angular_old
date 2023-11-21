import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  
 public user = new User();
 confirmPassword?:string;
 myForm!: FormGroup;
 err=""
 loading= false;
 constructor(  private authSerice:AuthService ,  private router:Router,
                private formBuilder: FormBuilder ,
                private toastr: ToastrService) { }

 ngOnInit(): void {
  this.myForm = this.formBuilder.group({
   
    username : ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword : ['', [Validators.required]]
 } );

 }

onRegister()
{
  //console.log(this.user);
 this.loading=true;
 this.authSerice.registerUser(this.user).subscribe({
   next:(res)=>{
     console.log(res);
     this.authSerice.setRegistredUser(this.user);
     this.loading=false;
    // alert("veillez confirmer votre email");
    this.toastr.success('veillez confirmer votre email', 'Confirmation');
  
     this.router.navigate(["/verifEmail"]);

   },
   error:(err:any)=>{
     if(err.status=400){
       this.err= err.error.message;
       this.loading=false;
        }
   }
 }
 )
}



}
