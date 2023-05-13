import app from "./app.js";
import { caseEntorno } from "./config";

app.listen(app.get("PORT"),caseEntorno);