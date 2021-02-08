import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyService } from 'src/services/currency.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CurrencyRate } from 'src/models/currency-rate';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.less']
})
export class CurrencyCalculatorComponent implements OnInit,OnDestroy {
  currencyList:CurrencyRate[];
  converToList: any[] = [];
  updateCurrencyListTimer :NodeJS.Timer;

  form: FormGroup;

  constructor(private _service: CurrencyService) { }

  ngOnInit() {
    this.form = new FormGroup({
      convertFrom: new FormControl('', Validators.required),
      convertTo: new FormControl('', Validators.required),
      ammount: new FormControl(0, Validators.required)
    });
    this.getCurrencyRates();
     
  }

  ngOnDestroy(){
    clearInterval(this.updateCurrencyListTimer);
  }

  getCurrencyRates = () => {
    this._service.getCurrencyRates().subscribe(c => {
      this.currencyList = c
    });
  }

  removeFromSelectedCurrencies = (currency) => {
    this.converToList.splice(this.converToList.indexOf(currency),1);
    this.form.get('convertTo').setValue(this.converToList);
  }

  changeSelectedCurrencies = (e:any) => {
    this.converToList = e.value;
  }

  convertTo = (currency) => {
    if(!this.form.valid)
      return;

    let calculatedRate = this.form.get('ammount').value /  this.form.get('convertFrom').value.rate * currency.rate;
    return calculatedRate.toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
    })
  }
}
