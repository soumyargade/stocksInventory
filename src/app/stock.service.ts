import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStock {
  id: number;
  ticker: string;
  price: number;
  lastFetchedPrice: number;
  percentProfit: number;
  openingPrice: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
// Service to store all stocks in order for interaction
export class StockService {

  constructor(private http: HttpClient) { }

  // Getting data for the stock prices
  getStockDataFor(ticker): Observable<any> {
    return this.http.get<IStock[]>('https://finnhub.io/api/v1/quote?symbol='+ticker+'&token=bsc98t7rh5rcbdomtp6g');
  }

  // Getting data for the stock name and sector
  getStockInfoFor(ticker): Observable<any> {
    return this.http.get('https://finnhub.io/api/v1/stock/profile2?symbol='+ticker+'&token=bsc98t7rh5rcbdomtp6g');
  }
}