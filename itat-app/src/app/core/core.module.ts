import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDataService } from './services/fake-data.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FakeDataService, { delay: 100 })
  ],
  providers: [ApiService]
})
export class CoreModule { }
