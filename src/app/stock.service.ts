import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

function generateId() {
  return Math.floor(Math.random() * 1000);
}

@Injectable({
  providedIn: 'root'
})
// Service to store all stocks in order for interaction
export class StockService {

  stocks: IStock[] = [{
    id: generateId(), 
    ticker: 'TSLA', 
    price: 1500.84, 
    previousPrice: 1490.80, 
    openingPrice: 1495.76, 
    percentProfit: 0, 
    name: 'Tesla', 
    description: 'Car company', 
    lastUpdatedDate: '7/17/20 7:59PM', 
  }, 
  {
    id: generateId(), 
    ticker: 'GOOGL', 
    price: 1516.85, 
    previousPrice: 1504.06, 
    openingPrice: 1530.23, 
    percentProfit: 0, 
    name: 'Google', 
    description: 'Search engine', 
    lastUpdatedDate: '7/17/20 7:56PM'
  }, 
  {
    id: generateId(), 
    ticker: 'AMZN', 
    price: 2961.97, 
    previousPrice: 2899.90, 
    openingPrice: 3120.03, 
    percentProfit: 0, 
    name: 'Amazon', 
    description: 'Online shopping', 
    lastUpdatedDate: '7/17/20 7:58PM'
  }, 
  {
    id: generateId(), 
    ticker: 'FB', 
    price: 242.03, 
    previousPrice: 243.65, 
    openingPrice: 238.54, 
    percentProfit: 0, 
    name: 'Facebook', 
    description: 'Social media', 
    lastUpdatedDate: '7/17/20 7:59PM'
  }, 
  {
    id: generateId(), 
    ticker: 'MSFT', 
    price: 202.88, 
    previousPrice: 206.89, 
    openingPrice: 140.78, 
    percentProfit: 0, 
    name: 'Microsoft', 
    description: 'Computer company', 
    lastUpdatedDate: '7/17/20 7:59PM'
  }
];

// Creating a new behavior subject
stocks$ = new BehaviorSubject<IStock[]>(this.stocks);

  constructor() { }
}