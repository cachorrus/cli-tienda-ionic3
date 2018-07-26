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
  emailRegister: string = "";
  passwordRegister: string = "";

  option: string = "Login";

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

  loadingPresent() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
    });
  
    this.loading.present();
  }

  alertPresent(mensaje: string, title: string) {
    this.alertCtrl.create({
      
      message: mensaje,
      title: title,
      buttons: ['Ok'],
    }).present();
  }

  public logIn() {
    this.loadingPresent();
    this._usuarioService.login(this.email,this.password)
        .subscribe( async (resp) => {                    
                   
          let { token } = resp.data;
          try {
            await this._usuarioService.setToken(token);
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
          this.alertPresent(mensaje, 'Ooooops!!');
          
        }, ()=> this.loading.dismissAll());    
  }

  register(){
    this.loadingPresent();
    this._usuarioService.register(this.emailRegister, this.passwordRegister)
          .subscribe( (resp:any) => {
            this.option = 'Login';
            this.alertPresent('El usuario ' + resp.data.correo + 'fue registrado', 'Bienvenido prro');
          }, err => {
            console.log(err);
            this.loading.dismissAll();
            let mensaje = "Intente de nuevo";

            if (err.error && err.error.message){
              mensaje = err.error.message;
            }

            this.alertPresent(mensaje, 'Hubo un problema');
          }, ()=> this.loading.dismissAll());

  }
}
