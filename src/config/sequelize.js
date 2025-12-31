export default {
  development: {
    username: "postgres",
    password: "postgres",
    database: "devburger",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "devburger_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "devburger_prod",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
