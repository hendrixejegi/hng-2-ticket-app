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

  // 1. CHECK FOR EXISTING EMAIL
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

    // 1. Check if user exists
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
server.use(auth); // Use the base auth middleware

// --- New /me Logic (POST request to get user data by ID) ---
server.post("/me", (req, res) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // This check is mainly to ensure we have a token before trying to verify it.
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "Token missing or invalid." });
  }

  // Frontend will send the userId in the body
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: "Bad Request",
      message: "userId is required in the request body.",
    });
  }

  // Find the user in the database using the ID
  const user = server.db
    .get("users")
    .find({ id: Number(userId) })
    .value();

  if (user) {
    // Return the single user object
    return res.json(user);
  } else {
    return res.status(404).json({
      error: "Not Found",
      message: `User with ID ${userId} not found.`,
    });
  }
});

// Apply routes
server.use(jsonServer.rewriter(routes));

// Apply the JSON Server router
server.use(router);

// Set port and host
const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server with Auth is running on http://0.0.0.0:${PORT}`);
});
