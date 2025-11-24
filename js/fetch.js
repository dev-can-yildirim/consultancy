export async function fetchData() {
    try {
        const response = await fetch('./db.json');
        if (!response.ok) {
            throw new Error('Veri çekilemedi');
        }
        const data = await response.json();
        return data.pricing; 
    } catch (error) {
        console.error('Fetch hatası:', error);
    }
}