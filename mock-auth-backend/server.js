const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");

// Enable default middlewares
server.use(middlewares);

// IMPORTANT: Custom logic to handle extra user fields AND check for existing email
server.use(jsonServer.bodyParser);
server.post("/register", (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;

  // 1. CHECK FOR EXISTING EMAIL
  const userExists = server.db.get("users").find({ email: email }).value();

  if (userExists) {
    // If the email is found, send a 400 Bad Request error
    return res.status(400).json({
      error: "Registration failed",
      message: "A user with this email already exists.",
    });
  }

  // 2. CONTINUE REGISTRATION (if email is unique)
  // Ensure the 'user' object has all required fields before saving
  req.body = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  };

  // Pass control to the next middleware (json-server-auth) to save the user and issue a token
  next();
});

// IMPORTANT: Apply the json-server-auth logic
server.db = router.db;
server.use(auth);

// Apply routes
server.use(jsonServer.rewriter(routes));

// Apply the JSON Server router
server.use(router);

// Set port to use the environment variable $PORT or default to 3001
const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server with Auth is running on http://0.0.0.0:${PORT}`);
});
