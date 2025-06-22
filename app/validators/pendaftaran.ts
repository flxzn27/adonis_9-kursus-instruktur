import vine from '@vinejs/vine'

export const createPendaftaranValidator = vine.compile(
    vine.object({
        kursusId: vine.number().exists(async (db, value) => {
            return await db.from('kursus').where('id', value).first()
        }),
        pesertaId: vine.number().exists(async (db, value) => {
            return await db.from('peserta').where('id', value).first()
        }),
    })
)