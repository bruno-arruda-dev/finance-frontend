import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
    position?: 'fixed' | 'absolute' | 'static';
    direction?: 'right' | 'left' | 'top' | 'bottom';
    size?: 'small' | 'medium' | 'large';
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    onClick?: () => void;
};

export default function CollapseButton({ position = 'absolute', direction = 'right', size = 'medium', top, right, bottom, left, onClick }: Props) {
    const sizeClass = size === 'small' ? 'w-5 h-5' : size === 'medium' ? 'w-7 h-7' : 'w-11 h-11';

    function setChevron() {
        switch (direction) {
            case 'left':
                return <FaChevronLeft />;
            case 'right':
                return <FaChevronRight />;
            case 'top':
                return <FaChevronUp />;
            case 'bottom':
                return <FaChevronDown />;
            default:
                return <FaChevronRight />
        }

    }


    const style = {
        top: top !== undefined ? `${top}px` : undefined,
        right: right !== undefined ? `${right}px` : undefined,
        bottom: bottom !== undefined ? `${bottom}px` : undefined,
        left: left !== undefined ? `${left}px` : undefined,
    };

    return (
        <div
            className={`
                bg-white cursor-pointer rounded-full flex items-center justify-center border-2 border-black
                ${sizeClass} 
                ${position}`}
            style={style}
            onClick={onClick}
        >
            {setChevron()}
        </div>
    );
}
