import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {IsRegisteredGuard} from './guards/is-registered.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [IsRegisteredGuard]
  },
  { path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule),
    canLoad: [IsRegisteredGuard] },
  { path: 'horario',
    loadChildren: () => import('./horario/horario.module').then( m => m.HorarioPageModule),
    canLoad: [IsRegisteredGuard]
  },
  { path: 'activos',
    loadChildren: () => import('./activos/activos.module').then( m => m.ActivosPageModule),
    canLoad: [IsRegisteredGuard]
  },
  { path: 'videos',
    loadChildren: () => import('./videos/videos.module').then( m => m.VideosPageModule),
    canLoad: [IsRegisteredGuard]
  },
  { path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  { path: 'mae/:idMae/:nombreMae',
    loadChildren: () => import('./mae-profile/mae-profile.module').then( m => m.MaeProfilePageModule)
  },
];

/*const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomeModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
