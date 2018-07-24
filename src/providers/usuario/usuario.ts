import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_TIENDA } from '../../config/api.services';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  activo: boolean;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello UsuarioProvider Provider');
    this.getToken().then( token=>{
      this.activo = token ? true: false;
    });
  }

  login( correo: string, password: string ): Observable<any> {

    const body = {
      correo,
      password,
    };

    const url = `${API_TIENDA}auth/login`;

    return this.http.post(url, body);
  }
  
  async setToken(token: string) {
    await this.storage.set('token',token).then( ()=> this.activo = true);    
  }

  async getToken():Promise<string> {
    return await this.storage.get('token').then( (token)=> {
      this.activo = token ? true : false;
      return token;
    });    
  }

  async cerrarSesion() {
    await this.storage.clear().then( ()=> this.activo = false);    
  }
}
