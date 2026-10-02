# 🚀 Task Flow

> Projeto prático para aprender e aplicar conceitos de **DevOps**, construindo uma aplicação do zero e evoluindo sua infraestrutura passo a passo.

## 📌 Sobre o projeto

O **Task Flow** é uma aplicação de gerenciamento de tarefas desenvolvida como um laboratório prático de estudos em **DevOps, desenvolvimento de APIs, containers, CI/CD e Cloud**.

A proposta é construir a aplicação gradualmente, entendendo não apenas **como executar cada ferramenta**, mas principalmente **por que ela é utilizada e qual problema resolve**.

O projeto começa com uma API simples em Node.js e será evoluído até uma arquitetura com banco de dados, containers, automação de CI/CD e deploy.

---

# 🎯 Objetivos de aprendizado

Durante o desenvolvimento do Task Flow, serão praticados conceitos como:

- Git e GitHub
- Node.js
- Express
- APIs REST
- HTTP
- Docker
- Dockerfile
- Imagens e containers
- Docker Compose
- PostgreSQL
- Persistência de dados
- GitHub Actions
- CI/CD
- Cloud
- Deploy
- Observabilidade
- Boas práticas de DevOps

A ideia é aprender cada tecnologia **na prática**, utilizando o próprio projeto como laboratório.

---

# 🛠️ Tecnologias

## Atualmente utilizadas

- **Node.js 24**
- **Express 5.2.1**
- **Git**
- **GitHub**
- **Docker**

## Planejadas

- PostgreSQL
- Docker Compose
- GitHub Actions
- CI/CD
- Cloud
- Deploy

---

# 📂 Estrutura atual do projeto

```text
task-flow/
│
├── .git/
├── .gitignore
├── Dockerfile
├── README.md
├── package.json
├── package-lock.json
│
└── src/
    └── server.js
```

A pasta `node_modules` existe localmente, mas não é versionada pelo Git.

---

# 🧩 Etapa 1 — Git e GitHub

O projeto começou utilizando Git para controle de versão.

Entre os conceitos praticados:

- `git init`
- `git status`
- `git add`
- `git commit`
- `git log`
- `git show`
- criação da branch `main`
- configuração de `remote`
- `git push`
- `.gitignore`

O repositório remoto está hospedado no GitHub.

---

# 🟢 Etapa 2 — Node.js + Express

A primeira versão da aplicação foi criada utilizando Node.js e Express.

## API atual

### GET `/tasks`

Retorna todas as tarefas cadastradas.

Exemplo:

```http
GET /tasks
```

Resposta inicial:

```json
[]
```

---

### POST `/tasks`

Cria uma nova tarefa.

Exemplo:

```http
POST /tasks
Content-Type: application/json
```

Body:

```json
{
  "title": "Aprender Docker"
}
```

Resposta:

```json
{
  "id": 1,
  "title": "Aprender Docker",
  "completed": false
}
```

---

# 🧠 Como a API funciona

Atualmente as tarefas são armazenadas em um array JavaScript:

```javascript
const tasks = [];
```

Quando uma tarefa é criada:

```javascript
tasks.push(task);
```

Isso significa que os dados ficam apenas **na memória do processo Node.js**.

### ⚠️ Limitação atual

Se o processo Node.js for encerrado ou o container for reiniciado, as tarefas armazenadas serão perdidas.

Essa limitação é proposital neste momento do projeto, pois será utilizada para introduzir o conceito de **persistência de dados e banco de dados**.

---

# 🐳 Etapa 3 — Docker

O Task Flow foi posteriormente containerizado utilizando Docker.

## Dockerfile

```dockerfile
FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

CMD ["node", "src/server.js"]
```

---

## 🔎 Entendendo o Dockerfile

### `FROM`

```dockerfile
FROM node:24
```

Define a imagem base utilizada para construir nossa aplicação.

Nesse caso, utilizamos uma imagem contendo o Node.js 24.

---

### `WORKDIR`

```dockerfile
WORKDIR /app
```

Define o diretório de trabalho dentro do container.

Importante:

```text
/app
```

é um diretório **dentro do container**, não uma pasta do Windows.

---

### `COPY`

```dockerfile
COPY package*.json ./
```

Copia os arquivos:

```text
package.json
package-lock.json
```

para o diretório `/app` dentro da imagem.

O `*` permite que o Docker encontre os arquivos que correspondem ao padrão `package*.json`.

---

### `RUN`

```dockerfile
RUN npm install
```

Executa o comando durante a **construção da imagem**.

Nesse momento, o Docker instala as dependências da aplicação dentro da imagem.

---

### `COPY`

```dockerfile
COPY src ./src
```

Copia o código-fonte da aplicação para dentro da imagem.

---

### `CMD`

```dockerfile
CMD ["node", "src/server.js"]
```

Define o comando que será executado quando um container for iniciado a partir dessa imagem.

---

# 📦 Imagem x Container

Um dos conceitos fundamentais aprendidos foi a diferença entre **imagem** e **container**.

Uma analogia simples:

```text
Dockerfile
    ↓
receita
    ↓
Imagem
    ↓
container
```

### Dockerfile

É a receita que descreve como construir a aplicação.

### Imagem

É o pacote criado a partir do Dockerfile.

### Container

É uma instância em execução dessa imagem.

No Task Flow:

```text
Dockerfile
     ↓
docker build
     ↓
task-flow:latest
     ↓
docker run
     ↓
Container Task Flow
```

---

# 🔨 Construindo a imagem

Com o Dockerfile criado, a imagem foi construída utilizando:

```powershell
docker build -t task-flow .
```

Onde:

- `docker build` → constrói uma imagem
- `-t task-flow` → define o nome/tag da imagem
- `.` → utiliza o diretório atual como contexto do build

A imagem criada foi:

```text
task-flow:latest
```

---

# ▶️ Executando o container

A aplicação foi executada com:

```powershell
docker run -p 3000:3000 task-flow
```

O parâmetro:

```text
-p 3000:3000
```

faz o mapeamento entre a porta do computador e a porta do container:

```text
Windows                     Container

localhost:3000  ──────────►  3000
```

Dessa forma, conseguimos acessar a aplicação através de:

```text
http://localhost:3000
```

---

# 🔍 Verificando containers

Para verificar os containers em execução:

```powershell
docker ps
```

O Task Flow apresentou um mapeamento semelhante a:

```text
0.0.0.0:3000->3000/tcp
```

Isso confirma que a porta 3000 do computador está sendo direcionada para a porta 3000 do container.

---

# 🧪 Testando a API

A API foi testada utilizando PowerShell.

### Consultando tarefas

```powershell
Invoke-RestMethod http://localhost:3000/tasks
```

### Criando uma tarefa

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:3000/tasks `
  -ContentType "application/json" `
  -Body '{"title":"Aprender Docker"}'
```

Resultado:

```json
{
  "id": 1,
  "title": "Aprender Docker",
  "completed": false
}
```

---

# 🔄 Fluxo atual da aplicação

Atualmente temos:

```text
                 Windows
                    │
                    │ HTTP :3000
                    ▼
              ┌───────────┐
              │   Docker  │
              │           │
              │ Container │
              │           │
              │ Node.js   │
              │ Express   │
              └─────┬─────┘
                    │
                    ▼
                 tasks[]
                 memória
```

A aplicação já está containerizada, porém ainda não possui persistência de dados.

---

# 🚧 Próximas etapas

O projeto será evoluído gradualmente.

## 1. PostgreSQL

Substituir o armazenamento em memória por um banco de dados PostgreSQL.

```text
Node.js
   ↓
PostgreSQL
```

Objetivo:

- Persistir tarefas
- Criar tabelas
- Criar consultas
- Entender conexão entre aplicação e banco

---

## 2. Docker Compose

Executar aplicação e banco de dados juntos:

```text
Docker Compose
│
├── Task Flow
│   └── Node.js + Express
│
└── PostgreSQL
```

Objetivo:

- Orquestrar múltiplos containers
- Criar redes entre serviços
- Configurar variáveis de ambiente
- Trabalhar com volumes

---

## 3. Persistência

Utilizar volumes Docker para garantir que os dados do PostgreSQL não sejam perdidos quando o container for recriado.

---

## 4. GitHub Actions

Criar uma pipeline de CI para automatizar tarefas como:

```text
Push
  ↓
GitHub Actions
  ↓
Instalar dependências
  ↓
Executar testes
  ↓
Build
```

---

## 5. CI/CD

Evoluir a pipeline para automatizar também o processo de entrega:

```text
Developer
    ↓
Git Push
    ↓
GitHub
    ↓
GitHub Actions
    ↓
Testes
    ↓
Build Docker
    ↓
Deploy
```

---

## 6. Cloud

Levar a aplicação para um ambiente de nuvem e estudar conceitos como:

- Servidores
- Containers
- Networking
- Variáveis de ambiente
- Segurança
- Banco de dados gerenciado
- Logs
- Monitoramento

---

# 📚 Filosofia do projeto

O objetivo deste projeto não é apenas fazer o Task Flow funcionar.

A proposta é entender **o que acontece por trás de cada etapa**.

Por isso, cada nova tecnologia será adicionada somente depois de compreender:

1. Qual problema ela resolve?
2. Como ela funciona?
3. Por que ela é utilizada?
4. Como ela se integra às outras ferramentas?
5. Como aplicá-la em um projeto real?

---

# 📈 Evolução planejada

```text
Git
 │
 ▼
GitHub
 │
 ▼
Node.js + Express
 │
 ▼
Docker
 │
 ▼
PostgreSQL
 │
 ▼
Docker Compose
 │
 ▼
GitHub Actions
 │
 ▼
CI/CD
 │
 ▼
Cloud
 │
 ▼
Deploy
```

> **Task Flow — aprendendo DevOps construindo. 🚀**