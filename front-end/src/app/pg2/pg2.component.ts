import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../models/Pessoa';
import { LocalidadeService } from '../services/localidade-service.service';
import { PessoaService } from '../services/pessoa-service.service';

@Component({
  selector: 'app-pg2',
  templateUrl: './pg2.component.html',
  styleUrls: ['./pg2.component.css']
})
export class Pg2Component implements OnInit {

  pessoasPorEstado: Map<string, number> = new Map();
  pessoas: Pessoa[] = []

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {

    this.listarPessoas()
  }

  listarPessoas() {

    this.pessoaService.listar().subscribe(response => {

      this.pessoas = response

      for (let r of response) {

        if (this.pessoasPorEstado.has(r.estado)) {

          let valorAnterior = this.pessoasPorEstado.get(r.estado) as number + 1

          this.pessoasPorEstado.set(r.estado, valorAnterior)

        } else {

          this.pessoasPorEstado.set(r.estado, 1)
        }

      }

    })
  }
}
