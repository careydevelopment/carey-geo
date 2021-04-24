import { ModuleWithProviders, NgModule } from '@angular/core';
import { GeoConfig } from './models/geo-config';
import { GEO_CONFIG_TOKEN } from './models/token';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class GeoModule {
  static forRoot(config: GeoConfig): ModuleWithProviders<GeoModule> {
    return {
      ngModule: GeoModule,
      providers: [{ provide: GEO_CONFIG_TOKEN, useValue: config }]
    };
  }
}
