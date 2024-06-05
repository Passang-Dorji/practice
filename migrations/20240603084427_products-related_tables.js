/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories',(table)=>{
        table.increments()
        table.string('name',64).notNullable()
        table.string('description')
    })
    .createTable('products',(table)=>{
        table.increments()
        table.string('name',64).notNullable()
        table.string('description')
        table.integer('category_id').unsigned().references('categories.id')
    })
    .createTable('prices',(table)=>{
        table.increments()
        table.decimal('price').notNullable()
        table.integer('product_id').unsigned().references('products.id')
    })
    .createTable('inventory',(table)=>{
        table.increments()
        table.integer('product_id').unsigned().references('products.id')
        table.integer('quantity')
        table.dateTime('created_at')
    })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('inventory')
                     .dropTable('prices')
                     .dropTable('products')
                     .dropTable('categories')
                     
};
