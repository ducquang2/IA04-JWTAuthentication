import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { token, setToken } = useAuth();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100%-5rem)] flex items-center justify-center bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          <p>Email: {user.username}</p>
          <button onClick={handleLogout} className="btn btn-primary mt-4">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;