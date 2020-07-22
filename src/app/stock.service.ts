import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStock {
  id: number;
  ticker: string;
  price: number;
  previousPrice: number;
  openingPrice: number;
  percentProfit: number;
  name: string;
  description: string;
  lastUpdatedDate: string;
}

@Injectable({
  providedIn: 'root'
})
// Service to store all stocks in order for interaction
export class StockService {

  constructor(private http: HttpClient) { }

  // Getting data for the stock prices
  getStockDataFor(ticker): Observable<any> {
    return this.http.get<IStock[]>('https://finnhub.io/api/v1/quote?symbol='+ticker+'&token=bs9gkqvrh5rahoaogp5g');
  }
  
  // Getting data for the stock name and sector
  getStockInfoFor(ticker): Observable<any> {
    return this.http.get('https://finnhub.io/api/v1/stock/profile2?symbol='+ticker+'&token=bs9gkqvrh5rahoaogp5g');
  }
}