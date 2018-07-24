import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdenesDetallePage } from './ordenes-detalle';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrdenesDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(OrdenesDetallePage),
    PipesModule,
  ],
})
export class OrdenesDetallePageModule {}
