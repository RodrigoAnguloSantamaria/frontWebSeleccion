import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayersComponent } from './components/players/players.component';
import { NewsComponent } from './components/news/news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddplayerComponent } from './components/dashboard/addplayer/addplayer.component';

import { ListplayerComponent } from './components/dashboard/listplayer/listplayer.component';
import { ListteamComponent } from './components/dashboard/listteam/listteam.component';
import { AddteamComponent } from './components/dashboard/addteam/addteam.component';
import { AddgameComponent } from './components/dashboard/addgame/addgame.component';
import { ListgameComponent } from './components/dashboard/listgame/listgame.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Inicio' } },
  {
    path: 'players',
    component: PlayersComponent,
    data: { breadcrumb: 'Jugadores' },
  },
  { path: 'news', component: NewsComponent, data: { breadcrumb: 'Noticias' } },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { breadcrumb: 'Dashboard' },
    children: [
      {
        path: 'addplayer',
        component: AddplayerComponent,
        data: { breadcrumb: 'Añadir jugador' },
      },

      {
        path: 'listplayer',
        component: ListplayerComponent,
        data: { breadcrumb: 'Listar jugadores' },
      },

      {
        path: 'addteam',
        component: AddteamComponent,
        data: { breadcrumb: 'Añadir equipo' },
      },
      {
        path: 'listteam',
        component: ListteamComponent,
        data: { breadcrumb: 'Listar equipos' },
      },
      {
        path: 'addgame',
        component: AddgameComponent,
        data: { breadcrumb: 'Añadir partido' },
      },
      {
        path: 'listgame',
        component: ListgameComponent,
        data: { breadcrumb: 'Listar partidos' },
      },
    ],
    //ruta por defecto cuando no haya path nos redirije a ruta indicada
    // {path:'', pathMatch:'full', redirectTo:'addplayer'}
    //ruta por no encontrada elemento 404
    //{path:'404',component:'404componente'}
    // {path:'**', redirectTo:'404'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
