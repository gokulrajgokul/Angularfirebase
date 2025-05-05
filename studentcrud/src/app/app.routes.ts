import { Routes } from  '@angular/router';
import { AddComponent } from './add/add.component';
import { ManageComponent } from './manage/manage.component';
import { AdminSidebarComponent } from './adminsidebar/adminsidebar.component';
import { RegisterinternComponent } from './registerintern/registerintern.component';
import { AssigntaskComponent } from './assigntask/assigntask.component';
import { PaymentComponent } from './payment/payment.component';
import { FileUploadComponent } from './fileupload/fileupload.component';

export const routes: Routes = [
    {path:'add',component:AddComponent},
    {path:'manage',component:ManageComponent},
    {path:'admin',component:AdminSidebarComponent},
     
    {path:'registerintern',component:RegisterinternComponent},
    {path:'assigntask',component:AssigntaskComponent},
    {path:'',component:AssigntaskComponent},
    {path:'payment',component:PaymentComponent},
    {path:'fileupload',component:FileUploadComponent}
    
];