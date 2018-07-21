import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acquisition } from '../models/acquisition.model';

@Injectable()
export class ShowAcquisitionService {

    constructor(private http: HttpClient){

    }

    getAllAcq(){
      return this.http.post('/api/acquisition/getAllAcq',{})
    }

    addAcq(acquisition: Acquisition){
      return this.http.post('/api/acquisition/createAcq',{
          qty: acquisition.qty,
          status: acquisition.status
        })
    }

    updateAcq(acquisition: Acquisition){
      return this.http.post('/api/acquisition/updateAcq',{
        id: acquisition._id,
        qty: acquisition.qty,
        status: acquisition.status
    })
}

    deleteAcq(id){
      return this.http.post('/api/acquisition/deleteAcq',{id : id})
    }

}
