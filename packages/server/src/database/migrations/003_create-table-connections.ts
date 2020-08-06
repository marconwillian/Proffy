import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.raw('current_timestamp')).notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('connections');
}