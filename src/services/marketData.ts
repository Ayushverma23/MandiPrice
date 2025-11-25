export interface MarketUpdate {
    id: string;
    mandiName: string;
    district: string;
    crop: string;
    price: number; // Price per quintal
    trend: 'up' | 'down' | 'stable';
    lastUpdated: string;
}

export interface MandiStats {
    districtsCovered: number;
    totalMandis: number;
    activeFarmers: number;
}

const MOCK_DATA: MarketUpdate[] = [
    { id: '1', mandiName: 'Gulabbagh Mandi', district: 'Purnia', crop: 'Maize (Makka)', price: 2150, trend: 'up', lastUpdated: '10 mins ago' },
    { id: '2', mandiName: 'Muzaffarpur Bazar Samiti', district: 'Muzaffarpur', crop: 'Litchi', price: 8500, trend: 'stable', lastUpdated: '15 mins ago' },
    { id: '3', mandiName: 'Patna Fruit Market', district: 'Patna', crop: 'Mango (Maldah)', price: 6200, trend: 'down', lastUpdated: '5 mins ago' },
    { id: '4', mandiName: 'Samastipur Mandi', district: 'Samastipur', crop: 'Potato', price: 1200, trend: 'up', lastUpdated: '1 hour ago' },
    { id: '5', mandiName: 'Begusarai Mandi', district: 'Begusarai', crop: 'Wheat', price: 2300, trend: 'stable', lastUpdated: '30 mins ago' },
    { id: '6', mandiName: 'Hajipur Mandi', district: 'Vaishali', crop: 'Banana', price: 1800, trend: 'up', lastUpdated: '2 hours ago' },
];

export const getLivePrices = async (): Promise<MarketUpdate[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_DATA;
};

export const searchCrops = async (query: string): Promise<MarketUpdate[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return MOCK_DATA.filter(
        (item) =>
            item.crop.toLowerCase().includes(lowerQuery) ||
            item.mandiName.toLowerCase().includes(lowerQuery) ||
            item.district.toLowerCase().includes(lowerQuery)
    );
};

export const getMandiStats = async (): Promise<MandiStats> => {
    return {
        districtsCovered: 38,
        totalMandis: 150,
        activeFarmers: 12000
    }
}
