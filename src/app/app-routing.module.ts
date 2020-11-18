import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { PushPlusComponent } from './push-plus';

const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', loadChildren: usersModule },
  { path: 'push-plus', component: PushPlusComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
