import type { Request, Response, NextFunction } from 'express';
import * as todoService from '@/services/todoService.js';
import type { Todo, TodoQueryOptions } from '@/types/todo.types.js';

function getAllTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, completed, priority, search } = req.query;
    const options: TodoQueryOptions = {};

    if (page !== undefined) {
      options.page = Number(page);
    }

    if (limit !== undefined) {
      options.limit = Number(limit);
    }

    if (completed !== undefined) {
      options.completed = completed === 'true';
    }

    if (priority === 'high' || priority === 'medium' || priority === 'low') {
      options.priority = priority;
    }

    if (typeof search === 'string') {
      options.search = search;
    }

    const allTodos = todoService.getTodos(options);

    return res.json({
      success: true,
      data: allTodos.todos,
      meta: allTodos.meta,
    });
  } catch (error) {
    next(error);
  }
}

function getTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data: Todo | null = todoService.getTodoById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Id failed',
        details: [{ field: 'id', message: 'Id not found', value: id }],
      });
    }
    return res.json(data);
  } catch (error) {
    next(error);
  }
}

function createTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const newBody = req.body;
    const newTodo = todoService.createTodo(newBody);
    return res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Todo created',
    });
  } catch (error) {
    next(error);
  }
}

function createBulkTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const todos = req.body.todos;
    const response = todoService.createBulkTodo(todos);
    res.status(201).json({
      success: true,
      data: response,
      message: 'Todos created',
    });
  } catch (error) {
    next(error);
  }
}

function updateTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const updatedTodo = todoService.updateTodo(id, body);
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        error: 'Id not found',
        details: [
          {
            field: 'Id',
            message: 'Id not found',
            value: id,
          },
        ],
      });
    }
    return res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated',
    });
  } catch (error) {
    next(error);
  }
}

function patchTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    if (
      body.text === undefined &&
      body.completed === undefined &&
      body.priority === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update',
        details: [
          {
            field: 'Body',
            message: 'Body can not be empty and value need to be valid',
            value: body,
          },
        ],
      });
    }
    const updatedTodo = todoService.updateTodo(id, body);
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        error: 'Id not found',
        details: [
          {
            field: 'Id',
            message: 'Id not found',
            value: id,
          },
        ],
      });
    }
    return res.json({
      success: true,
      data: updatedTodo,
      message: 'Todo updated',
    });
  } catch (error) {
    next(error);
  }
}

function deleteTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const isDeleted = todoService.deleteTodo(id);
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        error: 'Id not found',
        details: [
          {
            field: 'Id',
            message: 'Can not find id',
            value: id,
          },
        ],
      });
    }

    return res.status(204);
  } catch (error) {
    next(error);
  }
}

function getTodoStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = todoService.getStats();
    return res.json(stats);
  } catch (error) {
    next(error);
  }
}

export {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  getTodoStats,
  createBulkTodo,
};
