# frontend

## Configuração
```
npm install
```
### Configuração adicional

Eu utilizo a API da receita (https://receitaws.com.br/api) para fazer as buscas por CNPJ. Devido a falta de um configuração (ver último item https://receitaws.com.br/faq)
é necessário rodar o seguinte serviço.

Obs.: Certifique-se que esse serviço irá rodar na porta 8080.

```
node .\utilidadePublica\frontend\node_modules\cors-anywhere\server.js
```

### Execução
```
npm run serve
```

### Configurações customizadas
Veja mais em [Configuration Reference](https://cli.vuejs.org/config/).
