import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Producto } from '../../shared/models/producto.model';
import { ProductoProvider } from '../../providers/producto/producto';

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  productos:Producto[]= [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _productoService: ProductoProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  getItems(ev: any) {

    let termino = ev.target.value;

    if (termino && termino.trim() != '') {

      this._productoService.buscarTermino(termino)
        .subscribe(
          (resp:any) => {

            this.productos = resp.data;

        }, error => {
          console.error(error);
        });

    }else {

      this.productos = [];

    }

  }

  verProducto(producto: Producto) {

    this.navCtrl.push('ProductoPage', { producto });

  }

}
