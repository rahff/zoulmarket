import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeStoreComponent } from './home-store/home-store.component';




const routes: Routes = [
    {
        path: "",  component: HomeStoreComponent
    },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
  ],
  exports: [RouterModule]
})
export class StoresRoutingModule { 
    static components = [HomeStoreComponent]
}
