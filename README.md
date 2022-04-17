# angular-project

- Projeto de Angular do treinamento da Pública Tecnologia, com foco na parte front-end e utilizando o json server para gerar uma fake api
- Gerenciamento de clientes com foco nos dados de estado e cidade provindos da api de localidade disponibilizado pelo ibge

## Tecnologias
- Angular(Type Script, CSS3, HTML5)
- Bootsrap 5
- Npm - gerenciador de dependência
- VS Code - IDE
- GIT

## Pré-requisitos
- NodeJS
- Npm
- Angular CLI

## Como rodar

Baixe ou clone este repositório usando 
```bash
https://github.com/Bruno-ferrariv/angular-project
```
Ir para a pasta back-end no terminal
```bash
cd back-end
```
Subir a fake api com o comando:
```bash
npx json-server pessoas.json
```
Ir para a pasta front-end
```bash
cd ..
cd front-end
```
Instalar as dependências do npm
```bash
npm i
```
Subir a aplicação em Angular com o comando:
```bash
ng s
```
