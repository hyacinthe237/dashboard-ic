import auth from './auth'

export default {
    guest (to: any, from: any, next: any) {
        next(auth.check() ? '/' : true)
    },

    auth (to: any, from: any, next: any) {
        next(auth.check() ? true : '/login')
    }
}
