import Knex from "knex";
import Bookshelf from "bookshelf";
import db from "./../config/db.config";

const knex = new Knex({
    client: 'mysql',
    connection: db
});

const bookshelf = new Bookshelf(knex);
bookshelf.plugin('pagination');

export default bookshelf;
