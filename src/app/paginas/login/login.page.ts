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

  cargarUsuario(){
    this.usuario.nombre="admin";
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