import type { HttpContext } from '@adonisjs/core/http'
import Pendaftaran from '#models/pendaftaran'
import Kursus from '#models/kursus'
import Peserta from '#models/peserta'
import { createPendaftaranValidator } from '#validators/pendaftaran'

export default class PendaftaranController {
  /**
   * Menampilkan daftar semua pendaftaran.
   */
  async index({ view }: HttpContext) {
    const pendaftaran = await Pendaftaran.query().preload('kursus').preload('peserta')
    return view.render('pendaftaran/index', { pendaftaran })
  }

  /**
   * Menampilkan form untuk membuat pendaftaran baru.
   */
  async create({ view }: HttpContext) {
    const kursus = await Kursus.all()
    const peserta = await Peserta.all() // Pastikan Anda sudah punya data peserta
    return view.render('pendaftaran/create', { kursus, peserta })
  }

  /**
   * Menyimpan pendaftaran baru dengan validasi unik.
   */
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createPendaftaranValidator)

    // Validasi: Cek apakah peserta sudah terdaftar di kursus yang sama
    const existingPendaftaran = await Pendaftaran.query()
      .where('kursus_id', payload.kursusId)
      .where('peserta_id', payload.pesertaId)
      .first()

    if (existingPendaftaran) {
      session.flash('notification', {
        type: 'danger',
        message: 'Validasi Gagal: Peserta ini sudah terdaftar di kursus yang dipilih.',
      })
      return response.redirect().back()
    }

    await Pendaftaran.create(payload)
    session.flash('notification', {
      type: 'success',
      message: 'Pendaftaran baru berhasil ditambahkan!',
    })
    return response.redirect().toRoute('pendaftaran.index')
  }

  /**
   * Menghapus data pendaftaran.
   */
  async destroy({ params, response, session }: HttpContext) {
    const pendaftaran = await Pendaftaran.findOrFail(params.id)
    await pendaftaran.delete()

    session.flash('notification', {
      type: 'success',
      message: 'Data pendaftaran berhasil dihapus!',
    })
    return response.redirect().back()
  }
}