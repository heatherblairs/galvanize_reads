
exports.up = function(knex, Promise) {
  return knex.schema.createTable("author_book", function(table){
    table.increments();
    table.integer('author_id').references("id").inTable("author").onDelete("CASCADE")
    table.integer('book_id').references("id").inTable("book").onDelete("CASCADE")
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("author_book")
};
