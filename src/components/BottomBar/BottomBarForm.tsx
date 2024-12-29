import { Button } from "antd";
type props = {
    actionOk?: any;
    textOk?: any;
    disableOk?: boolean;
    hideOk?: boolean;
    actionCancel?: any;
    textCancel?: any;
    disableCancel?: boolean,
    hideCancel?: any,
    modal?: boolean,
    width?: number,
}

export default function BottomBarForm({
    actionOk = 'submit',
    textOk = 'Salvar',
    disableOk,
    hideOk,
    actionCancel,
    textCancel = 'Cancelar',
    disableCancel,
    hideCancel,
    modal,
    width
}: props) {

    return (
        <div style={{ width: width ? `${width}vw` : undefined }} className={`
            fixed bottom-0 right-0 flex flex-row items-center justify-between pr-4 h-14 pl-14
            ${modal ? `` : 'w-full bg-primary'}
            `}>

            <div />

            <div className="flex flex-row items-center justify-between gap-4">
                {!hideCancel && <Button
                    onClick={actionCancel}
                    disabled={disableCancel}
                >
                    {textCancel}
                </Button>}

                {!hideOk && <Button
                    onClick={actionOk !== 'submit' ? actionOk : undefined}
                    htmlType={actionOk === 'submit' ? 'submit' : undefined}
                    type="primary"
                    disabled={disableOk}
                >
                    {textOk}
                </Button>}
            </div>
        </div>
    )
}