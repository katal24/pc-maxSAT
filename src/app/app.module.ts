import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "clarity-angular";
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AgentsComponent } from './agents/agents.component';
import { PcComponent } from './pc/pc.component';
import { MaxSatComponent } from './max-sat/max-sat.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

import { OnlyToComparePipe } from './pc/pc.component';
import { SortByResultPipe } from './results/results.component';

import { AgentService } from './agent.service';
import { PcService } from './pc.service';
import { MaxsatService } from './maxsat.service';
import { ResultService } from './result.service';
import { DictionaryService } from './dictionary.service';


@NgModule({
  declarations: [
    AppComponent,
    DictionaryComponent,
    AgentsComponent,
    PcComponent,
    MaxSatComponent,
    HomeComponent,
    ResultsComponent,
    OnlyToComparePipe,
    SortByResultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ClarityModule.forRoot()
  ],
  providers: [
    AgentService,
    PcService,
    MaxsatService,
    ResultService,
    DictionaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
