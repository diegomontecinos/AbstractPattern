import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materiales } from '../models/materiales.model';

@Injectable()
export class ShowInventoryService {

    constructor(private http: HttpClient){

    }

    getAllMat(){
        return this.http.post('/api/inventory/getAllMat',{})
    }

}
