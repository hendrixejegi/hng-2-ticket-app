const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");

// --- Reusable Middleware for Bad Request Check ---
const checkRequiredFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Email and password are required fields.",
    });
  }
  // If fields are present, continue to the next middleware
  next();
};
// --------------------------------------------------

// Enable default middlewares
server.use(middlewares);

// Add bodyParser for handling request bodies
server.use(jsonServer.bodyParser);

// --- Custom Registration Logic (/register) ---
server.post("/register", checkRequiredFields, (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;

  // 1. CHECK FOR EXISTING EMAIL (Runs only if fields are present)
  const userExists = server.db.get("users").find({ email: email }).value();

  if (userExists) {
    return res.status(400).json({
      error: "Registration failed",
      message: "A user with this email already exists.",
    });
  }

  // 2. CONTINUE REGISTRATION (Pass to json-server-auth)
  req.body = { email, password, first_name, last_name };
  next();
});

// --- Custom Login Logic (/login) ---
server.post(
  "/login",
  checkRequiredFields,
  (req, res, next) => {
    const { email } = req.body;

    // 1. Check if user exists (Runs only if fields are present)
    const user = server.db.get("users").find({ email: email }).value();

    if (!user) {
      // User not found check
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid credentials (User not found).",
      });
    }

    // 2. Pass to json-server-auth for password verification
    next();
  },
  auth
);

// Fallback for json-server-auth success/failure handling
server.db = router.db;
server.use(auth);

// Apply routes
server.use(jsonServer.rewriter(routes));

// Apply the JSON Server router
server.use(router);

// Set port and host
const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server with Auth is running on http://0.0.0.0:${PORT}`);
});
