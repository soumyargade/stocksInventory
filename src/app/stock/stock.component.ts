import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder) {
    this.stockForm = this.formBuilder.group({
      ticker: ['', Validators.required], 
      name: ['', Validators.required], 
      description: ''
    })
  }

  ngOnInit(): void { }

  handleClose() {
    // ...
  }
}