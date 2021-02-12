import dotenv from "dotenv";
import "./db";
import app from "./app";
import "./models/User";
import "./models/Board";

dotenv.config();


const PORT = process.env.PORT || 4000;
const handleListening = () => console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);