import { Routes } from '@angular/router';
import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';
import { EditComponent } from './post/edit/edit.component';
import { CreateComponent } from './post/create/create.component';
import { createComponent } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';
export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    // {path:'',redirectTo:'post/index',pathMatch:'full'},
    {path:'post',redirectTo:'post/index',pathMatch:'full'},
    {path:'post/index',component:IndexComponent},
    {path:'post/:postId/view',component:ViewComponent},
    {path:'post/create',component:CreateComponent},
    {path:'post/:postId/edit',component:EditComponent},
    {
        path: 'login', component: LoginComponent,
        canActivate: [authGuard]
    }    
];
