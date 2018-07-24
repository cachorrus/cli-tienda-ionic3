import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { OrdenProvider } from '../../providers/orden/orden';
import { Orden } from '../../shared/models/orden.model';
import { OrdenDetalle } from '../../shared/models/ordenDetalle.model';

/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenes: Orden[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _ordenesService: OrdenProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OrdenesPage');
    this._ordenesService.cargarOrdenes().subscribe( 
      (resp: any) => {
      this.ordenes = resp.data as Orden[];
    }, error => {      

      if (error.status === 401) {
        this.toastCtrl.create({
          message: 'No autorizado, favor de iniciar sesion',
          duration: 1500
        }).present();
      } else {
        console.error(error);
      }
    });
  }

  verDetalle(orden: Orden) {

    // this.modalCtrl.create('OrdenesDetallePage', { orden }).present();

    this.navCtrl.push('OrdenesDetallePage', { orden });

  }

}
