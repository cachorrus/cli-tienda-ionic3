import { Producto } from '../../shared/models/producto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  carrito: Producto[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _carritoService: CarritoProvider,
              public viewCtrl: ViewController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
    this._carritoService.getStorage().then( (items: Producto[])=>{
            
      this.carrito = items ? items : [];
            
    });
  }

  eliminar(producto: Producto) {
    this._carritoService.borrar_producto(producto).then( (productos) =>  this.carrito = productos);
  }

  realizarPedido() {
    this._carritoService.realizarPedido().subscribe(
      async resp => {

        await this._carritoService.vaciarCarrito();
        this.carrito = [];

    }, err => {
      console.error(err);
    });
  }

}
