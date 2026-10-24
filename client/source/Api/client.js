const baseUrl = import.meta.env.VITE_API_URL;
        if(!baseUrl){
            console.error("VITE_API_URL is missing!")
        }

export const getHealth = async()=>{
    
    try {
        
        const healthh = await fetch(`${baseUrl}/health`);
        if(!healthh.ok){
            throw new Error(`Request failed:${healthh.status}`)
        }

        const data = await healthh.json();
        return data;
    } catch (error) {
        throw error;
    }
};