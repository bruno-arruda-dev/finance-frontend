import { Avatar, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FiUser } from "react-icons/fi";
import { HandleSessionStorage } from '../utils/session-storage';

export default function CustomAvatar() {
    const user = HandleSessionStorage.getUserData()
    const [name, setName] = useState(user?.name);

    function getSlug() {
        const slug = name ? name?.split(' ') : []

        if (slug[1]) return (`${slug[0].split('')[0]}${slug[1].split('')[0]}`).toUpperCase()
        if (slug[0]) return (`${slug[0].split('')[0]}${slug[0].split('')[1]}`).toUpperCase()
        return null
    }

    const slug = getSlug()

    const tooltipTitle = (
        <a href="/user/data">
            Ir para Dados de Usuário
        </a>
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