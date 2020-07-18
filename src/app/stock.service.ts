import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IStock {
  id: number;
  name: string;
  ticker: string
  price: number
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
    name: 'Tesla', 
    ticker: 'TSLA', 
    price: 1500.84, 
    description: 'Car company', 
    lastUpdatedDate: '7/17/20 7:59PM', 
  }, 
  {
    id: generateId(), 
    name: 'Google', 
    ticker: 'GOOGL', 
    price: 1516.85, 
    description: 'Search engine', 
    lastUpdatedDate: '7/17/20 7:56PM'
  }, 
  {
    id: generateId(), 
    name: 'Amazon', 
    ticker: 'AMZN', 
    price: 2961.97, 
    description: 'Online shopping', 
    lastUpdatedDate: '7/17/20 7:58PM'
  }, 
  {
    id: generateId(), 
    name: 'Facebook', 
    ticker: 'FB', 
    price: 242.03, 
    description: 'Social media', 
    lastUpdatedDate: '7/17/20 7:59PM'
  }, 
  {
    id: generateId(), 
    name: 'Microsoft', 
    ticker: 'MSFT', 
    price: 202.88, 
    description: 'Computer company', 
    lastUpdatedDate: '7/17/20 7:59PM'
  }
];

// Creating a new behavior subject
stocks$ = new BehaviorSubject<IStock[]>(this.stocks);

  constructor() { }
}