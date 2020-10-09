import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mostrarAnimales: any = true;
  mostrarNumeros: any = false;
  mostrarColores: any = false;
  pais = "argentina";
  @ViewChild('banderaIdioma',{static:true}) banderaIdioma: ElementRef;
  @ViewChild('banderaTema',{static:true}) banderaTema: ElementRef;
  audio: HTMLAudioElement;

  constructor(private authSvc: AuthService) {
  }

  logout() {
     this.authSvc.logout().then( value =>{
       /* tratar error de desconeccion */
     })
  }

  cambiarTema(tema) {
    console.log(tema);
    if (tema == "animales") {
      this.mostrarAnimales = true;
      this.mostrarColores = false;
      this.mostrarNumeros = false;
      this.banderaTema.nativeElement.src = '../../assets/imagenes/animales.png';
    }
    else if (tema == "numeros") {
      this.mostrarNumeros = true;
      this.mostrarAnimales = false;
      this.mostrarColores = false;
      this.banderaTema.nativeElement.src = '../../assets/imagenes/numeros.jpg';
    }
    else if (tema == "colores") {
      this.mostrarColores = true;
      this.mostrarAnimales = false;
      this.mostrarNumeros = false;
      this.banderaTema.nativeElement.src = '../../assets/imagenes/colores.jpg';
    }

  }

  reproducirSonido(sonido) {
    this.audio = new Audio();
    if (this.pais == 'argentina') {
      let src = "./../assets/sonidos/argentina/" + sonido + ".mp3";
      console.log(src);
      this.audio.src = src;
      this.audio.load();
      var playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          /* setTimeout(() => {
              this.audio.pause();
            }, 3000); */
        })
      }
    }
    else if( this.pais == "brasil"){
      let src = "./../assets/sonidos/brasil/" + sonido + ".mp3";
      console.log(src);
      this.audio.src = src;
      this.audio.load();
      var playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          
        })
      }
    }
    else if(this.pais == "eeuu"){
      let src = "./../assets/sonidos/eeuu/"+sonido +".mp3";
      console.log(src);
      this.audio.src = src;
      this.audio.load();
      var playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {

        })
      }
    }

  }

  cambiarIdioma(pais) {
    console.log(this.banderaIdioma);
    this.banderaIdioma.nativeElement.src = '../../assets/imagenes/'+pais+'.png';
    this.pais = pais;
  }




}
