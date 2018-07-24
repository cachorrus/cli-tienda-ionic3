// import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
// import { fromPromise } from 'rxjs/observable/fromPromise';
import { Storage } from '@ionic/storage';
import {ToastOptions, AlertController,  ModalController,  Modal,  ToastController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { UsuarioProvider } from '../usuario/usuario';
import { API_TIENDA } from '../../config/api.services';
import { JwtHelperService } from '../../../node_modules/@auth0/angular-jwt';

/*
  Generated class for the CarritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarritoProvider {

  productos: Array<Producto> = [];
  totalMonto: number = 0;
  cantidadProcutos: number = 0;
  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private _storage: Storage,
    private _usuarioService: UsuarioProvider,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private jwtHelper: JwtHelperService,
  ) {
    console.log('Hello CarritoProvider Provider');   
    this.getStorage();
    
  }

  private totalCarrito() {
    // return fromPromise( this.getStorage() )
    //          .pipe(
    //            mergeMap( prod => prod.map( (item: Producto) => item.precioCompra )),
    //            reduce( (acc, cur)=> acc + cur )
    //          )
    this.cantidadProcutos = this.productos.length;
    this.totalMonto=0;

    this.productos.forEach( 
      (prod:Producto) =>  {
        this.totalMonto += Number(prod.precioCompra);
      }
    );
  }

  async verCarrito() {

      let modal: Modal;
      const token = await this._usuarioService.getToken();      

      if( token && !this.jwtHelper.isTokenExpired(token)) {
        console.log('carritoPage');
        modal = this.modalCtrl.create('CarritoPage');
      }else {
        console.log('LoginPage');
        modal = this.modalCtrl.create('LoginPage');
      }

      modal.onDidDismiss( (abrirCarrito: boolean) => {
        console.log('dismiss');
        if(abrirCarrito) {
          this.modalCtrl.create('CarritoPage').present();
        }

      });
      
      modal.present();   

  }

  realizarPedido(): Observable<any> {
    
    /*return fromPromise(this.getHeaders())
          .pipe(
            mergeMap(headers => {
              const items:Array<string> = [...this.productos.map( prod=> prod._id )];

              const body = {
                items: items.join()
              };
          
              const url = `${API_TIENDA}ordenes/realizarOrden`;              
              return this.http.post(url, body , { headers })
            })
          );    
    */

    const items:Array<string> = [...this.productos.map( prod=> prod._id )];

    const body = {
      items: items.join()
    };

    const url = `${API_TIENDA}ordenes/realizarOrden`;              
    return this.http.post(url, body);
  }

  /*
  private async getHeaders() {
    const token = await this._usuarioService.getToken();
    
    return new HttpHeaders({
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    });
  }
  */
  async agregar_producto( producto: Producto) {
    
    const existe = this.productos.findIndex( item=> item._id === producto._id );
    
    if (existe !== -1) {
      this.alertCtrl.create({
        title: 'Ya existe',
        subTitle: `${producto.producto} ya existe en el carrito`,
      }).present();
    } else {
      this.productos.push(producto);
      await this.setStorage(); 

      const optsToast: ToastOptions = {
        message: `${producto.producto} agregado al carrito`,
        duration: 2000,
      };    
      this.presentToast(optsToast) ;
    }
  }

  presentToast( opts:ToastOptions ) {
    this.toastCtrl.create(opts).present();
  }

  async borrar_producto( producto: Producto) {
    try {
      this.productos = await this.getStorage();
       const existe = this.productos.findIndex( item=> item._id === producto._id );
      
      if(existe !== -1) {
         this.productos.splice(existe,1);         
      }
      
      // this.productos.filter( e => e._id !== producto._id ); // non-mutating 

      await this.setStorage();

      const optsToast: ToastOptions = {
        message: `${producto.producto} eliminado del carrito`,
        duration: 2000,
      };    
      this.presentToast(optsToast) ;

      return this.productos;
    } catch (error) {
      console.log(error);
    }
  }

  private async setStorage() {
    
    try {
      await this._storage.set('productos', this.productos);  
      this.totalCarrito();
    } catch (error) {
      console.log(error);
    }
    
  }

  async getStorage(): Promise<Producto[]> {
    try {
      this.productos = await this._storage.get('productos');
      
      this.productos = this.productos ? this.productos : [];
      
      this.totalCarrito();

      return this.productos;
    } catch (error) {
      console.log(error);
    }
  }

  async vaciarCarrito() {
    this.productos = [];
    await this.setStorage();
    const optsToast: ToastOptions = {
      message: `Pedido realizado con exito`,
      duration: 2000,
    };    
    this.presentToast(optsToast) ;
  }

}
