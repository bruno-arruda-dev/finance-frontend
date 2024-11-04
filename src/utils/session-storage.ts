class HandleSessionStorage {
    static setUserData(data: any) {
        return sessionStorage.setItem('user-data', JSON.stringify(data))
    }

    static getUserData() {
        return JSON.parse(sessionStorage.getItem('user-data')!)
    }

    static deleteUserData() {
        return sessionStorage.removeItem('user-data')
    }
}

export { HandleSessionStorage }