import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PetCreateComponent } from './pets/pet-create/pet-create.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { AuthGuard } from './auth/auth.guard';
import { FoodListComponent } from './food-list/food-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'create', component: PetCreateComponent, canActivate: [AuthGuard] },
  { path: 'mypets', component: PetListComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:petId',
    component: PetCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'browsefood',
    component: FoodListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
