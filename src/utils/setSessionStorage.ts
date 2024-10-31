class SessionStorage {
    static SetUserData(data: any) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('user-data', JSON.stringify(data));
        }
    }

    static DelUserData() {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('user-data');
        }
    }
}

export { SessionStorage };