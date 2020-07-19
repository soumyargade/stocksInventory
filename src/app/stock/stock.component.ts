import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'in-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit {

  stockForm: FormGroup;
  @Input() stock;

  constructor(private formBuilder: FormBuilder) {
    this.stockForm = this.formBuilder.group({
      ticker: '', 
      name: '', 
      description: ''
    })
  }

  ngOnInit(): void { }

  handleClose() {
    // ...
  }
}