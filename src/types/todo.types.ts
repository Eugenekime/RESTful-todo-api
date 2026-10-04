export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt?: Date;
  category?: string;
};

export type CreateTodoInput = {
  text: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
};

export type UpdateTodoInput = {
  text?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export type PaginationQuery = {
  page?: string;
  limit?: string;
  completed?: string;
  priority?: 'low' | 'medium' | 'high';
  search?: string;
};

export type TodoQueryOptions = {
  page?: number;
  limit?: number;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  search?: string;
};

export interface Stats {
  total: number;
  completed: number;
  pending: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
}
