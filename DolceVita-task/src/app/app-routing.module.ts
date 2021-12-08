import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  
 
  {
      path: '',
      redirectTo:'/DolceVita',
      pathMatch: 'full'
    }

    ,

    {
      path: "DolceVita",
      component: TaskListComponent
    },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule {

 }
