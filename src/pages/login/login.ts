import { Component } from '@angular/core';
import { IonicPage,  NavController,  NavParams,  ViewController,  AlertController,  LoadingController, Loading} from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "";
  password: string = "";

  private loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _usuarioService: UsuarioProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logIn() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
    });
  
    this.loading.present().then( ()=> {
      this.loginService();
    });

  }

  private loginService() {
    this._usuarioService.login(this.email,this.password)
        .subscribe( async (resp) => {                    
          
          this.loading.dismissAll();
          let { token } = resp.data;
          try {
            await this._usuarioService.setToken(token);
            // const tokenStorage = await this._usuarioService.getToken();
            // console.log(tokenStorage);
            await this.viewCtrl.dismiss(true);  //error en web con doble scape
            
          } catch (error) {
            console.log(error);
          }          

        }, err =>{ //error en _usuarioService

          this.loading.dismissAll();
          console.log(err);
          let mensaje = "Intente de nuevo";
          
          if (err.error && err.error.message){
            mensaje = err.error.message;
          }

          this.alertCtrl.create({
            
            message: mensaje,
            title: 'Oooops!!',
            buttons: ['Ok'],
          }).present();
        });    
  }
}
