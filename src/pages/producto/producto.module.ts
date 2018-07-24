import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoPage } from './producto';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductoPage),
    PipesModule,
  ],
})
export class ProductoPageModule {}
