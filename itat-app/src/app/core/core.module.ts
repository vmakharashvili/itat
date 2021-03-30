import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDataService } from './services/fake-data.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FakeDataService, { delay: 100 })
  ],
  providers: [ApiService, AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class CoreModule { }
