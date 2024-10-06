import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type props = {
    avatarImage?: string;
}

export default function CustomAvatar({ avatarImage }: props) {
    return (
        <Avatar>
            {avatarImage &&
                <AvatarImage src={avatarImage} />
            }
            <AvatarFallback>BA</AvatarFallback>
        </Avatar>
    )
}