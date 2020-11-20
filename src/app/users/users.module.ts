import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ModalComponent } from '@app/shared';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule, NgbModule],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent,
    ModalComponent,
  ],
})
export class UsersModule {}
