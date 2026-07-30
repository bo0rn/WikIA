# WikIA
Este é um projeto dedicado a realização do Trabalho de Conclusão de Curso (TCC), necessário para concluirmos nosso ensino médio integrado ao curso de Desenvolvimento de Sistemas. A ideia é criar um site informativo que abrange uma alta gama de conteúdos educacionais sobre a Inteligência Artificial, além de ensinar os beneficios de usa-lá de forma inteligente, equilibrada e orientada.


# LICENÇA
Todos os direitos do projeto são reservados e utilizados para fins educacionais.
name: Jekyll site CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Build the site in the jekyll/builder container
      run: |
        docker run \
        -v ${{ github.workspace }}:/srv/jekyll -v ${{ github.workspace }}/_site:/srv/jekyll/_site \
        jekyll/builder:latest /bin/bash -c "chmod -R 777 /srv/jekyll && jekyll build --future"
