import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { IStock, StockService } from '../stock.service';

@Component({
  selector: 'in-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'], 
  // Using immutability to get the stocks, leads to better performance
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksComponent implements OnInit {

  stocks = [];

  // Creating a new behavior subject
  stocks$ = new BehaviorSubject<IStock[]>(this.stocks);

  tickers = ['TSLA', 'GOOGL', 'FB', 'AMZN', 'CMG', 'MSFT', 'AAPL', 'CSCO', 'KO', 'NFLX'];
  delete = false;
  stockToBeDeleted;
  lastUpdatedTime;
  showAddDialog = false;

  constructor(private stockService: StockService) { }

  trackById(index, item) {
    return item.id
  }

  // Calculates net profit based off the opening and current price
  getProfit(stock: IStock) {
    return ((stock.price-stock.openingPrice)/stock.price)*100;
  }

  // Executed when the add stock button is clicked
  addStock() {
    this.showAddDialog = true;
  }

  // Executed when cancelling the add stock dialog
  handleAddDialogCancel() {
    this.showAddDialog = false;
  }

  // Executed when a stock is added
  handleAddDialogFinish(ticker) {
    this.tickers.push(ticker);
    this.showAddDialog = false;
  }

  // Assign the product to be deleted
  onDelete(stock: IStock) {
    this.delete = true;
    this.stockToBeDeleted = stock;
  }

  // Decided to cancel the delete
  handleCancel() {
    this.delete = false;
  }

  confirmDelete() {
    // Toggle delete flag to false
    this.handleCancel();
    // Removing the stock
    this.removeStock(this.stockToBeDeleted);
  }

  ngOnInit(): void {
    this.getStocksData();
    setInterval(() => {
      this.getStocksData();
    }, 60000);
  }

  generateId() {
    return Math.floor(Math.random() * 1000);
  }

  getLastFetchedPrice() {
    let index = this.stocks.length;
    this.stocks.forEach((stock) => {
      stock.lastFetchedPrice = stock.price;
      index--;
    });
  }

  getStocksData() {
    // Getting data for each stock ticker
    this.tickers.forEach((ticker) => {
      var stockObj;
      var index = 0;
      
      // Creating two streams of data to subscribe to
      let stream1: Observable<any> = this.stockService.getStockDataFor(ticker);
      let stream2: Observable<any> = this.stockService.getStockInfoFor(ticker);

      combineLatest(stream1, stream2).subscribe((response) => {
        console.log(response);
        this.lastUpdatedTime = new Date().getTime();
        stockObj = this.createStockData(response, ticker);
        // this.stocks.push(stockObj);
        this.updateStockInfo(stockObj);
        this.stocks.sort((a,b) => {
          return this.getProfit(b) - this.getProfit(a);
        });
      });
      this.getLastFetchedPrice();
      // Gets the next stream of data
      this.stocks$.next(this.stocks);
    });
    // this.stocks$ = new BehaviorSubject<IStock[]>(this.stocks);
  }

  createStockData(response, ticker): Object {
    // Creating a new stock object with the data that was retrieved
    var stockObj = new Object();
    stockObj["id"] = this.generateId();
    stockObj["ticker"] = ticker;
    stockObj["price"] = response[0].c;
    stockObj["openingPrice"] = response[0].o;
    stockObj["percentProfit"] = 0;
    stockObj["name"] = response[1].name;
    stockObj["description"] = response[1].finnhubIndustry;
    return stockObj
  }

  updateStockInfo(stockObj) {
    var index = 0;
    var elementIndex = -1;
    this.stocks.forEach((element) => {
      // The stock is in the list
      // Trying to figure out which index it is at
      if (element.ticker === stockObj.ticker) {
        elementIndex = index;
      }
      index++;
    });

    // The stock was not already in the list
    if (elementIndex == -1) {
      this.stocks.push(stockObj);
    } else {
      // The stock was in the list, updating prices
      let updateStockObj = this.stocks[elementIndex];
      updateStockObj.price = stockObj.price;
      updateStockObj.previousPrice = stockObj.previousPrice;
    }
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