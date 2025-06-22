import type { HttpContext } from '@adonisjs/core/http'
import Kursus from '#models/kursus'
import Instruktur from '#models/instruktur'
import { createKursusValidator, updateKursusValidator } from '#validators/kursus'

export default class KursusController {
  /**
   * Menampilkan daftar semua kursus.
   * Kita menggunakan .preload('instruktur') untuk mengambil data instruktur
   * yang berelasi dengan setiap kursus (Eager Loading).
   */
  async index({ view }: HttpContext) {
    const kursus = await Kursus.query().preload('instruktur').orderBy('created_at', 'desc')
    return view.render('kursus/index', { kursus })
  }

  /**
   * Menampilkan form untuk membuat kursus baru.
   * Kita perlu mengambil semua data instruktur untuk ditampilkan
   * sebagai pilihan di form.
   */
  async create({ view }: HttpContext) {
    const instruktur = await Instruktur.all()
    return view.render('kursus/create', { instruktur })
  }

  /**
   * Menyimpan kursus baru ke database.
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createKursusValidator)
      await Kursus.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Kursus baru berhasil ditambahkan!',
      })
      return response.redirect().toRoute('kursus.index')
    } catch (error) {
      session.flash('notification', {
        type: 'danger',
        message: 'Gagal menambahkan kursus. ' + (error.messages ? error.messages[0].message : error.message),
      })
      return response.redirect().back()
    }
  }

  /**
   * Menampilkan form untuk mengedit kursus.
   * Kita juga perlu data semua instruktur di sini untuk pilihan dropdown.
   */
  async edit({ params, view }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    const instruktur = await Instruktur.all()
    return view.render('kursus/edit', { kursus, instruktur })
  }

  /**
   * Memperbarui data kursus di database.
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const kursus = await Kursus.findOrFail(params.id)
      const payload = await request.validateUsing(updateKursusValidator)

      kursus.merge(payload)
      await kursus.save()

      session.flash('notification', {
        type: 'success',
        message: 'Data kursus berhasil diperbarui!',
      })
      return response.redirect().toRoute('kursus.index')
    } catch (error) {
      session.flash('notification', {
        type: 'danger',
        message: 'Gagal memperbarui kursus. ' + (error.messages ? error.messages[0].message : error.message),
      })
      return response.redirect().back()
    }
  }

  /**
   * Menghapus data kursus.
   */
  async destroy({ params, response, session }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    await kursus.delete()

    session.flash('notification', {
      type: 'success',
      message: 'Kursus berhasil dihapus!',
    })
    return response.redirect().toRoute('kursus.index')
  }
}