const baseUrl = "https://api.football-data.org/v2/";
const methodUse = 'GET';
const AuthToken = {'X-Auth-Token':'ac40da2ccc4d4cfb97446629eba68930'};

// parsing data
function json(response) { return response.json(); }

// handle kesalahan
function error(error) { console.log(`Error: ${error}`); }

// request data
