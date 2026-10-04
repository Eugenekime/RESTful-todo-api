import type {
  CreateTodoInput,
  Stats,
  Todo,
  TodoQueryOptions,
  UpdateTodoInput,
} from '@/types/todo.types.js';

const todos: Todo[] = [
  {
    id: 1,
    text: 'Learn TypeScript',
    completed: false,
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: 2,
    text: 'Learn NodeJS',
    completed: false,
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: 3,
    text: 'Learn React',
    completed: true,
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: 4,
    text: 'Learn some framework',
    completed: true,
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: 5,
    text: 'Learn some code',
    completed: true,
    priority: 'low',
    createdAt: new Date(),
  },
];

let nextId = 6;

function getTodos(options: TodoQueryOptions) {
  let filteredTodos = todos;
  if (options.completed !== undefined) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.completed === options.completed
    );
  }
  if (options.priority !== undefined) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.priority === options.priority
    );
  }
  if (options.search !== undefined) {
    const search = options.search.toLowerCase().trim();
    filteredTodos = filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(search)
    );
  }
  const limit = options.limit ?? 10;
  const page = options.page ?? 1;

  const start = page * limit - limit;
  const end = page * limit;

  filteredTodos = filteredTodos.slice(start, end);

  return { todos: filteredTodos, meta: { limit, page } };
}

function getTodoById(id: number): Todo | null {
  const data: Todo | undefined = todos.find((todo) => todo.id === id);
  return data ? data : null;
}

function createTodo(input: CreateTodoInput): Todo {
  const newTodo = {
    id: nextId,
    text: input.text,
    completed: false,
    priority: input.priority ?? 'low',
    createdAt: new Date(),
    ...(input.category !== undefined && {
      category: input.category,
    }),
  };
  todos.push(newTodo);
  nextId++;
  return newTodo;
}

function createBulkTodo(input: CreateTodoInput[]): Todo[] {
  const createdTodos: Todo[] = [];
  for (const todo of input) {
    const newTodo = createTodo(todo);
    createdTodos.push(newTodo);
  }

  return createdTodos;
}

function updateTodo(id: number, input: UpdateTodoInput): Todo | null {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  if (input.text !== undefined) {
    todo.text = input.text;
  }

  if (input.completed !== undefined) {
    todo.completed = input.completed;
  }

  if (input.priority !== undefined) {
    todo.priority = input.priority;
  }

  if (input.category !== undefined) {
    todo.category = input.category;
  }

  todo.updatedAt = new Date();
  return todo;
}

function deleteTodo(id: number): boolean {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return false;
  }
  todos.splice(index, 1);

  return true;
}

function getStats(): Stats {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;
  const byPriority = {
    low: todos.filter((todo) => todo.priority === 'low').length,
    medium: todos.filter((todo) => todo.priority === 'medium').length,
    high: todos.filter((todo) => todo.priority === 'high').length,
  };
  return {
    total,
    completed,
    pending,
    byPriority,
  };
}

export {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getStats,
  createBulkTodo,
};
