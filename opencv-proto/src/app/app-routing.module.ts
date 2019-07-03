import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpencvTestComponent } from './opencv-test/opencv-test.component';

const routes: Routes = [
  { path: 'opencv-test', component: OpencvTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
