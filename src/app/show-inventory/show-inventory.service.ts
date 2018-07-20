import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../models/inventory.model';

@Injectable()
export class ShowInventoryService {

    constructor(private http: HttpClient){

    }

    getAllInv(){
        return this.http.post('/api/inventory/getAllInv',{})
    }

    addInv(material: Inventory){
      return this.http.post('/api/inventory/createInv',{
          sku : material.sku,
          name: material.name,
          brand: material.brand
        })
    }

    updateInv(material: Inventory){
      return this.http.post('/api/inventory/updateInv',{
        id: material._id,
        sku : material.sku,
        name: material.name,
        brand: material.brand
    })
}

    deleteInv(id){
      return this.http.post('/api/inventory/deleteInv',{id : id})
    }

    getAllWH(){
        return this.http.post('/api/warehouse/getAllWH',{})
    }

}
