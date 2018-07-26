import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ProductoProvider } from '../../providers/producto/producto';
import { Producto } from '../../shared/models/producto.model';
import { Linea } from '../../shared/models/linea.model';

/**
 * Generated class for the PorCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  
  pagina = 1;
  linea: Linea;
  productos: Producto[] = [];
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _productService: ProductoProvider,
    public loadingCtrl: LoadingController,
  ) {

    this.linea = navParams.get('linea');
    this.presentLoadingDefault();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PorCategoriasPage');
    this.cargarProductosPorCategoria();
  }

  cargarProductosPorCategoria() {
    this._productService.cargarPorCategoria(this.linea._id, this.pagina).subscribe( datos => {
      this.productos.push( ...datos.data );
    }, error => {
      console.log('Ooops!!!', error);
    }, ()=> this.loading.dismiss());
  }

  doInfinite(infiniteScroll) {
    this._productService.cargarPorCategoria( this.linea._id, ++this.pagina).subscribe( datos => {
      this.productos.push(...datos.data);
    }, error => {
      console.error('Ooops!!', JSON.stringify(error));
    }, () => {
      infiniteScroll.complete();
    });
  }

  verProducto(producto: Producto) {

    this.navCtrl.push('ProductoPage', { producto });

  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
  }

}
