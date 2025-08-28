import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PptGeneratorComponent } from './components/ppt-generator/ppt-generator.component';

const routes: Routes = [
  { path: '', redirectTo: '/ppt-generator', pathMatch: 'full' },
  { path: 'ppt-generator', component: PptGeneratorComponent },
  { path: '**', redirectTo: '/ppt-generator' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }