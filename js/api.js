const API_BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";

const API = {
    // Fetch all issues (used for "All", "Open", and "Closed" tabs)
    fetchAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/issues`);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            return data.data; // The API returns an object with a 'data' array
        } catch (error) {
            console.error("Fetch All Error:", error);
            return [];
        }
    },

    
    search: async (query) => {
        try {
            const response = await fetch(`${API_BASE_URL}/issues/search?q=${query}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Search Error:", error);
            return [];
        }
    }
};