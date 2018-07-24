import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_TIENDA	 } from '../../config/api.services';

/*
  Generated class for the ProductoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductoProvider {

  
  constructor(public http: HttpClient) {
    console.log('Hello ProductoProvider Provider');
  }

  cargarLineas(): Observable<any> {
    
    const url = `${API_TIENDA}lineas`;

    console.log(url);
    return this.http.get(url);
  }

  cargarTodos(pagina: number = 1): Observable<any> {

    let url = `${API_TIENDA}productos/list/${pagina}`;

    console.log(url);
    
    return this.http.get(url);

  }

  cargarPorCategoria( categoria:string, pagina: number = 1): Observable<any> {
    
    const url = `${API_TIENDA}productos/porTipo/${categoria}/${pagina}`;

    console.log(url);

    return this.http.get(url);

  }

  buscarTermino(termino: string){

    const url = `${API_TIENDA}productos/buscar/${termino}`;

    console.log(url);

    return this.http.get(url);

  }

  /*
  private getHeaders() {
    // const token = this.getToken();
    
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjQzYTFmYTc5ZDFmMzE1NTBiMWFhZDkiLCJjb3JyZW8iOiJjYWNob3JydXNAbWFyaW8uY29tIiwiaWF0IjoxNTMxODUxMjE3LCJleHAiOjE1MzE4OTQ0MTd9.2s5JJiVFCnuAreju13CTo47fFkaD_srYW_vnsQzVpDw'
    });
  }
  
  */
}
