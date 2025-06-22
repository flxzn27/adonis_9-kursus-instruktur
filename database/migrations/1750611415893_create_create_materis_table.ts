// database/migrations/xxxx_create_materi_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'materi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('kursus_id').unsigned().references('id').inTable('kursus').onDelete('CASCADE')
      table.string('judul').notNullable()
      table.text('deskripsi').nullable()
      table.string('file_path').notNullable() // Untuk menyimpan path file materi yang di-upload
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}