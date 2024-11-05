import { Avatar, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FiUser } from "react-icons/fi";
import { useUser } from '../context/UserContext';

export default function CustomAvatar() {
    const { user } = useUser();
    const [slug, setSlug] = useState(getSlug());

    function getSlug() {
        const slug = user?.name ? user.name?.split(' ') : []

        if (slug[1]) return (`${slug[0].split('')[0]}${slug[1].split('')[0]}`).toUpperCase()
        if (slug[0]) return (`${slug[0].split('')[0]}${slug[0].split('')[1]}`).toUpperCase()
        return null
    }

    const tooltipTitle = (
        <a href="/user/data">
            Ir para Dados de Usuário
        </a>
    )

    useEffect(() => {
        setSlug(getSlug)
    }, [user])

    return !user?.name ? <Avatar icon={<FiUser />} />
        : <Tooltip title={tooltipTitle} placement='bottomLeft' mouseLeaveDelay={2}>

            <Avatar style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{slug}</Avatar>
        </Tooltip>
}