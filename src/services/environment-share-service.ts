import Api from "./api";

const p = import.meta.env.VITE_BASE_URL;

class EnvironmentShareService {

    static async get(id?: number,) {
        try {
            const res = await Api.get(p + '/environments/share', {
                params: { id },
            })

            return res;
        } catch (error) {
            throw error;
        }
    }
}

export { EnvironmentShareService }