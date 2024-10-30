class SessionStorage {
    static SetUserData(data: any) {
        sessionStorage.setItem('user-data', JSON.stringify(data));
    }

    static DelUserData() {
        sessionStorage.removeItem('user-data');
    }
}

export { SessionStorage }