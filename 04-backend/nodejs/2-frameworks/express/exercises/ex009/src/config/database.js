//export default {
//  dialect: "postgres",
//  host: "localhost",
//  username: "postgres",
//  password: "Henry@2009",
//  database: "curso_backend",
//  define: {
//    timestamp: true,
//    underscored: true,
//    underscoredAll: true,
//  },
//}

export default {
  dialect: "sqlite",
  storage: "./database.sqlite",

  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
