/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('stock_update',(table)=>{
        table.increments()
        table.integer("product_id").unsigned().references('products.id')
        table.integer('quantity').notNullable()
        table.string('description')
        table.dateTime('updated_at')
    })
    .createTable('transaction',(table)=>{
        table.increments()
        table.decimal('total_amount')
        table.string('payment')
        table.string('journal_number')
        table.dateTime('opened_at')
        table.dateTime('closed_at')

    })
    .createTable('transaction_items',(table)=>{
        table.increments()
        table.integer("product_id").unsigned().references('products.id')
        table.integer("transaction_id").unsigned().references('transaction.id')
        table.integer('quantity').notNullable()
        table.decimal("price").notNullable()
        table.decimal('total_price')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('transaction_items')
                .dropTable('transaction')
                .dropTable('stock_update')
  
};
