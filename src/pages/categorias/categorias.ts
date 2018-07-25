import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _productService: ProductoProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.presentLoadingDefault();
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
    }, ()=> this.loading.dismiss());
  }

  porCategoria(linea: Linea) {
    this.navCtrl.push('PorCategoriasPage', { linea });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }

}
