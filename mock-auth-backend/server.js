const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");

// Enable default middlewares (Logger, Static, Gzip, etc.)
server.use(middlewares);

// IMPORTANT: Custom logic to handle extra user fields
// This runs BEFORE the default json-server-auth middleware
server.use(jsonServer.bodyParser);
server.post("/register", (req, res, next) => {
  // Ensure the 'user' object has the required extra fields before saving
  req.body.user = {
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  // Pass control to the next middleware (json-server-auth)
  next();
});

// IMPORTANT: Apply the json-server-auth logic
server.db = router.db; // Required for json-server-auth to work with db.json
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
