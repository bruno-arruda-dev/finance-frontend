import { Tooltip } from "antd";
import { MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";
import { TbTrash, TbTrashOff, TbShare, TbShareOff } from "react-icons/tb";


type props = {
    actionEdit?: any;
    allowedEdit?: boolean;
    actionShare?: any;
    allowedShare?: boolean;
    actionDelete?: any;
    allowedDelete?: boolean;
}

export default function ColumnActions({ actionEdit, allowedEdit = true, actionShare, allowedShare = true, actionDelete, allowedDelete = true }: props) {
    const iconSize = 20;
    const iconEdit = allowedEdit
        ?
        <Tooltip title='Editar'>
            <div onClick={actionEdit} className="p-2 cursor-pointer transform transition duration-200 hover:scale-[1.1] hover:text-highlight rounded-full">
                <MdOutlineEdit size={iconSize} />
            </div>
        </Tooltip>
        :
        <Tooltip title='Sem permissão'>
            <div className="p-2 cursor-not-allowed text-gray-300">
                <MdOutlineEditOff size={iconSize} />
            </div>
        </Tooltip>

    const iconShare = allowedShare
        ?
        <Tooltip title='Compartilhar'>
            <div onClick={actionShare} className="p-2 cursor-pointer transform transition duration-200 hover:scale-[1.1] hover:text-highlight rounded-full">
                <TbShare size={iconSize} />
            </div>
        </Tooltip>
        :
        <Tooltip title='Sem permissão'>
            <div className="p-2 cursor-not-allowed text-gray-300">
                <TbShareOff size={iconSize} />
            </div>
        </Tooltip>

    const iconDelete = allowedDelete
        ?
        <Tooltip title='Apagar'>
            <div onClick={actionDelete} className="p-2 cursor-pointer transform transition duration-200 hover:scale-[1.1] hover:text-highlight rounded-full">
                <TbTrash size={iconSize} />
            </div>
        </Tooltip>
        :
        <Tooltip title='Sem permissão'>
            <div className="p-2 cursor-not-allowed text-gray-300">
                <TbTrashOff size={iconSize} />
            </div>
        </Tooltip>

    return (
        <div className="flex w-full h-full items-center justify-center gap-4">
            {
                actionEdit && iconEdit
            }
            {
                actionShare && iconShare
            }
            {
                actionDelete && iconDelete
            }
        </div>
    )
}