import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
    async showLogin({ view }: HttpContext) {
        return view.render('auth/login')
    }

    async showRegister({ view }: HttpContext) {
        return view.render('auth/register')
    }

    async login({ request, auth, response, session }: HttpContext) {
        try {
            const { email, password } = await request.validateUsing(loginValidator)
            const user = await User.verifyCredentials(email, password)

            await auth.use('web').login(user)
            return response.redirect().toRoute('dashboard')
        } catch (error) {
            session.flash('error', 'Email atau password yang Anda masukkan salah.')
            return response.redirect().back()
        }
    }

    async register({ request, auth, response, session }: HttpContext) {
        try {
            const data = await request.validateUsing(registerValidator)
            const user = await User.create(data)

            await auth.use('web').login(user)
            session.flash('notification', { type: 'success', message: 'Registrasi berhasil! Selamat datang.' })
            return response.redirect().toRoute('dashboard')
        } catch (error) {
            session.flash('error', 'Terjadi kesalahan saat registrasi. Pastikan email belum terdaftar.')
            return response.redirect().back()
        }
    }

    async logout({ auth, response, session }: HttpContext) {
        await auth.use('web').logout()
        session.flash('notification', { type: 'success', message: 'Anda berhasil logout.' })
        return response.redirect().toRoute('auth.login')
    }
}
