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

const query = process.argv[2]

function formatDate( date ) {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function printPerson( person ) {
  console.log("- " + person.id + ": " + person.first_name + " " + person.last_name + ", born '" + formatDate(person.birthdate) + "'");
}

function printAllPersons( rows ) {
  rows.forEach(printPerson);
}

pg.select().from('famous_people').where("first_name", "like", query).orWhere("last_name", "like", query).asCallback( (err, rows) => {
  printAllPersons(rows);
  pg.destroy();
});