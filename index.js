
const express = require("express");
const app = express();
const basicAuth=require("basic-auth");
const { specs, swaggerUi } = require('./config/swagger');
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactus = require("./routes/Contact");


const db = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloud = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "https://studynotion-e-dtech-platform.vercel.app",
        credentials:true,
    })
);
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);
const authMiddleware = (req, res, next) => {
    const user = basicAuth(req);
  
    const username = process.env.USER_NAME; 
    const password = process.env.USER_PASS; 
    if (user && user.name === username && user.pass === password) {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="Swagger API Docs"');
    res.status(401).send('Authentication required.');
  };

app.use('/api-docs',authMiddleware, swaggerUi.serve, swaggerUi.setup(specs));
 
// Routes
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/contactus", contactus);

// database connect
db.connectDB();

// cloudinary connect
cloud.cloudinaryConnect();

// initiate the server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});

// default route
app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your Server is up and Running...."
    });
});




// https://studynotion-abhay.vercel.app
