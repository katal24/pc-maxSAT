import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { DictionaryComponent } from './dictionary/dictionary.component';
import { PcComponent } from './pc/pc.component';
import { MaxSatComponent } from './max-sat/max-sat.component';
import { AgentsComponent } from './agents/agents.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },  
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'pc', component: PcComponent },
  { path: 'maxSat', component: MaxSatComponent },
  { path: 'results', component: ResultsComponent }  
];

@NgModule({
  exports: [RouterModule]
})

export class AppRoutingModule {
}
