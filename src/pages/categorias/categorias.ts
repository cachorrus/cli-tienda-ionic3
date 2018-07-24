import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Linea } from '../../shared/models/linea.model';
import { ProductoProvider } from '../../providers/producto/producto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  lineas: Linea[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _productService: ProductoProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
    this.cargarLineas();
  }

  cargarLineas() {
    this._productService.cargarLineas().subscribe( datos => {
      this.lineas.push(...datos.data);
    }, error => {
      console.error('Ooops!!', JSON.stringify(error));
    });
  }

  porCategoria(linea: Linea) {
    this.navCtrl.push('PorCategoriasPage', { linea });
  }

}
