import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule) },
  { path: 'users', loadChildren: './user/user.module#UserModule' },
  { path: 'finances', loadChildren: './finance/finance.module#FinanceModule' },
  { path: 'child', loadChildren: './child/child.module#ChildModule' },
  { path: 'home', loadChildren: './static-pages/static-pages.module#StaticPagesModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
