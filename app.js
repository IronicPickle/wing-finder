// Initilization Message
process.stdout.write('\033c');
var logStr = `
--- --- --- --- --- --- --- ---
Initalizing...
--- --- --- --- --- --- --- ---
Libraries`
console.log(logStr); // Startup
// Libraries
var express = require("express"),
    app = express(),
    http = require("http").Server(app);
    bodyParser = require("body-parser"),
    path = require("path"),
    mongoose = require("mongoose"),
    cookieParser = require("cookie-parser"),
    csrf = require("csurf"),
    csrfProtection = csrf({ cookie: true }),
    fs = require("fs"),
    // Custom libraries
    tools = require("./utility_lib/tools"),
    // Data/configs
    globalConfig = require("./config/global.json"),
    socketConfig = require("./config/socket.json")
    // DB models
// Require extensions
require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
}

if(globalConfig.main.log && !globalConfig.main.logAppend) tools.clearLog(globalConfig.main.logPath + "/server.log");
if(globalConfig.router.log && !globalConfig.router.logAppend) tools.clearLog(globalConfig.router.logPath + "/router.log");
if(socketConfig.main.log && !socketConfig.main.logAppend) tools.clearLog(socketConfig.main.logPath + "/socketIO.log");

var logStr = `Setup`;
console.log(logStr); // Startup
// Database setup
mongoose.Promise = require("bluebird");
mongoose.connect(globalConfig.database.details.database, { // Connect to db
  useMongoClient: true
}).then(function(db) {
  tools.log("server", "Connected to: " + db.host + ":" + db.port, globalConfig.main, null, null, "Database");
}).catch(function(err) {
  tools.log("server", err, globalConfig.main, null, true, "Database");
});

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, globalConfig.router.views));
// Public resource path
app.use(express.static(path.join(__dirname, globalConfig.router.public)));

// Csurf Middleware
app.use(cookieParser())

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Socket.IO
var io = require("socket.io")(http);

// Namespaces
var main = io.of("/main");
app.main = main;
require("./socket.io/namespaces/main.js")(app, main);

var logStr = `Routing`;
console.log(logStr); // Setup
// --- Routing and Serving --- //

// Log request
app.use("/*", function(req, res, next) {
  if(req.originalUrl != "/") {
    tools.log("router", req.originalUrl, globalConfig.router, {res: res});
  }
  return next();
});
// Index route
var index = require("./routes/index-route");
app.use("/", index);

process.stdout.write('\033c');
var logStr = `
--- --- --- --- --- --- --- ---
Starting Server...
--- --- --- --- --- --- --- ---`
console.log(logStr);


// Port Setup
var listener = http.listen(process.env.PORT || globalConfig.main.port, function(){
  process.stdout.write('\033c');
  var logStr = `
--- --- --- --- --- --- --- ---
Server started
--- --- --- --- --- --- --- ---
Listening on port: `+listener.address().port+`
\nServer Details
--- --- --- --- --- --- --- ---
Version `+process.version+`
Working Directory: `+process.cwd()+`
Platform: `+process.platform+`
Time elapsed `+(process.cpuUsage().user+process.cpuUsage().user)/1000+`ms
--- --- --- --- --- --- --- ---\n`
  console.log(logStr);
  tools.log("server", "Server started", globalConfig.main);
});

// Error handling
app.use(function(err, req, res, next) {
  if(err.code == 500) {
    tools.log("router", err.full, globalConfig.router, {res: res}, true);
  } else if(err.code) {
    res.status(err.code).send("");
  } else {
    tools.log("router", err, globalConfig.router, {res: res}, true);
  }
});
