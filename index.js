require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./models");
const authRoutes = require("./routes/authRoute");
const roleRoutes = require("./routes/roleRoute");
const jobRoutes = require("./routes/jobRoute");
const fetchRoutes = require("./routes/fetchRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");


const corsOption = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}
app.use(cors(corsOption))

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/fetchData", fetchRoutes);


app.use(errorMiddleware);


db.sequelize.authenticate()
  .then(() => console.log("✅ Database connected..."))
  .catch(err => console.log("❌ Error: " + err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
