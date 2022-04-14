import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/Cidade';
import { Estado } from '../models/Estado';

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {

  constructor(private http: HttpClient) { }

  //Listar estados
  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  }

  listarCidadesPorEstado(sigla: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + sigla + "/municipios")
  }

}
