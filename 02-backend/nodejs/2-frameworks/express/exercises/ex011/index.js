import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Requisição bem sucedida..");

  return next();
});

app.use((req, res, next) => {
  console.time("timeLogger");
  console.log(`${req.method} :: ${req.url}`);

  next();
  console.timeEnd("timeLogger");
});

// app.use((req, res, next) => {
//   const { name } = req.query;
//
//   if(!name) {
//     return res.status(400).json({ error: "Name is required." });
//   }
//
//   if(name && name == "Henry") {
//     return next();
//   }
//   return res.status(401).json({ error: "Permition danied." });
// });

const checkNameExists = (req, res, next) => {
  const { name } = req.query;

  if(!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  return next();
}

const checkPermition = (req, res, next) => {
  const { name } = req.query;

  const usersAllowed = ["Henry", "Isis"];

  const nameIsValid = usersAllowed.includes(name) ? true : false;

  if(!nameIsValid) {
    return res.status(401).json({ error: "User not allowed to access this resource." })
  }

  return next();
}

const PORT = 3000;

app.get("/hello", checkNameExists, checkPermition,(req, res) => {
  const { name } = req.query;

  return res.json({ title: "Hello World!", message: `Hi ${name}, how are you?` });
});

app.listen(PORT, () => {
  console.log("Rodando na porta", PORT);
})
