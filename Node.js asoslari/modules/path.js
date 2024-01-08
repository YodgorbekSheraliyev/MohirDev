const path = require('path');


// file name
path.basename(__filename)

// folder name
path.dirname(__filename);

// extension name
path.extname(__filename);

// path object
const pathObj = path.parse(__filename);

