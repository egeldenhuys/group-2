import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorTestComponent } from './components/sensor-test/sensor-test.component';
import { MatIconModule } from '@angular/material/icon';

import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorTestComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
