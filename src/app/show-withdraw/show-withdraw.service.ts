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

  updateWithdraw(withdraw: Withdraw){
    return this.http.post('/api/withdraw/updateWithdraw',{
      id: withdraw._id,
      coments2: withdraw.coments2,
      status: withdraw.status,
      date2: Date.now()
  })
  }

  updateWithdrawItem(id, c){
    return this.http.post('/api/withdraw/updateWithdrawItem',{
      id: id,
      art: c.art,
      status: c.status,
      giveback: c.giveback
  })
  }

  getAllWH(){
      return this.http.post('/api/warehouse/getAllWH',{})
  }

  getAllInv(){
      return this.http.post('/api/inventory/getAllInv',{})
  }

  getAllWorkers(){
      return this.http.post('/api/worker/getAllWorkers',{})
  }

  createWithdraw(withdraw: Withdraw){
    return this.http.post('api/withdraw/createWithdraw',{
      worker: withdraw.worker,
      arts: withdraw.arts,
      status: withdraw.status,
      coments1: withdraw.coments1,
      date1: Date.now(),
      warehouse: withdraw.warehouse
    })
  }


}
