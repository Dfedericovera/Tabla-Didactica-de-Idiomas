import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './paginas/registro/registro.module#RegistroPageModule' },
  { path: 'forgot-password', loadChildren: './paginas/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'verify-email', loadChildren: './paginas/verify-email/verify-email.module#VerifyEmailPageModule' },  { path: 'error', loadChildren: './paginas/error/error.module#ErrorPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
