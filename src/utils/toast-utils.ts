import { toast, ToastOptions, ToastContent } from 'react-toastify';

const toastConfig: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

function createToast(toastType: (content: ToastContent, options?: ToastOptions) => void, message: ToastContent, options: ToastOptions) {
    toastType(message, {
        ...toastConfig,
        ...options,
    });
}

export function toastSuccess(message: string) {
    createToast(toast.success, message, {
        // style: { backgroundColor: '#a9f5a9' }
    });
}

export function toastAlert(message: string) {
    createToast(toast.warning, message, {
        // style: { backgroundColor: '#faf8be' }
    });
}

export function toastInfo(message: string) {
    createToast(toast.info, message, {
        // style: { backgroundColor: '#c7c8fc' }
    });
}

export function toastError(message: string) {
    createToast(toast.error, message, {
        // style: { backgroundColor: '#fccacf' }
    });
}
