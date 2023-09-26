import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateModuleConfig,
} from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { FeaturesModule } from '@features/features.module';
import { Language } from './shared';
import { AppStoreModule } from './state';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EnvType } from '@shared/interfaces';
import { environment } from 'src/environments/environment';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localePl, 'pl');

const serviceWorker =
  environment.envType === EnvType.PROD
    ? [
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          registrationStrategy: 'registerWhenStable:30000',
        }),
      ]
    : [];

const translateModuleConfig: TranslateModuleConfig = {
  defaultLanguage: Language.PL,
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(translateModuleConfig),
    HttpClientModule,
    FeaturesModule,
    CoreModule,
    BrowserAnimationsModule,
    AppStoreModule,
    ...serviceWorker,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl-PL' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
