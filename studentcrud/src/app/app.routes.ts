import { Routes } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';

export const routes: Routes = [
    {path:'',component:AdminSidebarComponent},
    {path:'add-task',component:AddTaskComponent},
    {path:'manage-task',component:ManageTaskComponent}
    
];
