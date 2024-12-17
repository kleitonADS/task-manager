# Task Manager - Frontend ANGULAR

<img src="https://github.com/kleitonADS/task-manager/blob/main/coverf.png"  width="800px" alt="Screenshot Profile" />


Este é o frontend para o projeto de gerenciamento de tarefas. Ele permite aos usuários adicionar, editar, listar, marcar como concluídas e excluir tarefas. O frontend foi desenvolvido utilizando **Angular 17+**.

## Tecnologias

- **Frontend:** Angular 17+
- **Servidor de Desenvolvimento:** Angular CLI
- **API:** Laravel (Backend)

## Requisitos

- **Node.js** (recomendado a versão LTS)
- **Angular CLI** (instalado globalmente)

## Como Rodar o Projeto

### 1. Clonar o Repositório

Clone este repositório para sua máquina local:

```bash
git clone https://github.com/kleitonADS/task-manager.git
cd task-manager
```



# Instalar Dependências:
```bash
npm install

```

---

# Rodar o Servidor de Desenvolvimento
```bash
ng serve


```

---

# Isso irá iniciar o servidor no endereço http://localhost:4200. A página será recarregada automaticamente sempre que você fizer alterações no código.
```bash
http://localhost:4200

```

---

# Conectar com o Backend
Certifique-se de que o backend (Laravel) está rodando e configurado corretamente para se comunicar com o frontend. A URL da API deve estar configurada no frontend (por exemplo, em src/environments/environment.ts), geralmente em algo como:
```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api' // URL da API do Laravel
};


```

---


