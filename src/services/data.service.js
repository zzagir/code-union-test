import { $axios, API_URL } from "../api";

export const WORKOUTS = "/workouts";

class DataService {
  async getAll() {
    return $axios.get(API_URL);
  }

  async create(body) {
    return $axios.post(API_URL, body);
  }

  async update(id, body) {
    return $axios.put(`${API_URL}/${id}`, body);
  }

  async delete(id) {
    return $axios.delete(`${API_URL}/${id}`);
  }
}

export default new DataService();
