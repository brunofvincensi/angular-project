import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-pg2',
  templateUrl: './pg2.component.html'
})
export class Pg2Component implements OnInit {

  pessoasPorEstado: Map<string, number> = new Map();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {

    this.listarPessoas()
  }

  listarPessoas() {

    this.pessoaService.listar().subscribe(response => {

      for (let pessoa of response) {

        if (this.pessoasPorEstado.has(pessoa.estado)) {

          let novoValor = this.pessoasPorEstado.get(pessoa.estado) as number + 1

          this.pessoasPorEstado.set(pessoa.estado, novoValor)

        } else {
          this.pessoasPorEstado.set(pessoa.estado, 1)
        }
      }
    })
  }
}