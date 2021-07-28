import { Inject, Injectable } from '@angular/core';
import { Country } from './models/country';
import { State } from './models/state';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GEO_CONFIG_TOKEN } from './models/token';
import { GeoConfig } from './models/geo-config';

@Injectable({ providedIn: 'root' })
export class GeoService {

  private _allCountries: Country[];
  private _allStates: State[];
  private _allTimezones: string[];

  constructor(private http: HttpClient,
    @Inject(GEO_CONFIG_TOKEN) private readonly config: GeoConfig) { }

  get allCountries() {
    return this._allCountries;
  }

  get allStates() {
    return this._allStates;
  }

  get allTimezones() {
    return this._allTimezones;
  }

  fetchAllCountries(): Observable<Country[]> {
    if (!this._allCountries) {
      let countriesObservable$ = this.http.get<Country[]>(`${this.config.baseUrl}/countries`);

      return countriesObservable$.pipe(
        tap(countries => this._allCountries = countries)
      )
    } else {
      return of(this._allCountries);
    }
  }

  fetchAllStates(): Observable<State[]> {
    if (!this._allStates) {
      let statesObservable$ = this.http.get<State[]>(`${this.config.baseUrl}/states`);

      return statesObservable$.pipe(
        tap(states => this._allStates = states)
      )
    } else {
      return of(this._allStates);
    }
  }

  fetchAllTimezones(): Observable<string[]> {
    if (!this._allTimezones) {
      let zonesObservable$ = this.http.get<string[]>(`${this.config.baseUrl}/timezones`);

      return zonesObservable$.pipe(
        tap(zones => this._allTimezones = zones)
      )
    } else {
      return of(this._allTimezones);
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Problem trying to retrieve geo array!", error);
  };

  findCountryCodeByTwoLetterAbbreviation(abbreviation: string): string {
    let code: string = null;

    if (!this.allCountries) {
      this.fetchAllCountries().subscribe(
        (countries: Country[]) => code = this.findCountryCode(abbreviation)
      )
    } else {
      code = this.findCountryCode(abbreviation);
    }

    return code;
  }

  private findCountryCode(abbreviation: string): string {
    let code = null;

    if (abbreviation && abbreviation.trim().length > 0) {
      for (let i = 0; i < this.allCountries.length; i++) {
        let country = this.allCountries[i];
        if (country.twoLetterCode.toUpperCase() == abbreviation.toUpperCase()) {
          code = country.countryCode;
          break;
        }
      }
    }

    return code;
  }
}
