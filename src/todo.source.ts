import { DataSource } from "typeorm";
import { TodoEntity } from "./todo.entity";

const TodoDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    entities: [TodoEntity],
})

export default TodoDataSource;