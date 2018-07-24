import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Orden } from '../../shared/models/orden.model';
import { OrdenProvider } from '../../providers/orden/orden';

/**
 * Generated class for the OrdenesDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden: Orden;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ordenService: OrdenProvider,
              private toasCtrl: ToastController,
  ) {
    
    this.orden = navParams.get('orden');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesDetallePage');
  }

  eliminar( id: string) {

    this._ordenService.eliminar(id).subscribe(
      res => {
        this.toasCtrl.create({
          message: 'Orden eliminada',
          duration: 1500,
        }).present();
        this.navCtrl.pop();
    }, err => {
      console.error(err);
    });

  }

}
