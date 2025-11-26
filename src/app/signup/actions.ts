'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const district = formData.get('district') as string
    const role = formData.get('role') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                role: role,
                district: district,
                phone_number: phone,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Profile creation is now handled by a Postgres Trigger
    // This is more robust as it works even if email confirmation is required

    revalidatePath('/', 'layout')
    redirect('/')
}
