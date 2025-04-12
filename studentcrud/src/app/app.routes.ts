import { Routes } from  '@angular/router';
import { AddComponent } from './add/add.component';
import { ManageComponent } from './manage/manage.component';
import { AdminSidebarComponent } from './adminsidebar/adminsidebar.component';

export const routes: Routes = [
    {path:'add-task',component:AddComponent},
    {path:'manage',component:ManageComponent},
    // {path:'admin',component:AdminsidebarComponent},
    {path:'admin',component:AdminSidebarComponent}
];
