import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  getTodoStats,
  patchTodo,
  updateTodo,
  createBulkTodo,
} from '@/controller/todoController.js';
import {
  validateAndHandle,
  validateBulkCreateTodo,
  validateCreateTodo,
  validateTodoId,
  validateTodoQuery,
  validateUpdateTodo,
} from '@/middleware/validation.js';

const router = Router();

router.get('/', validateTodoQuery, getAllTodos);
router.get('/stats', getTodoStats);
router.post('/bulk', validateBulkCreateTodo, createBulkTodo);
router.get('/:id', validateTodoId, getTodoById);
router.post('/', validateCreateTodo, createTodo);
router.put(
  '/:id',
  validateAndHandle([validateTodoId, validateUpdateTodo]),
  updateTodo
);
router.patch(
  '/:id',
  validateAndHandle([validateTodoId, validateUpdateTodo]),
  patchTodo
);
router.delete('/:id', validateTodoId, deleteTodo);

export default router;
