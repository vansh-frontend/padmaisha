'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Users, DollarSign, ShoppingBag, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const AdminPage = () => {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock admin data
  const mockUsers = [
    { id: '1', name: 'Rajesh Retailers', email: 'rajesh@example.com', phone: '+91 9876543210', gst: '22AAAAA0000A1Z5', address: 'Mumbai, Maharashtra', status: 'Active', orders: 15, totalSpent: 45000 },
    { id: '2', name: 'Fashion Hub', email: 'fashionhub@example.com', phone: '+91 9876543211', gst: '27BBBBB0000B2Y4', address: 'Delhi, India', status: 'Active', orders: 8, totalSpent: 32000 },
    { id: '3', name: 'Style World', email: 'styleworld@example.com', phone: '+91 9876543212', gst: '29CCCCC0000C3X3', address: 'Bangalore, Karnataka', status: 'Pending', orders: 3, totalSpent: 12000 },
  ];

  const mockStats = {
    totalUsers: mockUsers.length + 22,
    activeUsers: mockUsers.filter(u => u.status === 'Active').length + 20,
    totalRevenue: mockUsers.reduce((sum, user) => sum + user.totalSpent, 0) + 156000,
    totalOrders: mockUsers.reduce((sum, user) => sum + user.orders, 0) + 150,
    pendingVerifications: mockUsers.filter(u => u.status === 'Pending').length,
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check credentials
    if (loginForm.email === 'padmaisha2025@gmail.com' && loginForm.password === 'yash@2025') {
      dispatch({ type: 'SET_ADMIN_LOGIN', payload: true });
      toast.success('Admin login successful');
    } else {
      toast.error('Invalid credentials');
    }
    
    setLoading(false);
  };

  if (!state.isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-gray-600">Access the Padmaisha admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-primary ripple"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: padmaisha2025@gmail.com</p>
              <p>Password: yash@2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button
              onClick={() => {
                dispatch({ type: 'SET_ADMIN_LOGIN', payload: false });
                router.push('/');
              }}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold">{mockStats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold">{mockStats.activeUsers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold">₹{(mockStats.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Verifications</p>
                  <p className="text-3xl font-bold">{mockStats.pendingVerifications}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Retailer</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">GST & Location</th>
                    <th className="text-left py-3 px-4">Orders</th>
                    <th className="text-left py-3 px-4">Total Spent</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{user.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>GST: {user.gst}</div>
                          <div className="text-gray-600">{user.address}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium">{user.orders}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium">₹{user.totalSpent.toLocaleString()}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={user.status === 'Active' ? 'default' : 'secondary'}
                          className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Quick Stats</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Average Order Value:</span>
                  <span className="ml-2 font-medium">₹{(mockStats.totalRevenue / mockStats.totalOrders).toFixed(0)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Orders per User:</span>
                  <span className="ml-2 font-medium">{(mockStats.totalOrders / mockStats.totalUsers).toFixed(1)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Revenue Growth:</span>
                  <span className="ml-2 font-medium text-green-600">+23% this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;