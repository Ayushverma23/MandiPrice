'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sprout } from 'lucide-react'
import { login } from './actions'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        }
        // If successful, the server action will redirect
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper-cream px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-earth-green/10 text-earth-green mb-4">
                        <Sprout className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-text-ink">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Sign in to access your Khet Bazaar account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-earth-green/20 focus:border-earth-green transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-earth-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-earth-green font-medium hover:underline"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    )
}
