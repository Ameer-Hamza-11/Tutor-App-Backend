require("dotenv").config();
const express = require("express");
const db = require("./models");
const userRoutes = require("./routes/user_route");
// const teacherRoutes = require("./routes/teacher_route");
// const studentRoute = require("./routes/student_route");
const app = express();

app.use(express.json());
app.use('/uploads',express.static('uploads'))

app.use("/api/auth", userRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/students", studentRoute);

db.sequelize.authenticate()
  .then(() => console.log("✅ Database connected..."))
  .catch(err => console.log("❌ Error: " + err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
