import Api from "./api";

const p = process.env.NEXT_PUBLIC_BASE_URL;

class HealthService {
    static async get() {
        try {
            const res = await Api.get(p + '/health');

            return res;
        } catch (error) {
            throw error;
        }
    }
}

export { HealthService }