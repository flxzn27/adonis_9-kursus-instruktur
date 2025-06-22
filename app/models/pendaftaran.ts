// app/models/pendaftaran.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kursus from '#models/kursus'
import Peserta from '#models/peserta'

export default class Pendaftaran extends BaseModel {
  public static table = 'pendaftaran'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare kursusId: number

  @column()
  declare pesertaId: number

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relasi: Satu pendaftaran milik satu kursus
  @belongsTo(() => Kursus)
  declare kursus: BelongsTo<typeof Kursus>

  // Relasi: Satu pendaftaran milik satu peserta
  @belongsTo(() => Peserta)
  declare peserta: BelongsTo<typeof Peserta>
}