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

<<<<<<< HEAD
    addAcq(acquisition: Acquisition, n_art, n_destination){
      return this.http.post('/api/acquisition/createAcq',{
          art: n_art,
          qty: acquisition.qty,
          status: "Proceso",
          coments: acquisition.coments,
          dateAcq: Date.now(),
          destination: n_destination
=======
    createAcquisition(acquisition: Acquisition){
      return this.http.post('/api/acquisition/createAcquisition',{
          status: acquisition.status,
          coments1: acquisition.coments1,
          date1: Date.now(),
          arts: acquisition.arts
>>>>>>> daniel
        })
    }

    updateStatusAcq(acquisition: Acquisition){
      return this.http.post('/api/acquisition/updateStatusAcq',{
        id: acquisition._id,
        coments2: acquisition.coments2,
        status: acquisition.status
<<<<<<< HEAD
    })
}
=======
      })
    }

    updateAcquisition(acquisition: Acquisition){
      return this.http.post('/api/acquisition/updateAcquisition',{
        id: acquisition._id,
        status: acquisition.status,
        date2: acquisition.date2,
        date3: acquisition.date3,
        date4: acquisition.date4,
        coments2: acquisition.coments2,
        coments3: acquisition.coments3,
        coments4: acquisition.coments4
      })
    }
>>>>>>> daniel

    deleteAcq(id){
      return this.http.post('/api/acquisition/deleteAcq',{id : id})
    }

<<<<<<< HEAD
=======
    cancelAcquisition(id){
      return this.http.post('/api/acquisition/cancelAcquisition',{id : id})
    }

>>>>>>> daniel
    getAllWH(){
        return this.http.post('/api/warehouse/getAllWH',{})
    }

    getAllInv(){
        return this.http.post('/api/inventory/getAllInv',{})
    }

}
