import { ClipboardList, ShieldCheck, Users, Wallet } from "lucide-react";

export default function FarmerGuide() {
    const steps = [
        {
            icon: <ClipboardList className="w-6 h-6 text-earth-green" />,
            title: "1. List Your Produce",
            description: "Click 'New Request' and fill in details about your crop, quantity, and expected price."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
            title: "2. Verification",
            description: "Our team verifies your listing to ensure quality standards. This usually takes 2-4 hours."
        },
        {
            icon: <Users className="w-6 h-6 text-orange-600" />,
            title: "3. Connect with Buyers",
            description: "Once active, buyers can view your produce. You'll get notified when someone shows interest."
        },
        {
            icon: <Wallet className="w-6 h-6 text-purple-600" />,
            title: "4. Receive Payment",
            description: "After the sale is confirmed and produce delivered, payment is securely transferred to your account."
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <h2 className="font-serif font-bold text-xl text-text-ink mb-6">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-start p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                        <div className="p-3 bg-white rounded-lg shadow-sm mb-4">
                            {step.icon}
                        </div>
                        <h3 className="font-bold text-text-ink mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
