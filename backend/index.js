const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const StoreRouter = require('./Routes/StoreRouter');
const ProductRouter = require('./Routes/ProductRoute');
const glbroute = require('./Routes/glbfileRoute');
const path = require('path'); // ✅ Add path if needed
const sequelize = require('./config/db');
const VerificationCode = require('./Models/verification_codes');
const Brand_Manager=require('./Models/Brand_Manager');
const businessinfo = require('./Routes/businessinfo');
const templateRoutes = require('./Routes/templateRoutes');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// ✅ CORS middleware with credentials
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// ✅ Static file server for .glb files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/stores', StoreRouter);
app.use('/product', ProductRouter);
app.use('/upload', glbroute);
app.use('/Brand',businessinfo);
app.use('/templates', templateRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log("Tables Created Successfully!");
}).catch((error) => {
    console.error("Error Creating Tables:", error.message);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
