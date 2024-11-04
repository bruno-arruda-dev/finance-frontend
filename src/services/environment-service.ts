import { toastError } from "../utils/toast-utils";
import Api from "./api";

const p = import.meta.env.VITE_BASE_URL;

class EnvironmentService {
    static async get(id?: number,) {
        try {
            const res = await Api.get(p + '/environments', {
                params: { id },
            })

            return res;
        } catch (error) {
            throw error;
        }
    }

    static async post(data: any,) {
        try {
            const res = await Api.post(p + '/environments', data, {
            })
            return res
        } catch (error: any) {
            toastError(error.response.data.message)
            throw error;
        }
    }

    static async put(data: any,) {
        try {
            const res = await Api.put(p + '/environments', data, {
            })
            return res
        } catch (error: any) {
            toastError(error.response.data.message)
            throw error;
        }
    }

    static async delete(id: number,) {
        try {
            const res = await Api.delete(p + '/environments', {
                data: { id },
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

}

export { EnvironmentService };
