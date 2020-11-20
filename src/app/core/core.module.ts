import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { AlertService, MessageService, UserService } from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  entryComponents: [],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider,
    AlertService,
    MessageService,
    UserService,
  ],
})
export class CoreModule {}
