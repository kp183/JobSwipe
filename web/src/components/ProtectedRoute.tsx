import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export default function ProtectedRoute({ children, requireOnboarding = true }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in, redirect to login
        router.push('/login');
      } else if (requireOnboarding && !user.hasCompletedOnboarding) {
        // Logged in but hasn't completed onboarding
        router.push('/onboarding');
      }
    }
  }, [user, isLoading, router, requireOnboarding]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Checking your authentication status</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or onboarding not complete
  if (!user || (requireOnboarding && !user.hasCompletedOnboarding)) {
    return null;
  }

  return <>{children}</>;
}