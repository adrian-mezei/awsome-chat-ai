import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pizzabot',
        loadChildren: () => import('../pizzabot/pizzabot.module').then(m => m.PizzabotPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'translate',
        loadChildren: () => import('../translate/translate.module').then(m => m.TranslatePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'sentiment',
        loadChildren: () => import('../sentiment/sentiment.module').then(m => m.SentimentPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'speech',
        loadChildren: () => import('../speech/speech.module').then( m => m.SpeechPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'user-group',
        loadChildren: () => import('../user-group/user-group.module').then( m => m.UserGroupPageModule),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/pizzabot',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pizzabot',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
