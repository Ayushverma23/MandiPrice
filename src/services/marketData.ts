import { createClient } from "@/utils/supabase/client";

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
    description?: string;
}

const MOCK_LISTINGS: Listing[] = [
    { id: 'l1', farmerId: 'user_123', crop: 'Maize (Makka)', quantity: 50, price: 2200, status: 'active', datePosted: '2025-11-24', description: 'High quality maize' },
    { id: 'l2', farmerId: 'user_123', crop: 'Wheat', quantity: 100, price: 2400, status: 'pending', datePosted: '2025-11-25', description: 'Fresh wheat harvest' },
];

export const getMyListings = async (userId: string): Promise<Listing[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('farmer_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching listings:', error);
        return [];
    }

    return data.map((item: any) => ({
        id: item.id,
        farmerId: item.farmer_id,
        crop: item.crop,
        quantity: item.quantity,
        price: item.price_per_quintal,
        status: item.status,
        datePosted: new Date(item.created_at).toISOString().split('T')[0],
        image: item.image_url,
        description: item.description
    }));
};

export const createListing = async (listing: Omit<Listing, 'id' | 'datePosted' | 'status'>): Promise<Listing> => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('listings')
        .insert({
            farmer_id: user.id,
            crop: listing.crop,
            quantity: listing.quantity,
            price_per_quintal: listing.price,
            status: 'active',
            image_url: listing.image,
            description: listing.description
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating listing:', error);
        throw error;
    }

    return {
        id: data.id,
        farmerId: data.farmer_id,
        crop: data.crop,
        quantity: data.quantity,
        price: data.price_per_quintal,
        status: data.status,
        datePosted: new Date(data.created_at).toISOString().split('T')[0],
        image: data.image_url,
        description: data.description
    };
};

export const updateListingStatus = async (listingId: string, status: Listing['status']): Promise<void> => {
    const supabase = createClient();

    const { error } = await supabase
        .from('listings')
        .update({ status })
        .eq('id', listingId);

    if (error) {
        console.error('Error updating listing status:', error);
        throw error;
    }
};

export const getMandiStats = async (): Promise<MandiStats> => {
    return {
        districtsCovered: 38,
        totalMandis: 150,
        activeFarmers: 12000
    }
}

export interface Order {
    id: string;
    farmerId: string;
    buyerName: string;
    crop: string;
    quantity: number;
    price: number; // price per quintal
    totalAmount: number;
    status: 'pending' | 'accepted' | 'rejected' | 'in_transit' | 'completed' | 'cancelled';
    deliveryMethod: 'farmer_delivery' | 'buyer_pickup';
    message?: string; // optional negotiation message
    created_at: string;
}

export const getOrders = async (farmerId: string): Promise<Order[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            listings (
                crop
            ),
            profiles:buyer_id (
                full_name
            )
        `)
        .eq('seller_id', farmerId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }

    return data.map((order: any) => ({
        id: order.id,
        farmerId: order.seller_id,
        buyerName: order.profiles?.full_name || 'Unknown Buyer',
        crop: order.listings?.crop || 'Unknown Crop',
        quantity: order.quantity,
        price: order.price_per_quintal,
        totalAmount: order.total_amount,
        status: order.status,
        deliveryMethod: order.delivery_method,
        created_at: order.created_at
    }));
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
    const supabase = createClient();

    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

    if (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

export const submitNegotiation = async (orderId: string, newPrice: number, message: string): Promise<void> => {
    const supabase = createClient();

    // 1. Get current order details to calculate total amount
    const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('quantity, buyer_id, seller_id')
        .eq('id', orderId)
        .single();

    if (fetchError || !order) {
        throw new Error('Order not found');
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // 2. Create negotiation record
    const { error: negotiationError } = await supabase
        .from('negotiations')
        .insert({
            order_id: orderId,
            sender_id: user.id,
            offered_price: newPrice,
            message: message,
            status: 'pending'
        });

    if (negotiationError) throw negotiationError;

    // 3. Update order with new price and status
    const { error: updateError } = await supabase
        .from('orders')
        .update({
            price_per_quintal: newPrice,
            total_amount: newPrice * order.quantity,
            status: 'pending' // Reset status to pending for the other party to review
        })
        .eq('id', orderId);

    if (updateError) throw updateError;
};

export interface Payment {
    id: string;
    listingId: string;
    amount: number;
    status: 'pending' | 'credited' | 'processing';
    date: string;
    buyerName: string;
}

const MOCK_PAYMENTS: Payment[] = [
    {
        id: 'p1',
        listingId: 'l1',
        amount: 110000,
        status: 'credited',
        date: '2025-11-20',
        buyerName: 'Ravi Traders',
    },
    {
        id: 'p2',
        listingId: 'l2',
        amount: 45000,
        status: 'pending',
        date: '2025-11-24',
        buyerName: 'Bihar Agro Corp',
    },
];

export const getPayments = async (farmerId: string): Promise<Payment[]> => {
    // Simulate async fetch; in a real app filter by farmerId via listing ownership
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PAYMENTS;
};
