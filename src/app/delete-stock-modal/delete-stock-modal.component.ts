import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  // Cancel deletion of the stock
  cancelDelete() {
    this.cancel.emit();
  }

  // Confirm deletion of the stock
  confirmDelete() {
    this.confirm.emit();
  }
}