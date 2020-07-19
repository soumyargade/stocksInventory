import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StocksComponent } from './stocks/stocks.component';
import { DeleteStockModalComponent } from './delete-stock-modal/delete-stock-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    DeleteStockModalComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
