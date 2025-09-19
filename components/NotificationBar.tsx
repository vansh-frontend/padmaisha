'use client';
import React, { useState, useEffect } from 'react';

const NotificationBar = () => {
  const notifications = [
    "Ramesh Kumar from Ahmedabad placed an order",
    "Priya Sharma from Delhi just booked a service",
    "Arjun Verma from Chandigarh purchased a product",
    "Neha Kapoor from Mumbai confirmed her order",
    "Rohit Mehta from Pune placed an order",
    "Kavya Singh from Lucknow bought a treatment",
    "Aman Jain from Jaipur placed an order",
    "Sneha Patel from Surat booked a service",
    "Mohit Khanna from Bangalore placed an order",
    "Anjali Yadav from Hyderabad purchased a product",
    "Karan Malhotra from Noida confirmed his order",
    "Ritu Sharma from Kolkata booked a service",
    "Aditya Nair from Kochi placed an order",
    "Swati Gupta from Indore purchased a product",
    "Harsh Chawla from Bhopal placed an order",
    "Simran Kaur from Ludhiana booked a treatment",
    "Deepak Reddy from Vizag purchased a product",
    "Tanya Arora from Gurgaon placed an order",
    "Vikas Pandey from Patna booked a service",
    "Meera Joshi from Nagpur placed an order"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-2 px-4 z-40">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center text-sm transition-all duration-300 ${
          isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
        }`}>
          🔔 {notifications[currentIndex]}
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;