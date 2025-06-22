import vine from '@vinejs/vine'

const kursusSchema = {
    nama_kursus: vine.string().trim().minLength(3),
    durasi: vine.number().positive(),
    biaya: vine.number().min(0),
    // Aturan ini memastikan bahwa instrukturId yang dikirim adalah ID yang
    // benar-benar ada di tabel 'instruktur'
    instrukturId: vine
        .number()
        .exists(async (db, value) => {
            return await db.from('instruktur').where('id', value).first()
        }),
}

export const createKursusValidator = vine.compile(
    vine.object(kursusSchema)
)

export const updateKursusValidator = vine.compile(
    vine.object(kursusSchema)
)
