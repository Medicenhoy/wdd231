export async function getConsolesData() {
    try {
        const response = await fetch('data/consoles.json');
        if (!response.ok) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}