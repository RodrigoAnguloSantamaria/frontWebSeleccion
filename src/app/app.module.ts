import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayersComponent } from './components/players/players.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddplayerComponent } from './components/dashboard/addplayer/addplayer.component';
import { AddgameComponent } from './components/dashboard/addgame/addgame.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ListplayerComponent } from './components/dashboard/listplayer/listplayer.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ListteamComponent } from './components/dashboard/listteam/listteam.component';
import { AddteamComponent } from './components/dashboard/addteam/addteam.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ListgameComponent } from './components/dashboard/listgame/listgame.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PlayersComponent,
    NewsComponent,
    HomeComponent,
    DashboardComponent,
    AddplayerComponent,
    AddgameComponent,
    ListplayerComponent,
    DialogComponent,
    ListteamComponent,
    AddteamComponent,
    BreadcrumbComponent,
    ListgameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
