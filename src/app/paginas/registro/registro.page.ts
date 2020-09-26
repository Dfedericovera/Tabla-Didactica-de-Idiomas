import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    console.log(email, password);
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if(user){
        this.router.navigate(['/verify-email']);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

}
