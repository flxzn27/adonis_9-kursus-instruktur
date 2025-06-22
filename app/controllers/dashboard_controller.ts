import type { HttpContext } from '@adonisjs/core/http'
import Instruktur from '#models/instruktur'
import Kursus from '#models/kursus'
import Peserta from '#models/peserta'

export default class DashboardController {
    /**
     * Menampilkan halaman dashboard dengan data statistik.
     */
    public async index({ view }: HttpContext) {
        // Menghitung total data dari masing-masing tabel
        const totalInstruktur = await Instruktur.query().count('* as total')
        const totalKursus = await Kursus.query().count('* as total')
        const totalPeserta = await Peserta.query().count('* as total') // Asumsi Anda punya model Peserta

        // Mengemas statistik ke dalam satu objek
        const stats = {
            instruktur: totalInstruktur[0].$extras.total,
            kursus: totalKursus[0].$extras.total,
            peserta: totalPeserta[0].$extras.total,
        }

        // Merender view 'dashboard.edge' dan mengirimkan data statistik
        return view.render('dashboard', { stats })
    }
}