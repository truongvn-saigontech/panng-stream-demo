import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@panng-stream-demo/auth/data-access';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          { path: '', redirectTo: 'post', pathMatch: 'full' },
          {
            path: 'post',
            canLoad: [AuthGuard],
            loadChildren: () =>
              import('@panng-stream-demo/post/feature').then(
                (m) => m.DemoPostFeatureModule
              ),
          },
        ],
      },
      {
        path: '',
        loadChildren: () =>
          import('@panng-stream-demo/auth/feature').then(
            (m) => m.DemoFeatureAuthModule
          ),
      },
    ]),
  ],
  declarations: [AuthLayoutComponent],
  exports: [RouterModule],
})
export class DemoShellModule {}
