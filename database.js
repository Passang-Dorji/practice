const knex = require("knex")({
    client:"pg",
    connection: {
        host:process.env.PG_URL,
        port:process.env.PG_PORT,
        user:process.env.PG_USER,
        password:process.env.PG_PASS,
        database:process.env.PG_DB,
    },
})
export default knex