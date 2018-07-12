import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/order.model';

@Injectable()
export class ShowOrderService {

    constructor(private http: HttpClient){

    }

    getAllOrd(){
        return this.http.post('/api/inventory/getAllOrd',{})
    }

}
