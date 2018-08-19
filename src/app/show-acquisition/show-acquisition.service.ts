import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acquisition } from '../models/acquisition.model';
import { Warehouse } from '../models/warehouse.model';
import { Inventory } from '../models/inventory.model';

@Injectable()
export class ShowAcquisitionService {

    constructor(private http: HttpClient){

    }

    getAllAcq(){
      return this.http.post('/api/acquisition/getAllAcq',{})
    }

    createAcquisition(acquisition: Acquisition){
      return this.http.post('/api/acquisition/createAcquisition',{
          status: acquisition.status,
          coments1: acquisition.coments1,
          date1: Date.now(),
          arts: acquisition.arts
        })
    }

    updateStatusAcq(acquisition: Acquisition){
      return this.http.post('/api/acquisition/updateStatusAcq',{
        id: acquisition._id,
        coments2: acquisition.coments2,
        status: acquisition.status
    })
}

    deleteAcq(id){
      return this.http.post('/api/acquisition/deleteAcq',{id : id})
    }

    getAllWH(){
        return this.http.post('/api/warehouse/getAllWH',{})
    }

    getAllInv(){
        return this.http.post('/api/inventory/getAllInv',{})
    }

}
