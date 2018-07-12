import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/order.model';

@Injectable()
export class ShowOrder0Service {

    constructor(private http: HttpClient){

    }

    getAllOrd(){
      return this.http.post('/api/orders/getAllOrd',{})
    }

    addOrder(order: Orders){
      return this.http.post('/api/orders/createOrder',{
          name : order.name,
          qty: order.qty,
          status: order.status
        })
    }

    updateOrder(order: Orders){
      return this.http.post('/api/orders/updateOrder',{
        id: order._id,
        name : order.name,
        qty: order.qty,
        status: order.status
    })
}

    deleteOrder(id){
      return this.http.post('/api/orders/deleteOrder',{id : id})
    }

}
