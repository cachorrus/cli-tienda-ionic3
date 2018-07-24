import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductoProvider } from '../providers/producto/producto';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { PipesModule } from '../pipes/pipes.module';
import { OrdenProvider } from '../providers/orden/orden';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DOMAIN_API } from '../config/api.services'
import { Storage } from '@ionic/storage';

export function jwtOptionsFactory(usuarioService : UsuarioProvider )  {     
  return {
    tokenGetter: () => {
      return usuarioService.getToken(); //storage.get('token');
    },
    whitelistedDomains: [DOMAIN_API],
  };
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UsuarioProvider] //Storage
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductoProvider,
    UsuarioProvider,
    OrdenProvider
  ]
})
export class AppModule {}
