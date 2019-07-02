import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SensorTestComponent } from './components/sensor-test/sensor-test.component';
import { SocketTestComponent } from './components/socket-test/socket-test.component';

const routes: Routes = [
  { path: 'sensor-test', component: SensorTestComponent},
  { path: 'socket-test', component: SocketTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
