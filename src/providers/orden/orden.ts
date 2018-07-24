import { mergeMap } from 'rxjs/operators/mergeMap';
import {fromPromise} from 'rxjs/observable/fromPromise';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_TIENDA } from '../../config/api.services';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioProvider } from '../usuario/usuario';
import { JwtPayload } from '../../shared/models/jwtPayload.model';

/*
  Generated class for the OrdenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdenProvider {

  constructor(
    public http: HttpClient,
    private _usuarioService: UsuarioProvider,
    private jwtHelper: JwtHelperService,
  ) {
    console.log('Hello OrdenProvider Provider');
  }

  cargarOrdenes() {

    return fromPromise(this._usuarioService.getToken()).pipe(
      mergeMap( (token) => {
        if (!token) {
          throw ({ message: 'Favor de iniciar sesion', status: 401 });
        }
        
        const decodeToken: JwtPayload = this.jwtHelper.decodeToken(JSON.stringify(token));                

        // console.log(decodeToken);
        // console.log(this.jwtHelper.isTokenExpired(token));
        // console.log(this.jwtHelper.getTokenExpirationDate(token));

        const url = `${API_TIENDA}ordenes/usuario/${decodeToken.userId}`;

        return this.http.get(url);
      })
    );  

  }

  eliminar(id: string) {

    return fromPromise(this._usuarioService.getToken()).pipe(
      mergeMap( (token) => {

        if(!token){
          throw ({ message: 'Favor de iniciar sesion', status: 401 });
        }              

        const url = `${API_TIENDA}ordenes/borrar/${id}`;

        return this.http.delete(url);

      })
    )

  }

}
