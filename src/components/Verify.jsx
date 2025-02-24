import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAv5eb6I1AEY_UfX1S8r2IVOWJD0sIVFXo",
  authDomain: "swayamvara-ticket-generator.firebaseapp.com",
  projectId: "swayamvara-ticket-generator",
  storageBucket: "swayamvara-ticket-generator.firebasestorage.app",
  messagingSenderId: "586038179958",
  appId: "1:586038179958:web:195e1f3393364472c28757",
  measurementId: "G-QWX9RVZ9L8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneAuth = ({ onVerificationSuccess, isPhoneVerified }) => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const otpRefs = useRef([]);
  const recaptchaContainerRef = useRef(null);
  const recaptchaInitTimeout = useRef(null);
  const resendTimerRef = useRef(null);
  const [resendCounter, setResendCounter] = useState(0);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (recaptchaInitTimeout.current) {
        clearTimeout(recaptchaInitTimeout.current);
      }
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, []);

  const initializeRecaptcha = () => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !recaptchaContainerRef.current) {
        reject(new Error('Window or container not available'));
        return;
      }

      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'normal',
            callback: () => {
              setRecaptchaInitialized(true);
              setError("");
              resolve();
            },
            'expired-callback': () => {
              setRecaptchaInitialized(false);
              setError("reCAPTCHA expired. Please refresh the page.");
              resetRecaptcha();
              reject(new Error('reCAPTCHA expired'));
            }
          });
        }

        recaptchaInitTimeout.current = setTimeout(() => {
          reject(new Error('reCAPTCHA initialization timeout'));
        }, 10000);

        window.recaptchaVerifier.render()
          .then(() => {
            clearTimeout(recaptchaInitTimeout.current);
            resolve();
          })
          .catch((error) => {
            clearTimeout(recaptchaInitTimeout.current);
            reject(error);
          });

      } catch (error) {
        clearTimeout(recaptchaInitTimeout.current);
        reject(error);
      }
    });
  };

  const resetRecaptcha = async () => {
    if (window.recaptchaVerifier) {
      try {
        await window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
        setRecaptchaInitialized(false);
        await initializeRecaptcha();
      } catch (error) {
        console.error("Error resetting reCAPTCHA:", error);
        setError("Failed to reset reCAPTCHA. Please refresh the page.");
      }
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const setupInitialRecaptcha = async () => {
      try {
        await initializeRecaptcha();
      } catch (error) {
        console.error("Initial reCAPTCHA setup failed:", error);
        setError("Failed to initialize verification. Please refresh the page.");
      }
    };

    setupInitialRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, [isClient]);

  // const startResendTimer = () => {
  //   setResendCounter(30);
  //   resendTimerRef.current = setInterval(() => {
  //     setResendCounter((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(resendTimerRef.current);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // };


  const startResendTimer = () => {
    setResendCounter(30); // Reset counter to 30 seconds
    resendTimerRef.current = setInterval(() => {
      setResendCounter((prev) => {
        if (prev <= 1) {
          clearInterval(resendTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: async (data) => {
      if (data.phone.length < 10) {
        setError("Please enter a valid phone number");
        return;
      }

      setLoading(true);
      setError("");

      try {
        if (!recaptchaInitialized) {
          await initializeRecaptcha();
        }

        const confirmation = await Promise.race([
          signInWithPhoneNumber(auth, `+${data.phone}`, window.recaptchaVerifier),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('OTP request timeout')), 30000)
          )
        ]);

        setConfirmationResult(confirmation);
        setShowOtpInput(true);
        setError("");
        startResendTimer();
      } catch (err) {
        console.error("Error sending OTP:", err);
        if (err.message.includes('timeout')) {
          setError("Request timed out. Please try again.");
        } else if (err.code === 'auth/invalid-phone-number') {
          setError("Invalid phone number. Please check and try again.");
        } else if (err.code === 'auth/too-many-requests') {
          setError("Too many attempts. Please try again later.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
        await resetRecaptcha();
      } finally {
        setLoading(false);
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
    
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    
    setOtp(pastedData.padEnd(6, ''));
    
    const lastIndex = Math.min(pastedData.length, 6);
    if (otpRefs.current[lastIndex - 1]) {
      otpRefs.current[lastIndex - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const credential = PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        otp
      );

      await Promise.race([
        signInWithCredential(auth, credential),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Verification timeout')), 30000)
        )
      ]);

      setVerified(true);
      onVerificationSuccess(true);
    } catch (err) {
      console.error("Error verifying OTP:", err);
      if (err.message === 'Verification timeout') {
        setError("Verification timed out. Please try again.");
      } else if (err.code === 'auth/invalid-verification-code') {
        setError("Invalid OTP. Please check and try again.");
      } else if (err.code === 'auth/code-expired') {
        setError("OTP has expired. Please request a new one.");
        setShowOtpInput(false);
        await resetRecaptcha();
      } else {
        setError("Failed to verify OTP. Please try again.");
      }
      setOtp("");
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // const handleResendOtp = async () => {
  //   if (resendCounter > 0) return;
    
  //   setLoading(true);
  //   setError("");
  //   setOtp("");

  //   try {
  //     await resetRecaptcha();
  //     await formik.submitForm();
  //   } catch (error) {
  //     console.error("Error resending OTP:", error);
  //     setError("Failed to resend OTP. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleResendOtp = async () => {
    if (resendCounter > 0) return; // Prevent clicking before timeout
  
    setLoading(true);
    setError("");
    setOtp(""); // Clear previous OTP input
  
    try {
      await resetRecaptcha(); // Reset and reinitialize reCAPTCHA
      const confirmation = await signInWithPhoneNumber(auth, `+${formik.values.phone}`, window.recaptchaVerifier);
      
      setConfirmationResult(confirmation); // Store new confirmation result
      setShowOtpInput(true);
      startResendTimer(); // Restart the timer after sending new OTP
      setError("");
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center rounded-3xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-600">Phone Authentication</h2>

        {isClient && !verified && !showOtpInput && (
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="relative">
              <PhoneInput
                country={"in"}
                value={formik.values.phone}
                onChange={(value) => formik.handleChange({ target: { name: "phone", value } })}
                containerClass="w-full"
                inputClass="!w-full !py-3 !px-10 !border !border-pink-200 !rounded-xl focus:!border-pink-500 focus:!ring-2 focus:!ring-pink-200 !text-gray-800"
                buttonClass="!border-pink-200 !rounded-l-xl"
                dropdownClass="!bg-white !border-pink-200"
                disabled={loading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <button
              type="submit"
              className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !recaptchaInitialized}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {isClient && showOtpInput && !verified && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full flex flex-col items-center"
          >
            <p className="text-sm text-pink-600 mb-4">
              Enter the OTP sent to your phone
            </p>
            <div className="flex space-x-3" onPaste={handlePaste}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center border border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-lg font-semibold text-pink-600"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={loading}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <button
              onClick={handleVerifyOtp}
              className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="mt-4 text-center">
              <button
                onClick={handleResendOtp}
                disabled={resendCounter > 0 || loading}
                className="text-pink-600 hover:text-pink-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCounter > 0 
                  ? `Resend OTP in ${resendCounter}s`
                  : "Resend OTP"}
              </button>
            </div>
          </motion.div>
        )}

        {isClient && verified && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full text-center"
          >
            <p className="text-lg font-semibold text-green-600">
              Phone Number Verified Successfully!
            </p>
          </motion.div>
        )}

        {isClient && !showOtpInput && (
          <div id="recaptcha-container" ref={recaptchaContainerRef} className="mt-4"></div>
        )}
      </motion.div>
    </div>
  );
};

export default PhoneAuth;