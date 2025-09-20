// app/login/page.tsx
'use client';
import Login from '@/components/firebase/Login';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Login />
    </div>
  );
}
