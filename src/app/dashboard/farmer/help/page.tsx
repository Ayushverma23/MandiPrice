"use client";

import { useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import FarmerGuide from "@/components/organisms/FarmerGuide";
import { Send, AlertCircle } from "lucide-react";

export default function HelpPage() {
    const [formData, setFormData] = useState({
        subject: "payment",
        priority: "medium",
        description: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ subject: "payment", priority: "medium", description: "" });
        }, 1000);
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-text-ink">Help & Support</h1>
                <p className="text-gray-500">Guides and direct support for your queries.</p>
            </div>

            {/* How it Works Guide */}
            <FarmerGuide />

            {/* Issue Submission Form */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-serif font-bold text-xl text-text-ink">Report an Issue</h2>
                        <p className="text-sm text-gray-500">Facing a problem? Let us know and we&apos;ll fix it.</p>
                    </div>
                </div>

                {submitted ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center">
                        <p className="font-medium">Thank you! Your issue has been reported.</p>
                        <p className="text-sm mt-1">Ticket ID: #KB-{Math.floor(Math.random() * 10000)}</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mt-4 text-sm text-green-700 underline hover:text-green-800"
                        >
                            Report another issue
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                >
                                    <option value="payment">Payment Issue</option>
                                    <option value="technical">Technical Glitch</option>
                                    <option value="account">Account/Profile</option>
                                    <option value="listing">Listing Problem</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                                >
                                    <option value="low">Low - General Query</option>
                                    <option value="medium">Medium - Needs Attention</option>
                                    <option value="high">High - Urgent Blockage</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Please describe your issue in detail..."
                                className="w-full rounded-lg border-gray-300 focus:border-earth-green focus:ring-earth-green"
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2.5 bg-earth-green text-white rounded-lg hover:bg-earth-green/90 transition-colors font-medium"
                        >
                            <Send className="w-4 h-4" />
                            Submit Ticket
                        </button>
                    </form>
                )}
            </div>
        </DashboardLayout>
    );
}
