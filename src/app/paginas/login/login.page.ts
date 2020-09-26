import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  ionicForm: FormGroup;
  isSubmitted = false;
  wrongEmail = false;


  constructor(private authSvc: AuthService, private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }





  cambiarUsuario(usuario, clave) {

    this.ionicForm.setValue({
      email: usuario,
      password: clave
    }
    )
  }

  async onLogin(email, password) {
    this.wrongEmail = false;
    try {
      this.isSubmitted = true;
      if (!this.ionicForm.valid) {
        console.log('Ingresar los datos correspondientes!')
        return false;
      } else {
        /* console.log(this.ionicForm.value); */
        const user = await this.authSvc.login(email.value, password.value);
        if (user.code != 'auth/user-not-found') {
          //Verificar email
          /* const isVerified = this.authSvc.isEmailVerified(user);
          this.redirectUser(isVerified); */
          this.router.navigate(['/home']);
        }
        else{
          this.emailInvalido();
        }
      }

    } catch (error) {
      console.log(error);

    }

  }
  emailInvalido(){
    this.wrongEmail = true;
  }

  async onLoginGoggle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.router.navigate(['/home']);
        /* const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified); */
      }
    } catch (error) {
      console.log(error);

    }
  }

  private redirectUser(isVerified: Boolean): void {
    console.log(isVerified);
    if (isVerified) {
      this.router.navigate(['/home']);
    }
    else {
      try {
        this.router.navigate(['/verify-email']);
      } catch (error) {
        console.log(error);

      }
    }
  }

}