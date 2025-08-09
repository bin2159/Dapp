import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

export function useRoleGuard(allowedRoles = []) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace('/unauthorized')
    }
  }, [user])
}
