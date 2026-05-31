# Serviço de Pagamento - TCD

Projeto de Conclusão da Disciplina implementando uma classe para gerenciar pagamentos em JavaScript com testes unitários usando Mocha e Node Assert.

## 📋 Descrição

A classe `ServicoDePagamento` gerencia pagamentos com os seguintes recursos:

- **Método `pagar(codigoBarras, empresa, valor)`**: Registra um novo pagamento
  - Armazena: código de barras, empresa e valor
  - Categoriza automaticamente como:
    - `'cara'` quando valor > R$ 100,00
    - `'padrão'` quando valor ≤ R$ 100,00

- **Método `consultarUltimoPagamento()`**: Retorna o último pagamento registrado

## 🚀 Como Usar

### Instalação de dependências

```bash
npm init -y
npm i mocha
```

Este comando instalará o Mocha e outras dependências necessárias para executar os testes.

### Executar os testes

Com npm:
```bash
npm test
```

Ou diretamente com Mocha:
```bash
npx mocha test/**/*.test.js
```

### Exemplo de Uso

```javascript
import ServicoDePagamento from './src/ServicoDePagamento.js';

const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

console.log(servicoDePagamento.consultarUltimoPagamento());
// Output:
// {
//   codigoBarras: '0987-7656-3475',
//   empresa: 'Samar',
//   valor: 156.87,
//   categoria: 'cara'
// }
```

## 📁 Estrutura do Projeto

```
tcd-servico-pagamentos/
├── src/
│   └── ServicoDePagamento.js    # Classe principal
├── test/
│   └── ServicoDePagamento.test.js # Testes unitários
├── package.json
└── README.md
```

## 🧪 Testes Implementados

- ✅ Validação de adição de pagamento na lista
- ✅ Categorização como "cara" para valores > 100.00
- ✅ Categorização como "padrão" para valores ≤ 100.00
- ✅ Categorização limite (exatamente 100.00)
- ✅ Retorno apenas do último pagamento
- ✅ Validação do limite de 100.01 (primeira categoria "cara")

## 📦 Tecnologias

- **Node.js**: Runtime JavaScript
- **Mocha**: Framework de testes
- **Node Assert**: Módulo de asserções

## 👨‍💻 Boas Práticas Aplicadas

- Uso de propriedades privadas (`#pagamentos`)
- Padrão Arrange-Act-Assert nos testes
- Método estático `at(-1)` para obter último elemento
- Encapsulamento de dados com classe
- Testes abrangentes cobrindo casos extremos

## 📝 Nota

Este projeto segue as boas práticas do repositório de referência: [exemplo-testes-unidade-com-classe](https://github.com/juliodelimas/exemplo-testes-unidade-com-classe)
