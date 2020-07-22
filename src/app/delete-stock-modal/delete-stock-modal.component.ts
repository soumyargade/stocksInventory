import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStock } from '../stock.service';

@Component({
  selector: 'in-delete-stock-modal',
  templateUrl: './delete-stock-modal.component.html',
  styleUrls: ['./delete-stock-modal.component.scss']
})
export class DeleteStockModalComponent implements OnInit {

  @Input() stock;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() { }
  ngOnInit(): void { }

  getProfit(stock: IStock) {
    return ((stock.price-stock.openingPrice)/stock.price)*100;
  }

  // Cancel deletion of the stock
  cancelDelete() {
    this.cancel.emit();
  }

  // Confirm deletion of the stock
  confirmDelete() {
    this.confirm.emit();
  }
}