import type { HttpContext } from '@adonisjs/core/http'
import Instruktur from '#models/instruktur'
import { createInstrukturValidator, updateInstrukturValidator } from '#validators/instruktur'

export default class InstrukturController {
  /**
   * Menampilkan daftar semua instruktur.
   */
  async index({ view }: HttpContext) {
    const instruktur = await Instruktur.all()
    return view.render('instruktur/index', { instruktur })
  }

  /**
   * Menampilkan form untuk membuat instruktur baru.
   */
  async create({ view }: HttpContext) {
    return view.render('instruktur/create')
  }

  /**
   * Menyimpan instruktur baru ke database.
   */
  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(createInstrukturValidator)
      await Instruktur.create(payload)

      session.flash('notification', {
        type: 'success',
        message: 'Instruktur baru berhasil ditambahkan!',
      })
      return response.redirect().toRoute('instruktur.index')
    } catch (error) {
      session.flash('notification', {
        type: 'danger',
        message: 'Terjadi kesalahan: ' + error.message,
      })
      return response.redirect().back()
    }
  }

  /**
   * Menampilkan detail satu instruktur (tidak kita gunakan, tapi baik untuk ada).
   */
  async show({ params, view }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    return view.render('instruktur/show', { instruktur })
  }

  /**
   * Menampilkan form untuk mengedit instruktur.
   */
  async edit({ params, view }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    return view.render('instruktur/edit', { instruktur })
  }

  /**
   * Memperbarui data instruktur di database.
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const instruktur = await Instruktur.findOrFail(params.id)
      const payload = await request.validateUsing(updateInstrukturValidator)

      instruktur.merge(payload)
      await instruktur.save()

      session.flash('notification', {
        type: 'success',
        message: 'Data instruktur berhasil diperbarui!',
      })
      return response.redirect().toRoute('instruktur.index')
    } catch (error) {
      session.flash('notification', {
        type: 'danger',
        message: 'Terjadi kesalahan saat memperbarui: ' + error.messages,
      })
      return response.redirect().back()
    }
  }

  /**
   * Menghapus data instruktur dari database.
   */
  async destroy({ params, response, session }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    await instruktur.delete()

    session.flash('notification', {
      type: 'success',
      message: 'Instruktur berhasil dihapus!',
    })
    return response.redirect().toRoute('instruktur.index')
  }
}