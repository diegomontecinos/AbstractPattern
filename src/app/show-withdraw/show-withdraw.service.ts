import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispatch } from '../models/dispatch.model';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';
import { Withdraw } from '../models/withdraw.model';

@Injectable()
export class ShowWithdrawService {

  constructor(private http: HttpClient){}

  getAllWithdraw(){
      return this.http.post('/api/withdraw/getAllWithdraw',{})
  }

  updateStatusWithdraw(withdraw: Withdraw){
    return this.http.post('/api/withdraw/updateStatusWithdraw',{
      id: withdraw._id,
      coments2: withdraw.coments2,
      status: withdraw.status,
      date2: withdraw.date2
  })
  }

  getAllWH(){
      return this.http.post('/api/warehouse/getAllWH',{})
  }

  getAllInv(){
      return this.http.post('/api/inventory/getAllInv',{})
  }

}
