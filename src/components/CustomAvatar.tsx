import { Avatar, Tooltip } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiUser } from "react-icons/fi";

export default function CustomAvatar() {
    const sessionUserData = typeof window != 'undefined' ? sessionStorage.getItem('user-data') : null;
    const user = sessionUserData ? JSON.parse(sessionUserData) : null
    const [name, setName] = useState(user?.name);

    function getSlug() {
        const slug = name ? name?.split(' ') : []

        if (slug[1]) return (`${slug[0].split('')[0]}${slug[1].split('')[0]}`).toUpperCase()
        if (slug[0]) return (`${slug[0].split('')[0]}${slug[0].split('')[1]}`).toUpperCase()
        return null
    }

    const slug = getSlug()

    const tooltipTitle = (
        <Link href="/user/data">
            Ir para Dados de Usuário
        </Link>
    )

    useEffect(() => {
        const newName = user?.name
        if (name) setName(newName)
    }, [user])

    return !name ? <Avatar icon={<FiUser />} />
        : <Tooltip title={tooltipTitle} placement='bottomLeft' mouseLeaveDelay={2}>

            <Avatar style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{slug}</Avatar>
        </Tooltip>
}