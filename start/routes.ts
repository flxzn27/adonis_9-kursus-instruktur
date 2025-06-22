/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// --- Impor semua controller Anda di sini ---
const DashboardController = () => import('#controllers/dashboard_controller')
const AuthController = () => import('#controllers/auth_controller')
const InstrukturController = () => import('#controllers/instrukturs_controller')
const KursusController = () => import('#controllers/kursuses_controller')
const PendaftaranController = () => import('#controllers/pendaftarans_controller')

// Rute untuk pengguna yang BELUM login (tamu)
router.group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('login')
    router.post('/login', [AuthController, 'login']).as('login.post')
    router.get('/register', [AuthController, 'showRegister']).as('register')
    router.post('/register', [AuthController, 'register']).as('register.post')
}).as('auth').middleware(middleware.guest())

// Rute untuk pengguna yang SUDAH login
router.group(() => {
    // [FIX] Ubah rute ini untuk menggunakan DashboardController
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard')

    router.post('/logout', [AuthController, 'logout']).as('logout')

    // Rute CRUD
    router.resource('/instruktur', InstrukturController).as('instruktur')
    router.resource('/kursus', KursusController).as('kursus')
    router.resource('/pendaftaran', PendaftaranController)
        .except(['show', 'edit', 'update'])
        .as('pendaftaran')

}).middleware(middleware.auth())

// Redirect halaman utama
router.get('/', ({ auth, response }) => {
    if (auth.user) {
        return response.redirect().toRoute('dashboard')
    }
    return response.redirect().toRoute('auth.login')
})
