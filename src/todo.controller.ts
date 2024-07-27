import { TodoEntity } from "./todo.entity";
import TodoDataSource from "./todo.source";
import { debounce } from "./utils";

const debouncedDestroyDB = debounce(
  () => TodoDataSource.destroy(),
  5 * 60 * 1000
);

const todoRepository = TodoDataSource.getRepository(TodoEntity);

export const connectToDB = async () => {
  if (!TodoDataSource.isInitialized) {
    await TodoDataSource.initialize();
  }

  debouncedDestroyDB();
};

export const getTodoItems = async (status: string) => {
  const searchParams = status ? { where: { status } } : undefined;
  const todoItems = await todoRepository.find(searchParams);

  console.table(todoItems);
};

export const updateTodoItemStatus = async (id: string) => {
  await todoRepository.update(id, { status: "done" });

  console.log("Successfully updated");
};

export const createTodoItem = async (title: string) => {
  const todo = todoRepository.create({ title });
  await todoRepository.save(todo);

  console.log("Successfully created");
};

export const deleteTodoItemById = async (id: string) => {
  await todoRepository.delete(id);

  console.log("Successfully deleted");
};
