import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { CurrencyRate } from 'src/models/currency-rate';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyRates():Observable<CurrencyRate[]>{
    return this.http.get<CurrencyRate[]>(`${environment.apiUrl}api/Currency/GetRates`);
  }
}
