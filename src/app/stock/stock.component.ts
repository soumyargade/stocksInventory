import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'in-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit {

  stockForm: FormGroup;
  @Input() stock;
  @Output() cancel = new EventEmitter();
  @Output() finish = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.stockForm = this.formBuilder.group({
      ticker: ['', Validators.required]
    })
  }

  ngOnInit(): void { }

  // Cancelled adding a stock
  handleClose() {
    this.cancel.emit();
  }

  // Finished adding a stock
  handleFinish() {
    this.finish.emit(this.stockForm.get("ticker").value);
  }
}