import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatInputModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TaskComponent } from './components/task/task.component';
import { ApiInterceptor } from './helpers/api.interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TasksListComponent, TasksEditComponent } from './components/task/tasks-list/tasks-list.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, RegistrationComponent,
    TaskComponent,
    NavigationComponent,
    TasksListComponent,
    TasksEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatInputModule, MatSelectModule,
    MatCardModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
    MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatDialogModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  entryComponents: [
    TasksEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


