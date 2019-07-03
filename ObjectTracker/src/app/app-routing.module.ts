import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SensorTestComponent } from './components/sensor-test/sensor-test.component';
import { MainComponent } from '../app/main/main.component';
import { LiveFeedComponent } from '../app/live-feed/live-feed.component';
import { SocketTestComponent } from './components/socket-test/socket-test.component';
import { BallTestComponent } from './components/ball-test/ball-test.component';

const routes: Routes = [
  { path: 'sensor-test', component: SensorTestComponent },
  { path: 'main', component: MainComponent},
  { path: 'live-feed', component: LiveFeedComponent},
  { path: '', component: MainComponent},
  { path: 'socket-test', component: SocketTestComponent},
  { path: 'ball-test', component: BallTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
