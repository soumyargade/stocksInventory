import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IStock, StockService } from '../stock.service';

@Component({
  selector: 'in-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'], 
  // Using immutability to get the stocks, leads to better performance
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksComponent implements OnInit {

  tickers = ['TSLA', 'GOOGL', 'FB'];
  delete = false;
  stockToBeDeleted;
  stocks$: Observable<IStock[]> = this.stockService.getStocksData(this.tickers);

  constructor(private stockService: StockService) { }

  trackById(index, item) {
    return item.id
  }

  // Calculates net profit based off the opening and current price
  getProfit(stock: IStock) {
    return ((stock.price-stock.openingPrice)/stock.price)*100;
  }

  addStock() {
    // ...
  }

  onEdit(stock: IStock) {
    // ...
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
    this.stockService.removeStock(this.stockToBeDeleted);
  }

  ngOnInit(): void { }
  
}