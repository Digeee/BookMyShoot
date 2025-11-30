import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch profile data
        const profileRes = await fetch(`/api/v1/profiles/${id}`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        // Fetch services
        const servicesRes = await fetch(`/api/v1/services?pro_id=${id}`);
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        // Fetch portfolio
        const portfolioRes = await fetch(`/api/v1/portfolio?pro_id=${id}`);
        if (portfolioRes.ok) {
          const portfolioData = await portfolioRes.json();
          setPortfolio(portfolioData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
          <p className="mt-2 text-gray-600">The profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li><a href="/" className="text-indigo-600 hover:underline">Home</a></li>
          <li className="text-gray-400">/</li>
          <li><a href="/search" className="text-indigo-600 hover:underline">Find Professionals</a></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600">{profile.business_name}</li>
        </ol>
      </nav>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-4 md:mb-0 md:mr-6" />
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.business_name}</h1>
                  <p className="text-gray-600 mt-1">{profile.location_city}, {profile.location_area}</p>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {profile.avg_rating} ({profile.portfolio_count} reviews)
                    </span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.languages && profile.languages.split(',').map((lang, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Contact Professional
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">About</h2>
                <p className="text-gray-600 mt-2">{profile.bio || 'No bio available.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Services Offered</h2>
        </div>
        
        {services.length > 0 ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{service.category}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">LKR {service.base_price.toLocaleString()}</span>
                  </div>
                  
                  <p className="mt-3 text-gray-600 text-sm">{service.description}</p>
                  
                  <div className="mt-4">
                    <a 
                      href={`/services/${service.id}`} 
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-gray-600">No services available.</p>
          </div>
        )}
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Portfolio ({portfolio.length})</h2>
        </div>
        
        {portfolio.length > 0 ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <div key={item.id} className="aspect-square bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <span className="text-gray-500">Image</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-gray-600">No portfolio items available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;