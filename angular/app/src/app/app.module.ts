import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { PosteoComponent } from './posteo/posteo.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { PadreGeneralComponent } from './padre-general/padre-general.component';
import { PublicarComponent } from './publicar/publicar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PosteosPersonalesComponent } from './posteos-personales/posteos-personales.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    PosteoComponent,
    ContenedorComponent,
    PadreGeneralComponent,
    PublicarComponent,
    PerfilComponent,
    PosteosPersonalesComponent,
    DatosPersonalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
