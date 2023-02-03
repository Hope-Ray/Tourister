import  express  from "express";
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";

const app = express();


app.use(bodyParser.json({ limit: "30MB", extended: "true"}));
app.use(bodyParser.urlencoded({ limit: "30MB", extended: "true"}));
app.use(cors());

app.use('/posts',postRoutes);

const CONNECTION_URL = "mongodb+srv://anurag123:anurag123@cluster0.dcw3ieo.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery',false);
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

