import app from "./app";

const PORT = process.env.PORT || 3000;

import { getEvent } from "./jobs/eventJobs";

getEvent(); 

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
})