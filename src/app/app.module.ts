import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PushPlusComponent } from './push-plus';

@NgModule({
  declarations: [AppComponent, HomeComponent, PushPlusComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
