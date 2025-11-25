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
    { id: '7', mandiName: 'Gaya Mandi', district: 'Gaya', crop: 'Rice', price: 2800, trend: 'down', lastUpdated: '45 mins ago' },
    { id: '8', mandiName: 'Bhagalpur Mandi', district: 'Bhagalpur', crop: 'Silk Cocoon', price: 45000, trend: 'up', lastUpdated: '3 hours ago' },
    { id: '9', mandiName: 'Darbhanga Mandi', district: 'Darbhanga', crop: 'Makhana', price: 12000, trend: 'stable', lastUpdated: '20 mins ago' },
    { id: '10', mandiName: 'Ara Mandi', district: 'Bhojpur', crop: 'Paddy', price: 2050, trend: 'up', lastUpdated: '1.5 hours ago' },
    { id: '11', mandiName: 'Chhapra Mandi', district: 'Saran', crop: 'Sugar Cane', price: 340, trend: 'stable', lastUpdated: '4 hours ago' },
    { id: '12', mandiName: 'Motihari Mandi', district: 'East Champaran', crop: 'Turmeric', price: 6500, trend: 'down', lastUpdated: '5 hours ago' },
    { id: '13', mandiName: 'Munger Mandi', district: 'Munger', crop: 'Pulses', price: 7800, trend: 'up', lastUpdated: '1 hour ago' },
    { id: '14', mandiName: 'Kishanganj Mandi', district: 'Kishanganj', crop: 'Tea', price: 15000, trend: 'stable', lastUpdated: '2 hours ago' },
    { id: '15', mandiName: 'Sasaram Mandi', district: 'Rohtas', crop: 'Rice', price: 2900, trend: 'up', lastUpdated: '30 mins ago' },
];

export const getLivePrices = async (): Promise<MarketUpdate[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_DATA;
};

export const getAllMandis = async (): Promise<MarketUpdate[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_DATA;
};

export const getDistricts = async (): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const districts = new Set(MOCK_DATA.map(item => item.district));
    return Array.from(districts).sort();
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

export interface Listing {
    id: string;
    farmerId: string;
    crop: string;
    quantity: number; // in Quintals
    price: number; // Expected price per quintal
    status: 'active' | 'sold' | 'pending';
    datePosted: string;
    image?: string;
}

const MOCK_LISTINGS: Listing[] = [
    { id: 'l1', farmerId: 'user_123', crop: 'Maize (Makka)', quantity: 50, price: 2200, status: 'active', datePosted: '2025-11-24' },
    { id: 'l2', farmerId: 'user_123', crop: 'Wheat', quantity: 100, price: 2400, status: 'pending', datePosted: '2025-11-25' },
];

export const getMyListings = async (userId: string): Promise<Listing[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    // In a real app, filter by userId. For mock, return all mock listings if they match a pattern or just return all for demo.
    return MOCK_LISTINGS;
};

export const createListing = async (listing: Omit<Listing, 'id' | 'datePosted' | 'status'>): Promise<Listing> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newListing: Listing = {
        id: 'l' + Math.random().toString(36).substr(2, 9),
        ...listing,
        status: 'active',
        datePosted: new Date().toISOString().split('T')[0]
    };
    MOCK_LISTINGS.unshift(newListing);
    return newListing;
};

export const getMandiStats = async (): Promise<MandiStats> => {
    return {
        districtsCovered: 38,
        totalMandis: 150,
        activeFarmers: 12000
    }
}
