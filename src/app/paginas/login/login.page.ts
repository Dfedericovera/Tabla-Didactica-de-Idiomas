import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuario = new Usuario("","");

  constructor() {
    
   }

  ngOnInit() {
  }

  cambiarUsuario(usuario){
    
    this.usuario.nombre=usuario;
    this.usuario.clave = "clave";
  }

}

export class Usuario{

  nombre:string;
  clave:string;

  constructor(nombre:string, clave:string){
    this.nombre=nombre;
    this.clave = clave;
  }

}