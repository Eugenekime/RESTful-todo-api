import type { Request, Response, NextFunction, RequestHandler } from 'express';

function validateTodoQuery(req: Request, res: Response, next: NextFunction) {
  const { page, limit, completed, priority, search } = req.query;
  if (page !== undefined) {
    if (!Number.isInteger(Number(page)) || Number(page) < 1)
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'page',
            message: 'Page must be a positive integer',
            value: page,
          },
        ],
      });
  }
  if (limit !== undefined) {
    if (!Number.isInteger(Number(limit)) || Number(limit) < 1)
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'limit',
            message: 'limit must be a positive integer',
            value: limit,
          },
        ],
      });
  }
  if (completed !== undefined) {
    if (completed !== 'true' && completed !== 'false')
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'completed',
            message: 'Completed must be true or false',
            value: completed,
          },
        ],
      });
  }
  if (priority !== undefined) {
    if (priority !== 'high' && priority !== 'medium' && priority !== 'low')
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'priority',
            message: 'priority must be high or low or medium',
            value: priority,
          },
        ],
      });
  }
  if (search !== undefined) {
    if (typeof search !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'search',
            message: 'search must be a string',
            value: search,
          },
        ],
      });
    } else if (search.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'search',
            message: 'search can not be empty',
            value: search,
          },
        ],
      });
    }
  }

  next();
}

function validateTodoId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({
      success: false,
      error: 'Id failed',
      details: [
        {
          field: 'id',
          message: 'Id must be a positive integer',
          value: id,
        },
      ],
    });
  }
  next();
}

function validateCreateTodo(req: Request, res: Response, next: NextFunction) {
  const { text, priority, category } = req.body;
  const allowedFields = ['text', 'priority', 'category'];

  const hasUnknownField = Object.keys(req.body).some(
    (key) => !allowedFields.includes(key)
  );

  if (hasUnknownField) {
    return res.status(400).json({
      success: false,
      error: 'Unknown field',
      details: [
        {
          field: 'Body',
          message: 'Unknown field in the body',
          value: req.body,
        },
      ],
    });
  }

  if (text === undefined || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Body failed',
      details: [
        {
          field: 'text',
          message: 'text is required and can not be empty',
          value: text,
        },
      ],
    });
  }

  if (priority !== undefined) {
    if (priority !== 'high' && priority !== 'medium' && priority !== 'low')
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'priority',
            message: 'priority must be high or low or medium',
            value: priority,
          },
        ],
      });
  }

  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Body failed',
        details: [
          {
            field: 'category',
            message: 'Category can not be empty',
            value: category,
          },
        ],
      });
    }
  }

  next();
}

function validateUpdateTodo(req: Request, res: Response, next: NextFunction) {
  const { text, completed, priority, category } = req.body;

  const allowedFields = ['text', 'completed', 'priority', 'category'];

  const hasUnknownField = Object.keys(req.body).some(
    (key) => !allowedFields.includes(key)
  );

  if (hasUnknownField) {
    return res.status(400).json({
      success: false,
      error: 'Unknown field',
      details: [
        {
          field: 'Body',
          message: 'Unknown field in the body',
          value: req.body,
        },
      ],
    });
  }

  if (text !== undefined) {
    if (typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Body failed',
        details: [
          {
            field: 'text',
            message: 'text can not be empty',
            value: text,
          },
        ],
      });
    }
  }
  if (completed !== undefined) {
    if (typeof completed !== 'boolean')
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'completed',
            message: 'Completed must be true or false',
            value: completed,
          },
        ],
      });
  }
  if (priority !== undefined) {
    if (priority !== 'high' && priority !== 'medium' && priority !== 'low')
      return res.status(400).json({
        success: false,
        error: 'Query parameter failed',
        details: [
          {
            field: 'priority',
            message: 'priority must be high or low or medium',
            value: priority,
          },
        ],
      });
  }

  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Body failed',
        details: [
          {
            field: 'category',
            message: 'category can not be empty',
            value: category,
          },
        ],
      });
    }
  }
  next();
}

function validateAndHandle(validators: RequestHandler[]) {
  return [...validators];
}

function validateBulkCreateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!Array.isArray(req.body.todos)) {
    return res.status(400).json({
      success: false,
      error: 'Todos must be an array',
    });
  }
  for (const todo of req.body.todos) {
    if (typeof todo !== 'object' || todo === null) {
      return res.status(400).json({
        success: false,
        error: 'Unknown field',
        details: [
          {
            field: 'Body',
            message: 'Each todo must be an object',
            value: todo,
          },
        ],
      });
    }
    const { text, priority } = todo;
    const allowedFields = ['text', 'priority'];

    const hasUnknownField = Object.keys(todo).some(
      (key) => !allowedFields.includes(key)
    );

    if (hasUnknownField) {
      return res.status(400).json({
        success: false,
        error: 'Unknown field',
        details: [
          {
            field: 'Body',
            message: 'Unknown field in the body',
            value: todo,
          },
        ],
      });
    }

    if (text === undefined || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Body failed',
        details: [
          {
            field: 'text',
            message: 'text is required and can not be empty',
            value: text,
          },
        ],
      });
    }

    if (priority !== undefined) {
      if (priority !== 'high' && priority !== 'medium' && priority !== 'low')
        return res.status(400).json({
          success: false,
          error: 'Query parameter failed',
          details: [
            {
              field: 'priority',
              message: 'priority must be high or low or medium',
              value: priority,
            },
          ],
        });
    }
  }
  next();
}

export {
  validateTodoQuery,
  validateTodoId,
  validateCreateTodo,
  validateUpdateTodo,
  validateAndHandle,
  validateBulkCreateTodo,
};
