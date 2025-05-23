'use client'
import React from 'react';
import { useRouter } from 'next/router';
import AuthForm from '@/components/auth/AuthForm';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (formData: LoginData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store authentication token (you might use cookies or localStorage in a real app)
        // localStorage.setItem('authToken', data.token);
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show toast, set error state, etc.)
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const handleToggleToRegister = () => {
    router.push('/register');
  };

  return (
    <AuthForm
      type="login"
      title="Sign In"
      description="Enter your credentials to access your dashboard"
      onSubmit={handleLogin}
      toggleText="Don't have an account?"
      onToggle={handleToggleToRegister}
      showForgotPassword={true}
    />
  );
};

export default Login;