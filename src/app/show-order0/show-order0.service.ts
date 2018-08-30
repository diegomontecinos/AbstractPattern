import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/order.model';
import { Dispatch } from '../models/dispatch.model';

@Injectable()
export class ShowOrder0Service {

    constructor(private http: HttpClient){

    }

    getAllOrd(){
      return this.http.post('/api/orders/getAllOrd',{})
    }

    createOrder(order: Orders){
      return this.http.post('/api/orders/createOrder',{
        destination: order.destination,
        status: order.status,
        date1: Date.now(),
        arts: order.arts,
        coments1: order.coments1
        })
    }

    updateOrderItem(c){
      return this.http.post('/api/orders/updateOrderItem',{
        id: c.id,
        art: c.art,
        status: c.status,
        disp: c.disp
      })
    }

    updateOrderStatus(c){
      return this.http.post('/api/orders/updateOrderStatus',{
        id: c.id,
        status: c.status
      })
    }

  createDispatch(dispatch: Dispatch){
    return this.http.post('/api/dispatch/createDispatch',{
      destination: dispatch.destination,
      origin: dispatch.destination,
      status: dispatch.status,
      date1: Date.now(),
      arts: dispatch.arts,
      coments1: dispatch.coments1,
      order: dispatch.order
      })
  }

    deleteOrder(id){
      return this.http.post('/api/orders/deleteOrder',{id : id})
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

}
