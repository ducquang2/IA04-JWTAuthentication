import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from '../components/AuthProvider';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 6 characters').required('Password is required'),
}).required();

interface FormData {
  email: string;
  password: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed');
        setIsSubmitting(false);
        return;
      }
      const result = await response.json();
      setToken(result.access_token);
      localStorage.setItem('token', result.access_token);
      toast.success('Login successful!', {
        autoClose: 3000,
        onClose: () => {
          navigate('/profile');
        },
      });
    } catch (error) {
      toast.error('An unexpected error occurred');
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100%-5rem)] flex items-center justify-center bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <p className="label-text">
                Email
                <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              type="email"
              id="email"
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <p className="label-text-alt text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <p className="label-text">
                Password
                <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              type="password"
              id="password"
              className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <p className="label-text-alt text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary"
            >
              {isSubmitting ? <span className="loading loading-spinner" /> : 'Sign In'}
            </button>
            <div className="divider">OR</div>
            <div className="text-center">
              <Link to="/register" className="link link-primary">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;