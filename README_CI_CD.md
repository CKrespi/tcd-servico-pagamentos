# Pipeline CI/CD - Serviço de Pagamentos

## 📋 Visão Geral

Este projeto implementa uma **Pipeline de Integração Contínua (CI)** utilizando **GitHub Actions** para automatizar a execução de testes na aplicação "Serviço de Pagamentos".

A pipeline foi configurada para garantir a qualidade do código através de testes automatizados executados em múltiplos cenários.

---

## 🎯 Objetivos da Pipeline

- ✅ Executar testes automaticamente a cada push para a branch `main`
- ✅ Permitir execução manual da pipeline (workflow_dispatch)
- ✅ Executar testes em horários agendados
- ✅ Gerar relatórios de teste estruturados
- ✅ Armazenar relatórios como artifacts na pipeline

---

## 🏗️ Arquitetura da Pipeline

### Arquivo de Configuração
- **Localização**: `.github/workflows/01-Integrated-exec.yaml`
- **Framework**: GitHub Actions

### Jobs Configurados

#### 1. `testes-unitarios`
Responsável por executar todos os testes da aplicação.

**Passos:**
1. **Checkout** - Clona o código do repositório
2. **Setup Node.js** - Configura o ambiente Node.js 18
3. **Instalação de dependências** - Executa `npm install`
4. **Execução de testes** - Roda os testes com `npm test` e gera relatório JSON
5. **Upload de artifacts** - Publica o relatório na pipeline

---

## 🔄 Triggers (Gatilhos) de Execução

A pipeline foi configurada para disparar em 3 cenários diferentes:

### 1. **Push (Trigger Automático)**
```yaml
on:
  push:
    branches:
      - master
```
- Executa automaticamente quando há um push na branch `master`
- **Cenário de uso**: Validação contínua durante o desenvolvimento

### 2. **Workflow Dispatch (Execução Manual)**
```yaml
workflow_dispatch:
```
- Permite executar a pipeline manualmente através da aba "Actions" no GitHub
- **Cenário de uso**: Testes sob demanda, validação de hotfix antes de fazer push

### 3. **Schedule (Execução Agendada)**
```yaml
schedule:
  - cron: '0 9 * * 1,3,5'  # Segunda, quarta e sexta às 09:00
```
- Executa automaticamente conforme cronograma (cron)
- **Padrão utilizado**: `0 9 * * 1,3,5`
  - **Hora**: 09:00 (UTC)
  - **Dias**: 1 (segunda), 3 (quarta), 5 (sexta)
- **Cenário de uso**: Validação periódica, detecção de regressões

---

## 📊 Geração e Armazenamento de Relatórios

### Formato do Relatório
- **Tipo**: JSON (formato estruturado do Mocha)
- **Arquivo**: `test-results.json`
- **Retenção**: 30 dias

### Upload como Artifact
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: Relatório de Testes
    path: test-results.json
    retention-days: 30
```

**Como acessar:**
1. Abra a execução da pipeline no GitHub Actions
2. Clique em "Summary"
3. Procure pela seção "Artifacts"
4. Baixe o arquivo "Relatório de Testes"

---

## 🧪 Projeto: Serviço de Pagamentos

### Estrutura
```
tcd-servico-pagamentos/
├── src/
│   └── ServicoDePagamento.js    # Classe principal
├── test/
│   └── ServicoDePagamento.test.js # Testes unitários
├── package.json                  # Dependências e scripts
└── .github/workflows/
    └── 01-Integrated-exec.yaml   # Pipeline CI/CD
```

### Testes Implementados
- ✅ Validação de adição de pagamento na lista
- ✅ Categorização como "cara" para valores > 100.00
- ✅ Categorização como "padrão" para valores < 100.00
- ✅ Categorização limite (exatamente 100.00)
- ✅ Retorno apenas do último pagamento

### Framework de Testes
- **Mocha** - Framework de teste
- **Node Assert** - Biblioteca de asserções nativa

---

## 🚀 Como Usar a Pipeline

### Disparar Automaticamente (Push)
```bash
git push origin master
```
A pipeline executará automaticamente.

### Disparar Manualmente
1. Vá até a aba **Actions** no repositório GitHub
2. Selecione **"CI - Testes Automatizados"**
3. Clique em **"Run workflow"**

### Verificar Execução
1. Acesse a aba **Actions** no GitHub
2. Selecione a execução desejada
3. Acompanhe os logs em tempo real
4. Baixe os artifacts quando a execução terminar

---

## 📈 Conceitos de CI/CD Utilizados

### 1. **Integração Contínua (CI)**
- Testes executados automaticamente a cada mudança
- Feedback rápido sobre a qualidade do código
- Detecção prévia de problemas

### 2. **Automatização**
- Elimina a execução manual de testes
- Padroniza o processo de validação
- Reduz erros humanos

### 3. **Artefatos (Artifacts)**
- Armazenamento de resultados de testes
- Rastreabilidade histórica
- Retenção configurável

### 4. **Agendamento**
- Validação periódica sem intervenção manual
- Detecção de regressões em dependências
- Monitoramento contínuo

### 5. **Workflows Declarativos**
- Configuração em YAML
- Versionamento junto ao código
- Fácil manutenção e reprodução

---

## ✅ Requisitos Atendidos

| Requisito | Status |
|-----------|--------|
| Execução por push | ✅ Configurada |
| Execução manual | ✅ Configurada |
| Execução agendada | ✅ Configurada (seg/qua/sex 09h) |
| Geração de relatório | ✅ JSON com resultados |
| Armazenamento de relatório | ✅ Artifacts com 30 dias retenção |
| Testes automatizados | ✅ Mocha com Node Assert |
| Documentação | ✅ Este README |

---

## 📝 Logs e Debugging

### Ver logs completos
- Abra a execução na aba Actions
- Clique em "Testes Unitários"
- Expanda cada step para detalhes

### Troubleshooting
- **Falha na instalação**: Verifique `package.json`
- **Testes falhando**: Verifique os testes em `test/`
- **Timeout**: Aumente o limite ou otimize os testes

---

## 🔗 Recursos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Mocha Documentation](https://mochajs.org/)
- [Cron Expression Reference](https://crontab.guru/)

