import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/services/${id}`);
        const data = await res.json();
        setService(data);
        if (data.packages && data.packages.length > 0) {
          setSelectedPackage(data.packages[0]);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Service not found</h2>
          <p className="mt-2 text-gray-600">The service you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    try {
      const res = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          service_id: service.id,
          package_id: selectedPackage?.id,
          date: selectedDate,
          start_time: '09:00:00',
          end_time: '17:00:00'
        })
      });

      if (res.ok) {
        alert('Booking request sent successfully!');
        setShowBookingModal(false);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li><a href="/" className="text-indigo-600 hover:underline">Home</a></li>
          <li className="text-gray-400">/</li>
          <li><a href="/search" className="text-indigo-600 hover:underline">Find Professionals</a></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-600">{service.title}</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
              <p className="text-gray-600 mt-2">{service.category}</p>
              
              <div className="mt-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(24 reviews)</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About this service</h2>
          <p className="text-gray-600">{service.description}</p>
        </div>

        {/* Packages */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Packages</h2>
          
          {service.packages && service.packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    selectedPackage?.id === pkg.id 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{pkg.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{pkg.details}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">LKR {pkg.price.toLocaleString()}</span>
                  </div>
                  {pkg.hours && (
                    <p className="mt-2 text-sm text-gray-500">{pkg.hours} hours</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No packages available for this service.</p>
          )}
        </div>

        {/* Booking Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Book this service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleBooking}
                disabled={!selectedDate}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Request Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Booking</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{service.title}</span>
              </div>
              
              {selectedPackage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{selectedPackage.name}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-lg">
                  LKR {(selectedPackage?.price || service.base_price).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;