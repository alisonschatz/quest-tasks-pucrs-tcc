Quest Tasks - Lista de Tarefas Gamificada
📋 Informações do Projeto
Instituição: PUCRS - Pontifícia Universidade Católica do Rio Grande do Sul
Curso: Pós-Graduação em Desenvolvimento Full Stack
Disciplina: Projeto de Conclusão de Curso
Autor: Alison Schatz

📖 Descrição
Quest Tasks é uma aplicação web inovadora de gerenciamento de tarefas que utiliza elementos de gamificação para aumentar a produtividade e motivação dos usuários. O projeto combina conceitos de jogos (pontos, níveis, conquistas) com funcionalidades práticas de organização pessoal, criando uma experiência única e envolvente.
A aplicação transforma tarefas cotidianas em "quests" (missões), onde cada tarefa concluída gera pontos de experiência (XP), permitindo que o usuário suba de nível e desbloqueie conquistas, mantendo-o motivado e engajado com suas responsabilidades diárias.
🎯 Objetivos
Objetivo Geral
Desenvolver uma aplicação web responsiva que transforme o gerenciamento de tarefas em uma experiência gamificada, aumentando o engajamento e a produtividade dos usuários através de elementos lúdicos e sistema de recompensas.
Objetivos Específicos

Implementar sistema de pontuação e níveis baseado na conclusão de tarefas
Criar sistema de conquistas para incentivar diferentes comportamentos produtivos
Desenvolver interface intuitiva e visualmente atraente com design moderno
Aplicar conceitos avançados de UX/UI com foco na experiência do usuário
Implementar funcionalidades de priorização e organização inteligente de tarefas
Criar sistema de streak (sequência) para manter consistência e hábitos saudáveis
Aplicar arquitetura componentizada para facilitar manutenção e escalabilidade

🚀 Tecnologias Utilizadas
Frontend

React 18: Framework JavaScript para construção da interface de usuário
React Hooks: useState e useEffect para gerenciamento de estado
Tailwind CSS: Framework CSS utility-first para estilização moderna
Lucide React: Biblioteca de ícones SVG otimizados
JavaScript ES6+: Linguagem de programação com sintaxe moderna
CSS3: Animações e efeitos visuais customizados

Ferramentas de Desenvolvimento

Node.js: Ambiente de execução JavaScript
npm: Gerenciador de pacotes
Git: Sistema de controle de versão
GitHub: Hospedagem de código e colaboração
VS Code: Editor de código com extensões para React
PostCSS: Processamento de CSS
Autoprefixer: Compatibilidade de CSS entre navegadores

Deploy e Hospedagem

GitHub Pages: Hospedagem gratuita de sites estáticos
gh-pages: Ferramenta de deploy automatizado
Vercel/Netlify: Alternativas para deploy (configuradas)

🏗️ Arquitetura do Sistema
Estrutura de Componentes
src/
├── components/
│   ├── UserStats.jsx         # Estatísticas e progresso do usuário
│   ├── TaskList.jsx          # Lista principal de tarefas e formulário
│   ├── TaskItem.jsx          # Item individual de tarefa com interações
│   └── Achievements.jsx      # Sistema de conquistas e progresso
├── hooks/
│   └── useGameification.js   # Hook customizado para lógica de gamificação
├── utils/
│   └── calculations.js       # Funções auxiliares de cálculo e utilitários
├── App.js                    # Componente principal da aplicação
├── App.css                   # Estilos específicos e animações
├── index.js                  # Ponto de entrada da aplicação
└── index.css                 # Estilos globais com Tailwind
Fluxo de Dados

Adição de Tarefa: Usuário insere nova tarefa → Estado atualizado → Renderização automática
Conclusão de Tarefa: Click no botão → XP calculado → Nível atualizado → Conquistas verificadas
Sistema de Streak: Verificação de data → Cálculo de sequência → Atualização de estatísticas
Priorização: Seleção de prioridade → Recálculo de XP → Atualização visual

Padrões de Arquitetura

Component-Based Architecture: Separação clara de responsabilidades
Custom Hooks: Lógica de estado reutilizável
Utility Functions: Funções puras para cálculos complexos
Props Drilling: Comunicação eficiente entre componentes

⚙️ Funcionalidades Implementadas
🎮 Sistema de Gamificação Avançado

Pontos de Experiência (XP): 20-50 XP por tarefa, variando com prioridade
Sistema de Níveis: Progressão baseada em XP acumulado (100 XP por nível)
Barra de Progresso Animada: Visualização fluida do progresso até o próximo nível
Sistema de Streak: Contador de dias consecutivos com tarefas concluídas
Multiplicadores de Prioridade: Tarefas de alta prioridade rendem mais XP

📝 Gerenciamento Inteligente de Tarefas

Adição Dinâmica: Interface intuitiva com validação em tempo real
Sistema de Prioridades: Três níveis (Alta, Média, Baixa) com cores distintas
Conclusão com Feedback: Animações e feedback visual imediato
Remoção Segura: Confirmação visual antes da exclusão
Persistência de Estado: Dados mantidos durante a sessão

🏆 Sistema de Conquistas Motivacional

Primeira Tarefa: Desbloqueada ao completar a primeira tarefa (50 XP bônus)
Mestre das Tarefas: Desbloqueada após 10 tarefas concluídas (100 XP bônus)
Consistência: Desbloqueada após 3 dias de streak (75 XP bônus)
Veterano: Desbloqueada ao alcançar o nível 5 (200 XP bônus)
Progresso Visual: Barra de progresso das conquistas

📊 Dashboard e Analytics

Estatísticas em Tempo Real: Nível atual, XP total, tarefas concluídas
Contador de Streak: Visualização de dias consecutivos de atividade
Tarefas Pendentes: Count dinâmico de tarefas não concluídas
Progresso Visual: Barras e indicadores animados de progresso
Mensagens Motivacionais: Dicas contextuais baseadas no progresso

🎨 Design e UX/UI
Princípios de Design Aplicados

Material Design: Elevação e sombras para hierarquia visual
Minimalismo: Interface limpa focada nas funcionalidades essenciais
Microinterações: Animações sutis que melhoram a experiência
Feedback Visual: Resposta imediata para todas as ações do usuário
Acessibilidade: Contraste adequado e navegação por teclado

Paleta de Cores Estudada

Primária: Gradiente Roxo/Rosa (#8B5CF6 → #EC4899) - Energia e criatividade
Secundária: Tons de Azul (#1E40AF → #3730A3) - Confiança e produtividade
Sucesso: Verde (#10B981) - Conquistas e progresso
Alerta: Amarelo (#F59E0B) - Atenção e prioridade média
Erro: Vermelho (#EF4444) - Prioridade alta e alertas

Sistema de Tipografia

Fonte Principal: Inter - Legibilidade em telas digitais
Hierarquia: H1-H3 para títulos, body para texto corrido
Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

📱 Responsividade e Adaptabilidade
A aplicação foi desenvolvida seguindo a metodologia mobile-first, garantindo funcionamento otimizado em:
Desktop (1024px+)

Layout com sidebar para conquistas
Grid de três colunas para melhor aproveitamento do espaço
Hover effects e microinterações avançadas

Tablet (768px - 1023px)

Adaptação do grid para duas colunas
Espaçamentos otimizados para touch
Navegação simplificada mantendo funcionalidades

Mobile (320px - 767px)

Interface em coluna única
Botões otimizados para toque
Menu colapsável para conquistas
Gestos touch nativos

🧠 Lógica de Negócio e Algoritmos
Cálculo de XP por Tarefa
javascriptconst calculateTaskXP = (priority = 'medium') => {
  const baseXP = Math.floor(Math.random() * 30) + 20; // 20-50 XP base
  
  const priorityMultiplier = {
    low: 1.0,     // XP normal
    medium: 1.2,  // 20% bônus
    high: 1.5     // 50% bônus
  };
  
  return Math.floor(baseXP * (priorityMultiplier[priority] || 1));
};
Sistema de Níveis
javascript// Nível baseado em XP total com crescimento linear
const calculateLevel = (totalXP) => Math.floor(totalXP / 100) + 1;

// XP necessário para um nível específico
const getXPForLevel = (level) => level * 100;

// Progresso percentual até o próximo nível
const getLevelProgress = (currentXP) => {
  const currentLevel = calculateLevel(currentXP);
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  
  return ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
};
Algoritmo de Streak
javascriptconst calculateStreak = (lastCompletedDate) => {
  if (!lastCompletedDate) return 1; // Primeira vez
  
  const today = new Date().toDateString();
  const lastDate = new Date(lastCompletedDate).toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastDate === today) {
    return 0; // Mantém streak atual (já completou hoje)
  } else if (lastDate === yesterday.toDateString()) {
    return 1; // Incrementa streak (completou ontem)
  } else {
    return -1; // Reset streak (quebrou a sequência)
  }
};
Sistema de Conquistas Dinâmico
javascriptconst checkAchievements = (userStats) => {
  const achievements = [
    { 
      id: 'first_task', 
      condition: userStats.totalCompleted >= 1,
      reward: 50 
    },
    { 
      id: 'task_master', 
      condition: userStats.totalCompleted >= 10,
      reward: 100 
    },
    { 
      id: 'streak_master', 
      condition: userStats.streak >= 3,
      reward: 75 
    },
    { 
      id: 'level_veteran', 
      condition: userStats.level >= 5,
      reward: 200 
    }
  ];

  return achievements.filter(achievement => achievement.condition);
};
🚀 Como Executar o Projeto
Pré-requisitos Técnicos

Node.js: Versão 16.0 ou superior
npm: Versão 8.0 ou superior (incluído com Node.js)
Git: Para controle de versão
Navegador Moderno: Chrome, Firefox, Safari ou Edge (versões atuais)

Instalação Detalhada
bash# 1. Clonar o repositório
git clone https://github.com/alisonschatz/quest-tasks-pucrs-tcc.git

# 2. Entrar no diretório do projeto
cd quest-tasks-pucrs-tcc

# 3. Instalar todas as dependências
npm install

# 4. Inicializar configuração do Tailwind (se necessário)
npx tailwindcss init -p

# 5. Executar em modo de desenvolvimento
npm start

# 6. Acessar no navegador
# http://localhost:3000
Scripts Disponíveis
bash# Desenvolvimento com hot reload
npm start

# Build otimizado para produção
npm run build

# Deploy automático no GitHub Pages
npm run deploy

# Executar testes (se configurados)
npm test

# Analisar bundle de produção
npm run build && npx serve -s build