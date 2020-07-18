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

  stocks$: Observable<IStock[]> = this.stockService.stocks$;

  constructor(private stockService: StockService) { }
  trackById(index, item) {
    return item.id
  }

  ngOnInit(): void { }

}