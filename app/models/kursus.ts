import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Instruktur from '#models/instruktur'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Pendaftaran from '#models/pendaftaran'
import Materi from './materi.js'

export default class Kursus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_kursus: string

  @column()
  declare durasi: number

  @column()
  declare biaya: number

  @column()
  declare instrukturId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Instruktur)
  declare instruktur: BelongsTo<typeof Instruktur>

  @hasMany(() => Pendaftaran)
  declare pendaftaran: HasMany<typeof Pendaftaran>

  @hasMany(() => Materi)
  declare materi: HasMany<typeof Materi>
}