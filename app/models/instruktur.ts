// app/models/instruktur.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Kursus from '#models/kursus'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Instruktur extends BaseModel {
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

  @hasMany(() => Kursus)
  declare kursus: HasMany<typeof Kursus>
}
