const API_BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";

const API = {
    fetchAll: async function() {
        const response = await fetch(`${API_BASE_URL}/issues`);
        const result = await response.json();
        return result.data || result;
    },
    fetchById: async function(id) {
        const response = await fetch(`${API_BASE_URL}/issue/${id}`);
        const result = await response.json();
        return result.data || result;
    }
};