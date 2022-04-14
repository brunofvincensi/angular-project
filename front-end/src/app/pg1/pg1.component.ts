import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../models/Pessoa';
import { LocalidadeService } from '../services/localidade.service';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-pg1',
  templateUrl: './pg1.component.html',
  styleUrls: ['./pg1.component.css']
})
export class Pg1Component implements OnInit {

  // Mensagem do alerta 
  mensagem: string = ""

  alertGreenVisivel: boolean = false

  alertRedVisivel: boolean = false

  // Vetor de produtos
  pessoas: Pessoa[] = [];

  // Objeto do tipo produto para manipular dados do formulario
  objPessoa: Pessoa = new Pessoa();

  // Visibilidade
  btnVisivel: boolean = true;

  //Lista de estados
  estados: any[] = []

  //Lista de cidades por estado
  cidades: any[] = []

  //Indice autal da lista de pessoas
  indiceAtual: number = 0;

  //sigla do estado setadada no cbx
  sigla: string = "0"

  //cidade setada no cbx
  cidade: string = "0"

  constructor(private pessoaService: PessoaService,
    private localidadeService: LocalidadeService) { }

  ngOnInit(): void {
    this.listarPessoas()
    this.listarEstados()

  }


  listarPessoas() {
    this.pessoaService.listar().subscribe(r => {
      this.pessoas = r
    })
  }

  listarEstados() {
    this.localidadeService.listarEstados().subscribe(response => {
      this.estados = response
    })
  }

  listarCidades() {
    this.cidade = "0"
    this.localidadeService.listarCidadesPorEstado(this.sigla).subscribe(response => {
      this.cidades = response
    })
  }

  selecionarPessoa(index: number) {
    this.btnVisivel = false

    this.objPessoa = Object.assign({}, this.pessoas[index])

    this.sigla = this.objPessoa.estado
    this.listarCidades()
    this.cidade = this.objPessoa.cidade

    this.indiceAtual = index
    this.limparBordaVermelha()

  }

  validarEmail(email: string) {

    let temEspaco = false;
    let temCaracterEspecial = false;
    let temArroba = false;
    let charDepois = true;
    let charAntes = false;

    for (let i = 0; i < email.length; i++) {

      let letra = email.charAt(i);

      if (letra == ' ') {
        temEspaco = true;
      }

      if (letra == '@') {

        if (temArroba == true) {
          temCaracterEspecial = true
        } else {
          temArroba = true;
        }
        if (i != 0) {
          charAntes = true;
        }
        if ((i == email.length - 1) || (i == email.length - 2)) {
          charDepois = false;
        }
      }

      if (letra == 'ç' || letra == 'é' || letra == 'ã' || letra == '!' || letra == '?' || letra == '}' || letra == '{') {

        temCaracterEspecial = true;
      }

    }

    if (!temEspaco && !temCaracterEspecial && temArroba && charDepois && charAntes && this.confirmacaoEmail(email)) {
      document.getElementsByName("email")[0].style.border = "3px solid black"
      return true
    }
    else {
      document.getElementsByName("email")[0].style.border = "3px solid red"
      return false
    }
  }

  confirmacaoEmail(email: string) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  validarTelefone(fone: string) {

    let isFone = true

    if (fone.length > 15 || fone.length < 8) {
      isFone = false
    }
    if (isFone) {
      document.getElementsByName("telefone")[0].style.border = "3px solid black"
    } else {
      document.getElementsByName("telefone")[0].style.border = "3px solid red"
    }

    return isFone
  }

  validarCampos() {

    let validos = false

    if (!this.validarNome(this.objPessoa.nome)) {
      this.ativarAlertaVermelho("Campo nome incorreto")
    }
    else if (!this.validarEmail(this.objPessoa.email)) {
      this.ativarAlertaVermelho("Campo email incorreto")
    }
    else if (this.objPessoa.telefone == null || !this.validarTelefone(this.objPessoa.telefone.toString())) {
      this.ativarAlertaVermelho("Campo telefone incorreto")
    }
    else if (this.sigla == "0") {
      this.ativarAlertaVermelho("Selecione um estado")

    } else if (this.cidade == "0") {
      this.ativarAlertaVermelho("Selecione uma cidade")

    } else {
      validos = true
    }
    return validos
  }

  validarNome(nome: string) {

    let temNumero = false;

    for (let i = 0; i < nome.length; i++) {
      if (!Number.isNaN(parseInt(nome.charAt(i)))) {
        temNumero = true
      }
    }

    if (!(nome == "" || temNumero)) {
      document.getElementsByName("nome")[0].style.border = "3px solid black"
      return true
    } else {
      document.getElementsByName("nome")[0].style.border = "3px solid red"
      return false
    }
  }

  nomeJaExiste(nome: string) {

    let existe = false

    for (let p of this.pessoas) {
      if (p.nome == nome) {
        existe = true
      }
    }

    return existe
  }

  cadastrar() {

    if (this.validarCampos()) {

      if (!this.nomeJaExiste(this.objPessoa.nome)) {

        this.objPessoa.estado = this.sigla

        this.objPessoa.cidade = this.cidade

        this.pessoaService.cadastrar(this.objPessoa).subscribe(r => {
          this.pessoas.push(r)
        })

        this.objPessoa = new Pessoa()

        this.ativarAlertaVerde("Usuario cadastrado")
      } else {
        this.ativarAlertaVermelho("Nome ja esta em uso")
      }
    }
  }

  ativarAlertaVermelho(mensagem: string) {
    this.mensagem = mensagem
    this.alertRedVisivel = true
    setTimeout(() => {
      this.alertRedVisivel = false
    }, 3000)
  }

  ativarAlertaVerde(mensagem: string) {
    this.mensagem = mensagem
    this.alertGreenVisivel = true
    setTimeout(() => {
      this.alertGreenVisivel = false
    }, 3000)
  }

  alterar() {
    if (this.validarCampos()) {

      if (this.nomeJaExiste(this.objPessoa.nome) && (this.pessoas[this.indiceAtual].nome != this.objPessoa.nome)) {

        this.ativarAlertaVermelho("Nome ja esta em uso")
      }
      else {

        this.objPessoa.estado = this.sigla
        this.objPessoa.cidade = this.cidade

        this.pessoas[this.indiceAtual] = this.objPessoa

        this.pessoaService.alterar(this.objPessoa, this.objPessoa.id).subscribe(r => {
        })

        this.objPessoa = new Pessoa()
        this.limparCampos()
        this.ativarAlertaVerde("Usuario alterado")
      }
    }
  }

  remover() {

    this.pessoaService.remover(this.objPessoa.id).subscribe(x => {
    })

    this.pessoas.splice(this.indiceAtual, 1)
    this.limparCampos()
    this.ativarAlertaVerde("Usuario removido")
  }

  limparCampos() {

    this.limparBordaVermelha()
    this.btnVisivel = true
    this.objPessoa = new Pessoa()
  }

  limparBordaVermelha() {
    let inputs = document.getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.border = "3px solid black"
    }
  }
}
