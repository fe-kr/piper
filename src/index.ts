#!/usr/bin/env node

import { program } from "commander";

import {
  connectToDB,
  getTodoItems,
  createTodoItem,
  updateTodoItemStatus,
  deleteTodoItemById,
} from "./todo.controller";

program
  .version("1.0.0")
  .description("TODO CLI App")
  .hook("preAction", connectToDB)
  .hook("postAction", () => process.exit(0));

program
  .command("new")
  .description("Create new TODO item")
  .argument("<title>", "TODO item title")
  .action(createTodoItem);

program
  .command("list")
  .argument("<status>", "TODO item status")
  .description("List TODO items by status")
  .action(getTodoItems);

program
  .command("done")
  .description("Update TODO status to Completed")
  .argument("<id>", "TODO item id")
  .action(updateTodoItemStatus);

program
  .command("delete")
  .description("Delete a TODO item")
  .argument("<id>", "TODO item id")
  .action(deleteTodoItemById);

program.parse(process.argv);
