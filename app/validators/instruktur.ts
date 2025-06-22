import vine from '@vinejs/vine'

/**
 * Validator untuk membuat instruktur baru.
 * Email harus unik di tabel 'instruktur'.
 */
export const createInstrukturValidator = vine.compile(
    vine.object({
        nama: vine.string().trim().minLength(3),
        email: vine
            .string()
            .email()
            .normalizeEmail()
            .unique(async (db, value) => {
                const match = await db.from('instruktur').where('email', value).first()
                return !match
            }),
    })
)

/**
 * Validator untuk memperbarui instruktur.
 * Aturan unik pada email sedikit berbeda untuk memperbolehkan
 * pengguna menyimpan email yang sama.
 */
export const updateInstrukturValidator = vine.compile(
    vine.object({
        nama: vine.string().trim().minLength(3),
        email: vine.string().email().normalizeEmail(),
    })
)