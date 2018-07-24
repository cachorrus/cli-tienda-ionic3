import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPage } from './carrito';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CarritoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPage),
    PipesModule,
  ],
})
export class CarritoPageModule {}
