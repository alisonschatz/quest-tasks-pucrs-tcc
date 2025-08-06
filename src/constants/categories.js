// src/constants/categories.js
export const CATEGORIES = [
  {
    id: 'trabalho',
    name: 'Trabalho',
    icon: '💼',
    color: 'from-blue-500 to-purple-600',
    description: 'Tarefas relacionadas ao trabalho e carreira',
  },
  {
    id: 'saude',
    name: 'Saúde',
    icon: '💪',
    color: 'from-green-500 to-emerald-600',
    description: 'Exercícios, alimentação e bem-estar',
  },
  {
    id: 'crescimento',
    name: 'Crescimento',
    icon: '🧠',
    color: 'from-orange-500 to-red-600',
    description: 'Estudos, leitura e desenvolvimento pessoal',
  },
  {
    id: 'casa',
    name: 'Casa',
    icon: '🏠',
    color: 'from-yellow-500 to-orange-600',
    description: 'Limpeza, organização e manutenção',
  },
  {
    id: 'social',
    name: 'Social',
    icon: '👥',
    color: 'from-pink-500 to-purple-600',
    description: 'Relacionamentos, família e amigos',
  },
  {
    id: 'geral',
    name: 'Geral',
    icon: '⭐',
    color: 'from-gray-500 to-gray-700',
    description: 'Outras tarefas e atividades diversas',
  },
];

export const getCategoryById = categoryId => {
  return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];
};

export const getCategoryColor = categoryId => {
  const category = getCategoryById(categoryId);
  return category.color;
};

export const getCategoryIcon = categoryId => {
  const category = getCategoryById(categoryId);
  return category.icon;
};

export const getCategoryName = categoryId => {
  const category = getCategoryById(categoryId);
  return category.name;
};
