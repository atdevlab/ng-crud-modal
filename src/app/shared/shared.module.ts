import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';
import { AlertComponent } from './alert.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AlertComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,

    // Components
    AlertComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
