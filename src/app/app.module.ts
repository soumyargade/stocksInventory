import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StocksComponent } from './stocks/stocks.component';
import { DeleteStockModalComponent } from './delete-stock-modal/delete-stock-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    DeleteStockModalComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
