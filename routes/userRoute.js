const fs = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "users.json");

const getUsers = () => {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUser = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, "\t"));
};

const userRoute = (app) => {
  app
    .route("/users/:id?")

    .get((req, res) => {
      const users = getUsers();

      res.send({ users });
    })

    .post((req, res) => {
      const users = getUsers();

      users.push(req.body);
      saveUser(users);

      res.status(201).send("The user has been created.");
    })

    .put((req, res) => {
      const users = getUsers();

      const usersChanged = users.map((user) => {
        if (user.id === req.params.id) {
          return {
            ...user,
            ...req.body,
          };
        }

        return user;
      });

      saveUser(usersChanged);

      res.status(200).send("The user has been changed.");
    })

    .delete((req, res) => {
      const users = getUsers();

      const usersChanged = users.filter((user) => user.id != req.params.id);

      saveUser(usersChanged);

      res.status(200).send("The user has been deleted.")
    })
};

module.exports = userRoute;
