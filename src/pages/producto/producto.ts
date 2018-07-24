import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../../shared/models/producto.model';
import { HomePage } from '../home/home';
import { CarritoProvider } from '../../providers/carrito/carrito';

/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto: Producto;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _carritoService: CarritoProvider
  ) {    

   if(!navParams.get('producto')) {
     navCtrl.setRoot(HomePage);
     navCtrl.popToRoot();     
   }

    this.producto = navParams.get('producto');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

  async agregarAlCarrito(producto: Producto) {
    await this._carritoService.agregar_producto(producto);
  }

}
