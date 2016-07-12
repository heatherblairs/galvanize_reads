exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE book RESTART IDENTITY CASCADE')
    .then(function() {
      return knex('book').del()
  });
};
