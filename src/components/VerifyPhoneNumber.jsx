// import React, { useState, useEffect, useRef } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../firebase";
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// const VerifyPhoneNumber = ({ onVerificationSuccess ,isPhoneVerified}) => {
//   const [phone, setPhone] = useState('');
//   const [verificationCode, setVerificationCode] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const recaptchaVerifierRef = useRef(null);

//   const setupRecaptcha = async () => {
//     try {
//       if (!recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
//           size: 'normal',
//           callback: () => setMessage("reCAPTCHA verified successfully"),
//           'expired-callback': () => {
//             setError("reCAPTCHA expired. Please try again.");
//             setupRecaptcha();
//           }
//         });
//         await recaptchaVerifierRef.current.render();
//       }
//     } catch (error) {
//       console.error("Error setting up reCAPTCHA:", error);
//       setError("Failed to initialize verification system. Please refresh the page.");
//     }
//   };

//   useEffect(() => {
//     setupRecaptcha();
//     return () => {
//       if (recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current.clear();
//         recaptchaVerifierRef.current = null;
//       }
//     };
//   }, []);

//   const sendOTP = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       if (!phone) {
//         throw new Error("Please enter a phone number");
//       }

//       if (!recaptchaVerifierRef.current) {
//         await setupRecaptcha();
//       }

//       const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifierRef.current);
//       setConfirmationResult(confirmation);
//       setMessage("OTP sent successfully!");
//     } catch (error) {
//       console.error("Error sending OTP:", error);
      
//       let errorMessage = "Failed to send OTP. ";
      
//       if (error.code === 'auth/invalid-phone-number') {
//         errorMessage += "Please enter a valid phone number with country code (e.g., +1234567890).";
//       } else if (error.code === 'auth/too-many-requests') {
//         errorMessage += "Too many attempts. Please try again later.";
//       } else if (error.code === 'auth/internal-error') {
//         errorMessage += "Please refresh the page and try again.";
//         await setupRecaptcha();
//       } else {
//         errorMessage += "Please try again.";
//       }
      
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOTP = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       if (!verificationCode) {
//         throw new Error("Please enter the verification code");
//       }

//       if (!confirmationResult) {
//         throw new Error("Please send OTP first");
//       }

//       await confirmationResult.confirm(verificationCode);
//       setMessage("Phone number verified successfully!");
      
//       // Call the success callback with the verified phone number
//       onVerificationSuccess(phone);
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setError("Invalid verification code. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-gray-50 py-4">
//       <div className="w-full space-y-4 bg-stone-300 p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-start text-gray-800">
//           Phone Verification
//         </h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
//             {error}
//           </div>
//         )}
        
//         {message && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
//             {message}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <PhoneInput
//               defaultCountry="in"
//               value={phone}
//               onChange={setPhone} 
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Include country code (e.g., +91 for India)
//             </p>
//           </div>
//           {!isPhoneVerified&&<div id="recaptcha-container" className="flex justify-start rounded-lg my-4"></div>}
          
          
//           <button
//             onClick={sendOTP}
//             disabled={loading}
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>

//           {confirmationResult && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Verification Code
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter 6-digit code"
//                   value={verificationCode}
//                   onChange={(e) => setVerificationCode(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md text-black"
//                   disabled={loading}
//                 />
//               </div>

//               <button
//                 onClick={verifyOTP}
//                 disabled={loading}
//                 className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyPhoneNumber;