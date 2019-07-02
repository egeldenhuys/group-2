import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SensorTestComponent } from './components/sensor-test/sensor-test.component';

import { MainComponent } from './main/main.component';
import { LiveFeedComponent } from './live-feed/live-feed.component';
import { SocketTestComponent } from './components/socket-test/socket-test.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LiveFeedComponent,
    SensorTestComponent,
    SocketTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }