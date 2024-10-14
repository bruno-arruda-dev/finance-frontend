import { isAuth } from '@/app/utils/isAuth';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { FiUser } from "react-icons/fi";

export default function CustomAvatar() {
    const [name, setName] = useState(isAuth().name);

    function getSlug() {
        const slug = name ? name?.split(' ') : []

        if (slug[1]) return (`${slug[0].split('')[0]}${slug[1].split('')[0]}`).toUpperCase()
        if (slug[0]) return (`${slug[0].split('')[0]}${slug[0].split('')[1]}`).toUpperCase()
        return null
    }

    const slug = getSlug()

    console.log(slug)

    useEffect(() => {
        const newName = isAuth().name
        if (name) setName(newName)
    }, [isAuth()])

    return !name ? <Avatar icon={<FiUser />} /> : <Avatar style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{slug}</Avatar>
}