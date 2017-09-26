const settings = require("./settings"); 
const pg = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});
const query = process.argv.slice(2);


pg('famous_people').insert( { first_name: query[0], last_name: query[1], birthdate: new Date(query[2]) } ).asCallback( () => {
  console.log ( query[0], query[1], (query[2]), "has been added!" );
  pg.destroy();
});