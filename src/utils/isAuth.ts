'use client'

type TIsAuth = {
    id: string | null;
    email: string | null;
    token: string | null;
    name: string | null;
}

export function isAuth(): TIsAuth {
    const sessionUserData = sessionStorage.getItem('user-data');

    const userData = {
        id: sessionUserData ? JSON.parse(sessionUserData).id : null,
        email: sessionUserData ? JSON.parse(sessionUserData).email : null,
        token: sessionUserData ? JSON.parse(sessionUserData).token : null,
        name: sessionUserData ? JSON.parse(sessionUserData).name : null,
    }


    return userData;
}