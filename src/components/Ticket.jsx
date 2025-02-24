// "use client";
// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import { FaUser, FaPhone, FaVenusMars, FaHashtag, FaChair, FaDownload, FaWhatsapp } from "react-icons/fa";
// import bg from "../../public/tickets.png";

// const Ticket = ({ userDetails = {}, phoneNumber = "" }) => {
//   const ticketRef = useRef(null);

//   const captureTicket = () => {
//     if (ticketRef.current) {
//       html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.href = imgData;
//         link.download = "event-ticket.png";
//         link.click();
//       });
//     }
//   };

//   const shareOnWhatsApp = () => {
//     const message = encodeURIComponent(
//       `🎟️ *Tech Conference 2024*\n\n` +
//         `👤 *Name:* ${userDetails.name || "N/A"}\n` +
//         `📱 *Phone:* ${phoneNumber || "N/A"}\n` +
//         `👥 *Gender:* ${userDetails.sex || "N/A"}\n` +
//         `🔢 *Age:* ${userDetails.age || "N/A"}\n` +
//         `🪑 *Seat Category:* ${userDetails.seatCategory || "N/A"}\n\n` +
//         `🔗 *Event Link:* https://www.swayamvarasilks.com/`
//     );

//     const whatsappURL = `https://wa.me/918086229572?text=${message}`;
//     window.open(whatsappURL, "_blank");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6 ">
//       {/* Ticket Container */}
//       <div
//         ref={ticketRef}
//         className="relative w-[550px] h-[320px] rounded-xl overflow-hidden shadow-lg border-2 border-gray-800 bg-black"
//       >
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{ backgroundImage: `url(${bg.src})` }}
//         />
//         {/* Overlay for Readability */}
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//         {/* Ticket Content */}
//         <div className="relative z-10 p-6  text-white">
//           <h2 className="text-xl w-fit p-2 font-bold text-center bg-pink-600 ">
//             New Branch Opening Event{" "}
//             <span className="bg-white px-3 py-1 rounded-lg text-black font-bold">
//               Pass
//             </span>
//           </h2>

//           <div className="mt-4 space-y-2 text-sm">
//             <p className="flex items-center gap-2">
//               <FaUser className="text-yellow-400" />
//               <span className="font-semibold">Name:</span>{" "}
//               <span className="text-lg font-bold">{userDetails.name || "N/A"}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               <FaVenusMars className="text-pink-400" />
//               <span className="font-semibold">Gender:</span> {userDetails.sex || "N/A"}
//             </p>
//             <p className="flex items-center gap-2">
//               <FaPhone className="text-green-400" />
//               <span className="font-semibold">Phone:</span> {phoneNumber || "N/A"}
//             </p>
//             <p className="flex items-center gap-2">
//               <FaHashtag className="text-blue-400" />
//               <span className="font-semibold">Age:</span> {userDetails.age || "N/A"}
//             </p>
//             <p className="flex items-center gap-2">
//               <FaChair className="text-purple-400" />
//               <span className="font-semibold">Seat Category:</span>{" "}
//               {userDetails.seatCategory || "N/A"}
//             </p>
//           </div>

//           <p className="text-center text-xs text-gray-300 mt-4">
//             🎫 Scan this QR code at the entrance
//           </p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex flex-wrap justify-center gap-4">
//         <button
//           onClick={captureTicket}
//           className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-purple-500"
//         >
//           <FaDownload />
//           Download Ticket
//         </button>

//         <button
//           onClick={shareOnWhatsApp}
//           className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300 transform hover:shadow-green-500"
//         >
//           <FaWhatsapp />
//           Share on WhatsApp
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Ticket;
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { User, Phone, Calendar as GenderMale, Hash, Armchair, Download, Share2, MapPin, Calendar, Clock, Ticket as TicketIcon } from 'lucide-react';

function Ticket() {
  const ticketRef = useRef(null);
  const userDetails = {
    name: "Sarah Johnson",
    sex: "Female",
    age: "28",
    seatCategory: "VIP"
  };
  const phoneNumber = "+1 (555) 123-4567";

  const captureTicket = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "event-ticket.png";
        link.click();
      });
    }
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `🎟️ *Grand Opening Celebration*\n\n` +
      `👤 *Name:* ${userDetails.name}\n` +
      `📱 *Phone:* ${phoneNumber}\n` +
      `👥 *Gender:* ${userDetails.sex}\n` +
      `🔢 *Age:* ${userDetails.age}\n` +
      `🪑 *Seat Category:* ${userDetails.seatCategory}\n\n` +
      `📍 Join us for an unforgettable evening!`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-fit bg-gradient-to-br   flex flex-col justify-center items-center ">
      {/* Ticket Container */}
      <div
        ref={ticketRef}
        className="w-[400px] bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Header Section */}
        <div className="relative h-40 bg-cover bg-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1606743776248-a4e5ea3665c8?q=80&w=1200" 
            alt="Event Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-pink-800/90 backdrop-blur-sm"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
                <TicketIcon className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-medium text-white uppercase tracking-wider">Premium Pass</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Grand Opening Celebration</h1>
              <div className="flex gap-4 text-white/90">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">March 25, 2024</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">6:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs">Main Showroom</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <User className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Name</p>
                  <p className="text-sm font-semibold text-gray-900">{userDetails.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <p className="text-sm font-semibold text-gray-900">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <GenderMale className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Gender</p>
                  <p className="text-sm font-semibold text-gray-900">{userDetails.sex}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Hash className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Age</p>
                  <p className="text-sm font-semibold text-gray-900">{userDetails.age}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <Armchair className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Seat Category</p>
                  <p className="text-sm font-semibold text-gray-900">{userDetails.seatCategory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="mt-6 bg-gradient-to-r from-pink-500 to-pink-400 rounded-xl overflow-hidden">
            <div className="p-4 text-white">
              <h3 className="text-sm font-semibold mb-1">Exclusive Preview</h3>
              <p className="text-xs text-white/90">
                Be among the first to experience our curated collection of premium textiles and traditional wear.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-pink-50 p-3 border-t border-pink-100">
          <p className="text-center text-xs text-pink-500">
            #GrandOpening2024 • www.example.com
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex gap-3">
        <button
          onClick={captureTicket}
          className="flex items-center gap-2 bg-pink-500 border border-pink-700 backdrop-blur-md text-white px-5 py-2.5 rounded-lg hover:bg-pink-600 transition duration-300 text-sm font-medium"
          >
          <Download className="w-4 h-4" />
          Download Ticket
        </button>

        <button
          onClick={shareOnWhatsApp}
          className="flex items-center gap-2 bg-white text-pink-500 px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          Share Ticket
        </button>
      </div>
    </div>
  );
}

export default Ticket;