import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductoProvider } from '../../providers/producto/producto';
import { Producto } from '../../shared/models/producto.model';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pagina = 1;
  productos:Producto[] = [];
  // totalCarrito: number = 0;

  constructor(public navCtrl: NavController,
              public _productService: ProductoProvider,
              public _carritoService: CarritoProvider,
              public _usuarioService: UsuarioProvider
  ) {
    console.log('Constructor home');
  }

  // https://blog.ionicframework.com/navigating-lifecycle-events/
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.cargarProductos();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    // this._carritoService.getStorage().then( (items: Producto[])=>{
            
    //   this.totalCarrito = items ? items.length : 0;
            
    // });   
  }

  cargarProductos() {
    this._productService.cargarTodos(this.pagina).subscribe( datos => {
      this.productos.push(...datos.data);
    }, error => {
      console.error('Ooops!!', JSON.stringify(error));
    });
  }

  doInfinite(infiniteScroll) {
    this._productService.cargarTodos(++this.pagina).subscribe( datos => {
      this.productos.push(...datos.data);
    }, error => {
      console.error('Ooops!!', JSON.stringify(error));
    }, () => {
      infiniteScroll.complete();
    });
  }

  verProducto(producto: Producto) {

    this.navCtrl.push('ProductoPage',{ producto },);

  }

  async cerrarSesion() {
    await this._usuarioService.cerrarSesion();
    await this._carritoService.getStorage();
  }

}
