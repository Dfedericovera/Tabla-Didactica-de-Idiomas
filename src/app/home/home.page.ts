import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

  audio: HTMLAudioElement;

  constructor() {
  }

  logout() {
  }

  cambiarTema(tema) {
    console.log(tema);
    if (tema == "animales") {
      this.mostrarAnimales = true;
      this.mostrarColores = false;
      this.mostrarNumeros = false;
    }
    else if (tema == "numeros") {
      this.mostrarNumeros = true;
      this.mostrarAnimales = false;
      this.mostrarColores = false;
    }
    else if (tema == "colores") {
      this.mostrarColores = true;
      this.mostrarAnimales = false;
      this.mostrarNumeros = false;
    }

  }

  reproducirSonido(sonido,universal?) {
    this.audio = new Audio();
    if(universal){
      let src = "./../assets/sonidos/" + sonido + ".mp3";
      console.log(src);
      this.audio.src = src;
      this.audio.load();
      this.audio.play();      
    }
    else if (this.pais == 'argentina') {
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
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          /* setTimeout(() => {
              this.audio.pause();
            }, 3000); */
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
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          /* setTimeout(() => {
              this.audio.pause();
            }, 3000); */
        })
      }
    }

  }

  cambiarIdioma(pais) {
    console.log(pais);
    this.pais = pais;
  }




}
