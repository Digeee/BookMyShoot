import React, { useState, useEffect } from 'react';

const ProDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/v1/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleAcceptBooking = async (bookingId) => {
    try {
      const res = await fetch(`/api/v1/bookings/${bookingId}/accept`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        // Update the booking status in state
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? {...booking, status: 'confirmed'} : booking
        ));
        alert('Booking accepted successfully!');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to accept booking');
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking. Please try again.');
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      const res = await fetch(`/api/v1/bookings/${bookingId}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        // Update the booking status in state
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? {...booking, status: 'rejected'} : booking
        ));
        alert('Booking rejected successfully!');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to reject booking');
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Failed to reject booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Professional Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm font-medium">Total Bookings</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">24</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm font-medium">Pending Requests</div>
          <div className="text-3xl font-bold text-yellow-600 mt-2">5</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm font-medium">This Month Earnings</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">LKR 125,000</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm font-medium">Average Rating</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">4.8</div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'availability'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Availability
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'portfolio'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Portfolio
          </button>
        </nav>
      </div>
      
      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Client Name</div>
                      <div className="text-sm text-gray-500">client@example.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Wedding Photography</div>
                      <div className="text-sm text-gray-500">Basic Package</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(booking.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{booking.start_time} - {booking.end_time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      LKR {booking.total_price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {booking.status === 'pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAcceptBooking(booking.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectBooking(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Manage Availability</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Add Availability
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">June 15, 2025</h3>
                    <p className="text-gray-600 text-sm">9:00 AM - 5:00 PM</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-900">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Add Media
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                <span className="text-gray-500">Image {item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProDashboard;