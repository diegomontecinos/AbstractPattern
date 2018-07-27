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

    addAcq(acquisition: Acquisition, n_art, n_destination){
      return this.http.post('/api/acquisition/createAcq',{
          art: n_art,
          qty: acquisition.qty,
          status: "Proceso",
          coments: acquisition.coments,
          dateAcq: Date.now(),
          destination: n_destination
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
