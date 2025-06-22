// database/migrations/xxxx_create_pendaftaran_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pendaftaran'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('kursus_id').unsigned().references('id').inTable('kursus').onDelete('CASCADE')
      table.integer('peserta_id').unsigned().references('id').inTable('peserta').onDelete('CASCADE')
      table.string('status').defaultTo('terdaftar') // Contoh status: terdaftar, selesai, batal
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}