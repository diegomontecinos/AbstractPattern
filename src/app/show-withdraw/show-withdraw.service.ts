import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispatch } from '../models/dispatch.model';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';

@Injectable()
export class ShowWithdrawService {

  constructor(private http: HttpClient){}

  getAllDis(){
      return this.http.post('/api/dispatch/getAllDis',{})
  }

  addDis(dispatch: Dispatch, n_art, n_origin, n_destination){
    return this.http.post('/api/dispatch/createDis',{
        art: n_art,
        origin: n_origin,
        destination: n_destination,
        qty: dispatch.qty,
        date_dis: Date.now(),
        status: "Despachado",
        coments: dispatch.coments
      })
  }

  updateStatusDis(dispatch: Dispatch, n_status){
    return this.http.post('/api/dispatch/updateStatusDis',{
      id: dispatch._id,
      coments: dispatch.coments,
      status: n_status
  })
  }

  deleteDis(id){
    return this.http.post('/api/dispatch/deleteDis',{id : id})
  }

  getAllWH(){
      return this.http.post('/api/warehouse/getAllWH',{})
  }

  getAllInv(){
      return this.http.post('/api/inventory/getAllInv',{})
  }

}
