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

export const getAllListings = async (): Promise<(Listing & { farmerName: string, district: string, category: string })[]> => {
    const supabase = createClient();

    // 1. Fetch Listings
    const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

    if (listingsError) {
        console.error('Error fetching all listings:', JSON.stringify(listingsError, null, 2));
        return [];
    }

    if (!listings || listings.length === 0) return [];

    // 2. Fetch Profiles
    const farmerIds = Array.from(new Set(listings.map((l: any) => l.farmer_id)));
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, district')
        .in('id', farmerIds);

    if (profilesError) {
        console.error('Error fetching profiles:', JSON.stringify(profilesError, null, 2));
        // Fallback to unknown if profiles fail
    }

    const profilesMap = new Map(profiles?.map((p: any) => [p.id, p]) || []);

    return listings.map((item: any) => {
        const profile = profilesMap.get(item.farmer_id);
        return {
            id: item.id,
            farmerId: item.farmer_id,
            crop: item.crop,
            quantity: item.quantity,
            price: item.price_per_quintal,
            status: item.status,
            datePosted: new Date(item.created_at).toISOString().split('T')[0],
            image: item.image_url,
            description: item.description,
            farmerName: profile?.full_name || 'Unknown Farmer',
            district: profile?.district || 'Unknown District',
            category: 'Vegetables' // Default
        };
    });
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
    farmerName?: string; // Added for buyer view
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

    // 1. Fetch Orders
    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('seller_id', farmerId)
        .order('created_at', { ascending: false });

    if (ordersError) {
        console.error('Error fetching orders:', JSON.stringify(ordersError, null, 2));
        return [];
    }

    if (!orders || orders.length === 0) return [];

    // 2. Fetch Listings and Profiles
    const listingIds = Array.from(new Set(orders.map((o: any) => o.listing_id)));
    const buyerIds = Array.from(new Set(orders.map((o: any) => o.buyer_id)));

    const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('id, crop')
        .in('id', listingIds);

    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', buyerIds);

    const listingsMap = new Map(listings?.map((l: any) => [l.id, l]) || []);
    const profilesMap = new Map(profiles?.map((p: any) => [p.id, p]) || []);

    return orders.map((order: any) => ({
        id: order.id,
        farmerId: order.seller_id,
        buyerName: profilesMap.get(order.buyer_id)?.full_name || 'Unknown Buyer',
        crop: listingsMap.get(order.listing_id)?.crop || 'Unknown Crop',
        quantity: order.quantity,
        price: order.price_per_quintal,
        totalAmount: order.total_amount,
        status: order.status,
        deliveryMethod: order.delivery_method,
        created_at: order.created_at
    }));
};

export const getBuyerOrders = async (buyerId: string): Promise<Order[]> => {
    const supabase = createClient();

    // 1. Fetch Orders
    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('buyer_id', buyerId)
        .order('created_at', { ascending: false });

    if (ordersError) {
        console.error('Error fetching buyer orders:', JSON.stringify(ordersError, null, 2));
        return [];
    }

    if (!orders || orders.length === 0) return [];

    // 2. Fetch Listings and Profiles
    const listingIds = Array.from(new Set(orders.map((o: any) => o.listing_id)));
    const sellerIds = Array.from(new Set(orders.map((o: any) => o.seller_id)));

    const { data: listings, error: listingsError } = await supabase
        .from('listings')
        .select('id, crop')
        .in('id', listingIds);

    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', sellerIds);

    const listingsMap = new Map(listings?.map((l: any) => [l.id, l]) || []);
    const profilesMap = new Map(profiles?.map((p: any) => [p.id, p]) || []);

    return orders.map((order: any) => ({
        id: order.id,
        farmerId: order.seller_id,
        buyerName: 'Me',
        farmerName: profilesMap.get(order.seller_id)?.full_name || 'Unknown Farmer',
        crop: listingsMap.get(order.listing_id)?.crop || 'Unknown Crop',
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

export const initiateNegotiation = async (listingId: string, quantity: number, offerPrice: number, message: string): Promise<void> => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // 1. Get listing details
    const { data: listing, error: listingError } = await supabase
        .from('listings')
        .select('farmer_id')
        .eq('id', listingId)
        .single();

    if (listingError || !listing) throw new Error('Listing not found');

    // 2. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            buyer_id: user.id,
            seller_id: listing.farmer_id,
            listing_id: listingId,
            quantity: quantity,
            price_per_quintal: offerPrice,
            total_amount: offerPrice * quantity,
            status: 'pending',
            delivery_method: 'buyer_pickup' // Default
        })
        .select()
        .single();

    if (orderError) throw orderError;

    // 3. Create Negotiation
    const { error: negotiationError } = await supabase
        .from('negotiations')
        .insert({
            order_id: order.id,
            sender_id: user.id,
            offered_price: offerPrice,
            message: message,
            status: 'pending'
        });

    if (negotiationError) throw negotiationError;
};

export interface Negotiation {
    id: string;
    orderId: string;
    senderId: string;
    senderName: string;
    offeredPrice: number;
    message: string;
    status: string;
    createdAt: string;
}

export const getNegotiations = async (orderId: string): Promise<Negotiation[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('negotiations')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching negotiations:', JSON.stringify(error, null, 2));
        return [];
    }

    if (!data || data.length === 0) return [];

    // Fetch sender names
    const senderIds = Array.from(new Set(data.map((n: any) => n.sender_id)));
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', senderIds);

    const profilesMap = new Map(profiles?.map((p: any) => [p.id, p]) || []);

    return data.map((item: any) => ({
        id: item.id,
        orderId: item.order_id,
        senderId: item.sender_id,
        senderName: profilesMap.get(item.sender_id)?.full_name || 'Unknown User',
        offeredPrice: item.offered_price,
        message: item.message,
        status: item.status,
        createdAt: item.created_at
    }));
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
