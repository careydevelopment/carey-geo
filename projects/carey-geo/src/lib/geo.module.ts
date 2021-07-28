import { ModuleWithProviders, NgModule } from '@angular/core';
import { GeoService } from './geo.service';
import { GeoConfig } from './models/geo-config';
import { GEO_CONFIG_TOKEN } from './models/token';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [
    GeoService
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
