import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Users, Crown } from 'lucide-react';

// interface UserDetailsFormProps {
//   phoneNumber: string;
//   onSubmitSuccess: (formData: any) => void;
// }

const UserDetailsForm = ({ phoneNumber, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    age: '',
    location: '',
    preferredDate: '',
    seatCategory: '',
    userPhone:phoneNumber
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const completeFormData = {
      ...formData,
      phoneNumber, // Include the phone number if needed
    };
  console.log(completeFormData)
    onSubmitSuccess(completeFormData);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name :
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full pl-10 px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
              Sex :
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="block w-full pl-10 px-4 py-3 rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age :
            </label>
            <div className="relative">
              <div className="absolute inset-y-0  left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                // required
                min="0"
                max="120"
                className="block w-full pl-10 px-4 py-3  text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
          </div>
        </div>

        {/* <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div> */}

        <div>
          <label htmlFor="seatCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Seat Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Crown className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="seatCategory"
              name="seatCategory"
              value={formData.seatCategory}
              onChange={handleChange}
              required
              className="block w-full pl-10 px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select seat category</option>
              <option value="general">General</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Visit Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="preferredDate"
              id="preferredDate"
              required
              className="block w-full pl-10 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.preferredDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Complete Registration
      </button>
    </motion.form>
  );
};

export default UserDetailsForm;