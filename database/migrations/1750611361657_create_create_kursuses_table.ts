// database/migrations/xxxx_create_kursus_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kursus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_kursus').notNullable()
      table.integer('durasi').unsigned().notNullable() // Durasi dalam jam
      table.decimal('biaya', 12, 2).notNullable()
      table.integer('instruktur_id').unsigned().references('id').inTable('instruktur').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}