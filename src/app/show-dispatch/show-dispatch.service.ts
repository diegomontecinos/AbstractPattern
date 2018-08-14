import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dispatch } from '../models/dispatch.model';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';

@Injectable()
export class ShowDispatchService {

  constructor(private http: HttpClient){}

  getAllDis(){
      return this.http.post('/api/dispatch/getAllDis',{})
  }

  addDis(dispatch: Dispatch, n_art, n_origin, n_destination){
    return this.http.post('/api/dispatch/createDis',{
        art: n_art,
        origin: n_origin,
        destination: n_destination,
        date_dis: Date.now(),
        status: "Despachado",
        coments1: dispatch.coments1
      })
  }

  updateStatusDis(dispatch: Dispatch, n_status){
    return this.http.post('/api/dispatch/updateStatusDis',{
      id: dispatch._id,
      coments2: dispatch.coments2,
      status: n_status,
      date2: Date.now()
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
