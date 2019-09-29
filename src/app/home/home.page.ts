import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  botones:Boton[]=[];

  constructor() {
    for(let i = 0;i<5;i++){
      this.botones.push(new Boton(i.toString()));
    }
  }

}

export class Boton{

  nombre:string;

  constructor(nombre:string){
    this.nombre=nombre;
  }
  
}
