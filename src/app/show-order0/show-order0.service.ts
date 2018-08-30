import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/order.model';
<<<<<<< HEAD
=======
import { Dispatch } from '../models/dispatch.model';
>>>>>>> daniel

@Injectable()
export class ShowOrder0Service {

    constructor(private http: HttpClient){

    }

    getAllOrd(){
      return this.http.post('/api/orders/getAllOrd',{})
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> daniel

    deleteOrder(id){
      return this.http.post('/api/orders/deleteOrder',{id : id})
    }

<<<<<<< HEAD
=======
    getAllWH(){
        return this.http.post('/api/warehouse/getAllWH',{})
    }

    getAllInv(){
        return this.http.post('/api/inventory/getAllInv',{})
    }

    getAllWorkers(){
        return this.http.post('/api/worker/getAllWorkers',{})
    }

>>>>>>> daniel
}
