import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

// import { UsersRoutingModule } from , './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { from } from 'rxjs';

@NgModule({
  imports: [SharedModule],
  declarations: [LayoutComponent, ListComponent, AddEditComponent],
})
export class UsersModule {}
