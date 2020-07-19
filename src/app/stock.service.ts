import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

function generateId() {
  return Math.floor(Math.random() * 1000);
}

@Injectable({
  providedIn: 'root'
})
// Service to store all stocks in order for interaction
export class StockService {

  stocks = [];
  /*
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
  }, 
  {
    id: generateId(), 
    ticker: 'CSCO', 
    price: 46.75, 
    previousPrice: 46.70, 
    openingPrice: 42.00, 
    percentProfit: 0, 
    name: 'Cisco', 
    description: 'Telecommunications', 
    lastUpdatedDate: '7/17/20 7:59PM'
  }];*/

  // Creating a new behavior subject
  stocks$ = new BehaviorSubject<IStock[]>(this.stocks);

  constructor(private http: HttpClient) { }

  getStocksData(tickers: string[]) {

    for (var index in tickers) {
      var tickerFetched = tickers[index];
      console.log(tickerFetched);
      this.setTicker(tickers[index]);
      this.http.get<IStock[]>(
        'https://finnhub.io/api/v1/quote?symbol='+tickers[index]+'&token=bs9gkqvrh5rahoaogp5g')
        .subscribe(response => {
            console.log(tickers[index]);
            this.stocks.push(
              this.createStockData(response)
              );
            console.log("creating stock data for : " + tickerFetched);
        }
      );
    }
    return this.stocks$;
  }

  tickerFetched;
  setTicker(ticker) {
    this.tickerFetched = ticker;
    console.log("ticker from inside : " + this.tickerFetched)
  }

  createStockData(response):Object {
    console.log("creating object for : " + response.ticker);
    var stockObj = new Object();
    stockObj["id"] = generateId();
    stockObj["ticker"] = this.tickerFetched;
    stockObj["price"] = response.c;
    stockObj["previousPrice"] = response.pc;
    stockObj["openingPrice"] = response.o;
    stockObj["percentProfit"] = 0;
    stockObj["name"] = 'Cisco';
    stockObj["description"] = 'Telecommunications';
    stockObj["lastUpdatedDate"] = response.t;

    return stockObj
  }

  // Removes a stock from the list
  removeStock(stock: IStock) {
    const index = this.stocks.indexOf(stock);
    this.stocks = [
      // Doesn't include the end argument
      ...this.stocks.slice(0, index), // Spreads indexes and values
      // Rest of elements from stock after the index onwards
      ...this.stocks.slice(index + 1)
    ];
    this.stocks$.next(this.stocks);
  }
}