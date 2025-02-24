import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserDetailsForm from "./UserDetailsForm";
import Ticket from "./Ticket";
import { saveAs } from "file-saver";
import PhoneAuth from "./Verify";
import BackgroundPatterns from "./BackgroundPatterns";
import { FaPhoneAlt, FaUserCircle, FaTicketAlt, FaCheckCircle } from 'react-icons/fa';
import { BsCalendarEventFill, BsClockFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

const FormComponent = () => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showTicket, setShowTicket] = useState(false);
  const [step, setStep] = useState(1);



  const handleVerificationSuccess = (phoneNumber) => {
    console.log("Phone Verified:", phoneNumber);
    setIsPhoneVerified(true);
    setUserPhone(phoneNumber);
    setStep(2);
  };
  

  const handleFormSubmit = (formData) => {
    setUserDetails(formData);
    console.log(formData)
    setShowTicket(true);
    setStep(3);
  };

  const handleDownloadTicket = () => {
    const blob = new Blob([JSON.stringify(userDetails, null, 2)], { type: "application/pdf" });
    saveAs(blob, "SwayamwaraSilks_Ticket.pdf");
  };

  const handleShareWhatsApp = () => {
    const message = `🎟️ Swayamwara Silks Event Ticket 🎟️\n\n📞 Phone: ${userPhone}\n👤 Name: ${userDetails?.name}\n📍 Location: ${userDetails?.location}\n📅 Event Countdown: ${countdown}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const steps = [
    { label: "Phone Verification", icon: <FaPhoneAlt className="w-5 h-5" /> },
    { label: "User Details", icon: <FaUserCircle className="w-5 h-5" /> },
    { label: "Ticket", icon: <FaTicketAlt className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 min-h-full relative overflow-hidden">
      <BackgroundPatterns />
      
      <div className=" relative">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          {/* Progress Line */}
          <div className="absolute h-1 bg-pink-200 top-1/2 left-0 right-0 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute h-1 bg-pink-500 top-1/2 left-0 right-0 -translate-y-1/2 z-0" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((s, index) => (
            <div key={index} className="z-10 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center
                ${step > index ? 'bg-pink-500 text-white' : 
                  step === index + 1 ? 'bg-pink-400 text-white' : 'bg-pink-200 text-pink-500'} 
                shadow-lg transition-all duration-300 hover:scale-110`}>
                {s.icon}
              </div>
              <span className={`mt-2 text-xs font-medium
                ${step > index ? 'text-pink-600' : 
                  step === index + 1 ? 'text-pink-500' : 'text-pink-300'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-6 relative">
        {!isPhoneVerified ? (
  <PhoneAuth isPhoneVerified={isPhoneVerified} onVerificationSuccess={handleVerificationSuccess} />
) : !showTicket ? (
  <UserDetailsForm phoneNumber={userPhone} onSubmitSuccess={handleFormSubmit} />
) : (
  <Ticket userDetails={userDetails} phoneNumber={userPhone} />
)}

        </div>

        {/* Event Info Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-center relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-pink-100 rounded-full opacity-50" />
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-pink-100 rounded-full opacity-50" />
          
          <div className="relative space-y-3">
            {/* Event Countdown */}
            <div>
              <h3 className="text-pink-600 text-sm font-medium mb-2 flex items-center justify-center gap-1">
                <BsCalendarEventFill className="w-4 h-4" />
                Event Countdown
              </h3>
              {/* <div className="inline-flex items-center gap-2 bg-pink-50 rounded-full px-4 py-1.5">
                {countdown.split(' ').map((unit, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-lg font-bold text-pink-500">{unit.split('')[0]}</span>
                    <span className="text-xs text-pink-400 ml-0.5 mr-2">{unit.split('')[1]}</span>
                    {index < countdown.split(' ').length - 1 && (
                      <span className="text-pink-300 mr-2">•</span>
                    )}
                  </div>
                ))}
              </div> */}
            </div>

            {/* Event Location */}
            <div className="flex items-center justify-center gap-1.5 text-pink-600">
              <MdLocationOn className="w-4 h-4" />
              <span className="text-sm">Bangalore International Exhibition Centre</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormComponent;