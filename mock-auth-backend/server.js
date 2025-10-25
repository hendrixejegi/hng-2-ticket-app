const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");

// Enable default middlewares
server.use(middlewares);

// Add bodyParser for handling request bodies
server.use(jsonServer.bodyParser);

// --- Custom Registration Logic (/register) ---
server.post("/register", (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;

  // 1. CHECK FOR EXISTING EMAIL
  const userExists = server.db.get("users").find({ email: email }).value();

  if (userExists) {
    return res.status(400).json({
      error: "Registration failed",
      message: "A user with this email already exists.",
    });
  }

  // 2. CONTINUE REGISTRATION (if email is unique)
  // json-server-auth expects the body to contain email and password for processing
  // We keep the other data temporarily and let json-server-auth run its course
  // Note: json-server-auth automatically saves all fields sent in the request body.
  req.body = { email, password, firstname, lastname };

  // Pass control to the next middleware (json-server-auth)
  next();
});

// --- Custom Login Logic (/login) ---
server.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;

    // 1. Check if user exists in the database
    const user = server.db.get("users").find({ email: email }).value();

    if (!user) {
      // If user is not found, send a specific error response
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid credentials (User not found).",
      });
    }

    // 2. If the user exists, we pass the request to json-server-auth.
    // json-server-auth will verify the password (which is hashed) and return the token.
    // If the password verification fails, json-server-auth will automatically send a 400 response.
    // If it passes, it sends a 200 response with the token and user data.
    next();
  },
  auth
); // Apply json-server-auth specifically to the /login route for password validation

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
