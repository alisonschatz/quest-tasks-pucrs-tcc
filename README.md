<div align="center">
  <h1>🎮 Quest Tasks</h1>
  <p>Lista de Tarefas Gamificada com Firebase & Autenticação Google - TCC PUCRS</p>
</div>

---

## 🎯 Sobre o Projeto

Transforme suas tarefas cotidianas em uma aventura épica!

**Quest Tasks** é uma aplicação web moderna que revoluciona o gerenciamento de tarefas através da gamificação. Com autenticação Google, persistência em nuvem e conquistas, cada tarefa concluída gera XP, permite subir de nível e desbloquear achievements – tudo para manter sua produtividade em alta!

---

## 🎓 Projeto Acadêmico

- **Curso:** Pós-Graduação em Desenvolvimento Full Stack - PUCRS  
- **Autor:** Alison Schatz  
- **Orientador:** Prof.  
- **Ano:** 2025  
- **Status:** ✅ Em Produção  

---

## ⚡ Funcionalidades Principais

### 🔐 Sistema de Autenticação
- 🔑 **Login Google**: Autenticação segura e rápida  
- 👤 **Perfil do Usuário**: Dados automáticos via Google  
- 🔒 **Segurança**: Regras Firebase personalizadas  
- 📱 **Multi-dispositivo**: Sincronização entre plataformas  

### 🎮 Gamificação
- 🏆 **Níveis e XP**
  - 🟢 Baixa: +10 XP  
  - 🟡 Média: +25 XP  
  - 🔴 Alta: +50 XP  
- 🔥 **Streak System**: Dias consecutivos de produtividade  
- 🎖️ **Achievements**: 4 conquistas desbloqueáveis  

### ☁️ Persistência em Nuvem
- 🔥 **Firestore**: Banco de dados em tempo real  
- ⚡ **Sincronização Instantânea**  
- 🌐 **Acesso Global com segurança individual**  

### 📱 Experiência Premium
- 🎨 Interface com **Tailwind CSS**  
- 📲 **Design Responsivo**  
- 🌈 **Microinterações e animações modernas**  
- ⚡ **Performance otimizada**  

---

## 🚀 Demo ao Vivo

📍 [Acesse aqui](https://quest-tasks-pucrs-tcc.vercel.app)

---

## 🛠️ Stack Tecnológico

### Frontend
- React 18
- Tailwind CSS
- Lucide React
- JavaScript ES6+

### Backend & Infraestrutura
- Firebase Authentication & Firestore
- Vercel
- GitHub

### Ferramentas de Desenvolvimento
- VS Code
- Git & GitHub
- Firebase Console
- Chrome DevTools

---

## 🏅 Sistema de Conquistas

| Conquista           | Descrição                        | Recompensa |
|---------------------|----------------------------------|------------|
| ⭐ Primeira Quest     | Complete sua primeira tarefa     | 50 XP      |
| 🏆 Mestre das Tarefas | Complete 10 tarefas              | 100 XP     |
| 🔥 Consistência       | Mantenha 3 dias de streak        | 75 XP      |
| 👑 Veterano           | Alcance o nível 5                | 200 XP     |

---

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Conta Google
- Git

### Clone e Instalação

```bash
# 1️⃣ Clone o repositório
git clone https://github.com/alisonschatz/quest-tasks-pucrs-tcc.git

# 2️⃣ Acesse o projeto
cd quest-tasks-pucrs-tcc

# 3️⃣ Instale as dependências
npm install

# 4️⃣ Inicie o projeto
npm start

# 🎉 Acesse: http://localhost:3000 
```
## 🔥 Firebase Setup
1. Crie um projeto no Firebase Console
Acesse o console do Firebase e clique em "Adicionar projeto".

2. Ative o método de autenticação com Google
Vá até Authentication > Sign-in method e ative a opção Google.

3. Configure o Firestore Database
No menu lateral, acesse Firestore Database e clique em Criar banco de dados. Siga as instruções e escolha o modo de segurança adequado para seu ambiente (teste ou produção).

4. Atualize suas credenciais em src/services/firebase.js
Copie as configurações do seu projeto (encontradas em Configurações do Projeto > SDK do Firebase) e substitua no arquivo:

```bash
// src/services/firebase.js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};
```

## Deploy Vercel

1. Deploy Automático via GitHub

* Acesse vercel.com e faça login com sua conta GitHub.

* Importe seu repositório do projeto diretamente para a Vercel.

* A Vercel detecta automaticamente projetos React (Vite, CRA, etc.) e configura o ambiente de build.

2. Deploy Manual (caso necessário)
* Se quiser rodar o build localmente antes do deploy:
```bash
npm run build
```
3. Deploy via Vercel CLI (opcional)
* Caso prefira usar a linha de comando:
```bash
npm i -g vercel
vercel
```

## 📁 Estrutura do Projeto
```plaintext
📦 quest-tasks-pucrs-tcc/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── components/
│   │   ├── Achievements.jsx         # Exibe conquistas do usuário
│   │   ├── AuthWrapper.jsx          # Protege rotas ou controla acesso
│   │   ├── TaskItem.jsx             # Item individual de uma tarefa
│   │   ├── TaskList.jsx             # Lista de tarefas
│   │   └── UserStats.jsx            # Estatísticas do usuário
│   │
│   ├── hooks/
│   │   ├── useAuth.js               # Hook de autenticação Firebase
│   │   ├── useFirebaseQuests.js     # Hook para manipular "quests" no Firebase
│   │   └── useGamification.js       # Hook para regras de gamificação (XP, níveis, etc.)
│   │
│   ├── services/
│   │   └── firebase.js              # Configuração e inicialização do Firebase
│   │
│   ├── utils/
│   │   └── calculations.js          # Funções auxiliares (ex: cálculo de XP, progresso)
│   │
│   ├── App.js                       # Componente principal da aplicação
│   ├── App.css                      # Estilos específicos, possivelmente remanescentes
│   ├── index.css                    # Estilos globais com Tailwind
│   └── index.js                     # Ponto de entrada da aplicação
│
├── .gitignore
├── DEPLOYMENT.md                   # Instruções de deploy
├── LICENSE
├── package.json
├── postcss.config.js               # Configuração para Tailwind com PostCSS
├── README.md
└── tailwind.config.js              # Configuração do Tailwind
```

## 🎨 Design System

### Paleta de Cores

🟣 Primary: #8B5CF6    
🌸 Secondary: #EC4899   
🟢 Success: #10B981    
🟡 Warning: #F59E0B     
🔴 Error: #EF4444      
⚫ Dark: #1F2937

## 📈 Métricas de Qualidade

| Métrica          | Score | Descrição                          |
| ---------------- | ----- | ---------------------------------- |
| ⚡ Performance    | 95+   | Lighthouse                         |
| 📱 Responsivo    | 100%  | Design Mobile-first                |
| ♿ Acessibilidade | A+    | WCAG 2.1 compliant                 |
| 🔍 SEO           | 90+   | Otimizado para mecanismos de busca |
| 🛡️ Segurança    | A+    | Regras Firebase aplicadas          |

## 🔒 Segurança e Privacidade

### 🛡️ Autenticação Segura

 * OAuth 2.0 via Google

 * JWT Tokens gerenciados

 * Sessões seguras com expiração


