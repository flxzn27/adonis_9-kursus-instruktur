// app/models/peserta.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Pendaftaran from '#models/pendaftaran'

export default class Peserta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relasi: Satu peserta bisa memiliki banyak pendaftaran
  @hasMany(() => Pendaftaran)
  declare pendaftaran: HasMany<typeof Pendaftaran>
}