import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "", pathMatch: "full", loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "boutique", loadChildren: ()=> import('../modules/container-boutique/container-boutique.module').then(m => m.ContainerBoutiqueModule)
  },
  {
    path: "connection", loadChildren: ()=> import('../modules/logger/logger.module').then(m => m.LoggerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
