import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PorCategoriasPage } from './por-categorias';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PorCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(PorCategoriasPage),
    PipesModule
  ],
})
export class PorCategoriasPageModule {}
