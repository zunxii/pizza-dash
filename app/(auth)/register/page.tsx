'use client'
import React from 'react';
import { useRouter } from 'next/router';
import AuthForm from '@/components/auth/AuthForm';

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const router = useRouter();

  const validateForm = (formData: RegisterData): string | null => {
    // Basic form validation
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      return 'Full name must be at least 2 characters long';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
      return 'Please enter a valid phone number';
    }

    if (!formData.address || formData.address.trim().length < 5) {
      return 'Please enter a valid address';
    }

    if (!formData.password || formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(formData.password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    return null;
  };

  const handleRegister = async (formData: RegisterData) => {
    try {
      // Validate form data
      const validationError = validateForm(formData);
      if (validationError) {
        alert(validationError);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to your backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Show success message
        alert('Account created successfully! Please check your email to verify your account.');
        
        // Redirect to login page
        router.push('/login');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show toast, set error state, etc.)
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };

  const handleToggleToLogin = () => {
    router.push('/login');
  };

  return (
    <AuthForm
      type="register"
      title="Create Account"
      description="Fill in your details to get started"
      onSubmit={handleRegister}
      toggleText="Already have an account?"
      onToggle={handleToggleToLogin}
      showForgotPassword={false}
    />
  );
};

export default Register;