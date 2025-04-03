"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send, Check, AlertCircle } from "lucide-react";
import { TextField } from "@mui/material";
import { toast, Toaster } from 'sonner';
import { cn } from "../utils/cn";
import { themeColors } from "../ui/color-selector";

export default function ContactSection({ themeColor = 'blue' }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Get the current theme colors with fallback to blue
  const currentTheme = themeColors[themeColor] || themeColors.blue;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form", {
        description: "Some required fields need your attention",
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success toast with themed color
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
        icon: <Check className="h-5 w-5" />,
        style: {
          background: `linear-gradient(to right, ${currentTheme.gradient})`,
          color: 'white',
          border: 'none'
        },
        duration: 5000
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or contact me directly via email.",
        icon: <AlertCircle className="h-5 w-5" />,
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <section 
        id="contact" 
        className="py-20 bg-gradient-to-b from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text inline-block",
                currentTheme.primary,
              )}
            >
              Get In Touch
            </h2>
            <div className={cn("h-1 w-20 bg-gradient-to-r mx-auto mb-8", currentTheme.primary)}></div>
            <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out to me through the form below or via my
              contact information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "bg-white/80 backdrop-blur-sm dark:bg-slate-800/50 p-8 rounded-2xl border shadow-xl",
                "border-slate-200 dark:border-slate-700",
                "transform transition-all hover:shadow-2xl hover:-translate-y-1",
              )}
            >
              <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Contact Information</h3>
              <ul className="space-y-6">
                <ContactItem 
                  icon={<Mail className={cn("w-5 h-5", currentTheme.accent)} />}
                  title="Email"
                  content={
                    <a href="mailto:ashwanikumar05556@gmail.com" className="hover:underline">
                      ashwanikumar05556@gmail.com
                    </a>
                  }
                  theme={currentTheme}
                />
                
                <ContactItem 
                  icon={<Github className={cn("w-5 h-5", currentTheme.accent)} />}
                  title="GitHub"
                  content={
                    <a
                      href="https://github.com/Ashwanikumar0555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      github.com/Ashwanikumar0555
                    </a>
                  }
                  theme={currentTheme}
                />
                
                <ContactItem 
                  icon={<Linkedin className={cn("w-5 h-5", currentTheme.accent)} />}
                  title="LinkedIn"
                  content={
                    <a
                      href="https://www.linkedin.com/in/ashwani-kumar056/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      linkedin.com/in/ashwani-kumar056
                    </a>
                  }
                  theme={currentTheme}
                />
                
                <ContactItem 
                  icon={<MapPin className={cn("w-5 h-5", currentTheme.accent)} />}
                  title="Location"
                  content="Gujarat, Ahmedabad"
                  theme={currentTheme}
                />
              </ul>

              <SocialLinks theme={currentTheme} />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className={cn(
                "bg-white/80 backdrop-blur-sm dark:bg-slate-800/50 p-8 rounded-2xl border shadow-xl",
                "border-slate-200 dark:border-slate-700",
                "transform transition-all hover:shadow-2xl hover:-translate-y-1",
              )}
            >
              <h3 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Send Me a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    label="Name"
                    placeholder="Your Name"
                    required
                    error={errors.name}
                    theme={currentTheme}
                  />
                  <FormField
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Email"
                    placeholder="Your Email"
                    required
                    error={errors.email}
                    theme={currentTheme}
                  />
                </div>
                <FormField
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  label="Subject"
                  placeholder="Subject"
                  theme={currentTheme}
                />
                <FormField
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  label="Message"
                  placeholder="Your Message"
                  multiline
                  rows={5}
                  required
                  error={errors.message}
                  theme={currentTheme}
                />
                <SubmitButton 
                  isSubmitting={isSubmitting} 
                  theme={currentTheme} 
                />
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// Reusable components with enhanced styling
const ContactItem = ({ icon, title, content, theme }) => (
  <motion.li 
    whileHover={{ scale: 1.02 }}
    className="flex items-start gap-4"
  >
    <motion.span 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-gradient-to-r p-3 rounded-full mt-1 shadow-md",
        theme.primary,
        "flex items-center justify-center text-white"
      )}
    >
      {icon}
    </motion.span>
    <div>
      <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-slate-700 dark:text-slate-300">{content}</p>
    </div>
  </motion.li>
);

const SocialLinks = ({ theme }) => (
  <div className="mt-10">
    <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Connect With Me</h4>
    <div className="flex space-x-4">
      <SocialLink 
        href="https://github.com/Ashwanikumar0555"
        icon={<Github className="w-5 h-5 text-white" />}
        theme={theme}
      />
      <SocialLink 
        href="https://www.linkedin.com/in/ashwani-kumar056/"
        icon={<Linkedin className="w-5 h-5 text-white" />}
        theme={theme}
      />
      <SocialLink 
        href="mailto:ashwanikumar05556@gmail.com"
        icon={<Mail className="w-5 h-5 text-white" />}
        theme={theme}
      />
    </div>
  </div>
);

const SocialLink = ({ href, icon, theme }) => (
  <motion.a
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "bg-gradient-to-r p-3 rounded-full transition-all shadow-md",
      theme.primary,
      "transform hover:-translate-y-1 hover:shadow-lg"
    )}
  >
    {icon}
  </motion.a>
);

const FormField = ({ 
  id, 
  name, 
  value, 
  onChange, 
  label, 
  placeholder, 
  type = 'text', 
  required = false, 
  multiline = false, 
  rows = 1, 
  error, 
  theme 
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-slate-700 dark:text-slate-300 block font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <TextField
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      required={required}
      multiline={multiline}
      rows={rows}
      error={!!error}
      helperText={error}
      className="transition-all"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '0.5rem',
          transition: 'all 0.3s ease',
          '& fieldset': {
            borderColor: error ? '#ef4444' : 'rgb(226, 232, 240)',
            borderWidth: error ? '2px' : '1px',
          },
          '&:hover fieldset': {
            borderColor: error ? '#ef4444' : theme.accentColor || '#3B82F6',
          },
          '&.Mui-focused fieldset': {
            borderColor: error ? '#ef4444' : theme.accentColor || '#3B82F6',
          },
        },
        '& .MuiInputBase-input': {
          '&::placeholder': {
            opacity: 0.7,
          },
        },
        '& .MuiFormHelperText-root': {
          color: '#ef4444',
          fontWeight: '500',
          marginLeft: '0',
        },
      }}
    />
  </div>
);

const SubmitButton = ({ isSubmitting, theme }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={cn(
      "w-full py-3 px-6 rounded-lg text-white font-medium",
      "transition-all shadow-lg focus:outline-none",
      "flex items-center justify-center",
      "bg-gradient-to-r",
      theme.primary,
      isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
    )}
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sending...
      </>
    ) : (
      <>
        <Send className="mr-2 h-5 w-5" />
        Send Message
      </>
    )}
  </motion.button>
);