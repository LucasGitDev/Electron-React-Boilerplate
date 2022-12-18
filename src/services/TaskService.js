// Use axios
import * as Constants from '../constants/Constants';
import axios from "axios";

const url = Constants.API_URL;

export class TaskService {
    static api = axios.create({
        baseURL: url,
    });

    static async getAll() {
        const response = await this.api.get(`/`);
        return response.data;
    }

    static async getById(id) {
        const response = await this.api.get(`/${id}`);
        return response.data;
    }

    static async create(task) {
        const response = await this.api.post(`/`, task);
        return response.data;
    }

    static async update(task) {
        const response = await this.api.put(`/${task.id}`, task);
        return response.data;
    }

    static async delete(id) {
        const response = await this.api.delete(`/${id}`);
        return response.data;
    }

    static async getByDate(date) {
        const response = await this.api.get(`?date=${date}`).then(response => {
            return response.data;
        });
        return response;
    }
}
