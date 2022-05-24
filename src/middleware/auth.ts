import env from '../../env'

export default {
    // setUser (user: any) {
    //     localStorage.setItem(env.USER_NAME, JSON.stringify(user))
    // },
    //
    // getUser (env: any) {
    //     return JSON.parse(localStorage.getItem(env.USER_NAME))
    // },

    logout () {
        localStorage.removeItem(env.USER_NAME)
        localStorage.removeItem(env.TOKEN)
    },

    setToken (token: string) {
        localStorage.setItem(env.TOKEN, token)
    },

    check () {
        return localStorage.getItem(env.TOKEN)
    },

    getToken () {
        return localStorage.getItem(env.TOKEN)
    }
}
