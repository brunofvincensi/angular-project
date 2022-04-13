import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/Pessoa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http:HttpClient) { }

  listar():Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>('http://localhost:3000/pessoas')
  }

  cadastrar(p:Pessoa):Observable<Pessoa>{
    return this.http.post<Pessoa>('http://localhost:3000/pessoas', p)
  }

  remover(id:number):Observable<any>{
   return this.http.delete<Pessoa>('http://localhost:3000/pessoas/'+ id)
  }

  alterar(p:Pessoa, id:number):Observable<Pessoa>{
  return this.http.put<Pessoa>('http://localhost:3000/pessoas/'+ id, p)
  }

}
