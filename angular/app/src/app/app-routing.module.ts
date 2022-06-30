import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { PosteoComponent } from './posteo/posteo.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { PadreGeneralComponent } from './padre-general/padre-general.component';
import { PublicarComponent } from './publicar/publicar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PosteosPersonalesComponent } from './posteos-personales/posteos-personales.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';


const routes: Routes = [
  {path: "", component: ContenedorComponent},
  {path: "login", component: LoginComponent},
  {path: "registrarse", component: RegistrarseComponent},
  {path: "aplicacion", component: PosteoComponent},
  {path: "padre", component: PadreGeneralComponent},
  {path: "publicar", component: PublicarComponent},
  {path: "perfil", component: PerfilComponent},
  {path: "posteosPersonales", component: PosteosPersonalesComponent},
  {path: "datosPersonales", component: DatosPersonalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
