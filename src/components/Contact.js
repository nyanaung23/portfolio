import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const serviceId = 'service_portfolio';
      const templateId = 'template_contact';
      const publicKey = 'YOUR_PUBLIC_KEY';
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'nyan.wl.aung@gmail.com'
      };
      
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'nyan.wl.aung@gmail.com',
      link: 'mailto:nyan.wl.aung@gmail.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+1 (858) 123-4567',
      link: 'tel:+18581234567'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'San Diego, CA',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/nyanaung',
      color: '#0077b5'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      link: 'https://github.com/nyanaung23',
      color: '#333'
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      link: 'mailto:nyan.wl.aung@gmail.com',
      color: '#ea4335'
    }
  ];

  return (
    <section 
      id="contact" 
      className="contact-section"
      style={{
        '--contact-bg': theme === 'dark' ? 'linear-gradient(135deg, #042a1c 0%, #042a1c 100%)' : 'linear-gradient(135deg, #EEEEEE 0%, #EEEEEE 100%)',
        '--contact-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--text-shadow-1': theme === 'dark' ? '#0d4f3c' : '#374151',
        '--text-shadow-2': theme === 'dark' ? '#1a5f4a' : '#4b5563',
        '--text-shadow-3': theme === 'dark' ? '#2d6b58' : '#6b7280',
        '--text-shadow-4': theme === 'dark' ? '#407766' : '#9ca3af',
        '--contact-text-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--info-card-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.04)' : 'rgba(0, 0, 0, 0.04)',
        '--info-card-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        '--info-card-shadow': theme === 'dark' ? '0 6px 20px rgba(0,0,0,0.25)' : '0 6px 15px rgba(0,0,0,0.06)',
        '--info-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--info-item-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.03)' : 'rgba(0, 0, 0, 0.03)',
        '--info-item-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.12)' : 'rgba(0, 0, 0, 0.06)',
        '--info-item-hover-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        '--info-item-hover-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.25)' : 'rgba(0, 0, 0, 0.15)',
        '--info-item-hover-shadow': theme === 'dark' ? '0 8px 25px rgba(0,0,0,0.4)' : '0 8px 20px rgba(0,0,0,0.15)',
        '--icon-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        '--icon-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--label-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--value-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--social-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--social-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        '--social-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        '--social-hover-bg': 'rgba(255, 255, 255, 0.9)',
        '--form-card-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.04)' : 'rgba(0, 0, 0, 0.04)',
        '--form-card-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        '--form-card-shadow': theme === 'dark' ? '0 6px 20px rgba(0,0,0,0.25)' : '0 6px 15px rgba(0,0,0,0.06)',
        '--form-title-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--form-subtitle-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--form-label-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--input-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        '--input-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        '--input-color': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--input-focus-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        '--placeholder-color': theme === 'dark' ? 'rgba(227, 229, 230, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        '--bio-card-bg': theme === 'dark' ? 'linear-gradient(135deg, #0a2e1f 0%, #1a4a35 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        '--submit-btn-bg': theme === 'dark' ? 'rgba(227, 229, 230, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        '--submit-btn-hover': theme === 'dark' ? 'rgba(227, 229, 230, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        '--submit-btn-text': theme === 'dark' ? '#e3e5e6' : '#000000',
        '--submit-btn-border': theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        '--card-bg': theme === 'dark' ? '#404040' : '#e7e7e7',
        '--card-before-bg': theme === 'dark' ? '#ffffff' : '#000000',
        '--card-after-bg': theme === 'dark' ? '#cccccc' : '#333333',
        '--contacts-text-color': theme === 'dark' ? '#0d4f3c' : '#ffffff',
        '--social-icon-color': theme === 'dark' ? '#ffffff' : '#000000',
        '--divider-line-color': theme === 'dark' ? 'rgba(227, 229, 230, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        '--input-focus-border': theme === 'dark' ? '#ffffff' : '#000000',
        '--input-focus-shadow': theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="contact-container">
        <div className="contacts-section">
          <motion.div
            className="contacts-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <div className="card">
              <span>Contacts</span>
              <a className="social-link" href="https://linkedin.com/in/nyanaung" target="_blank" rel="noopener noreferrer">
                <svg fill="var(--social-icon-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a className="social-link" href="mailto:nyan.wl.aung@gmail.com">
                <svg fill="var(--social-icon-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a className="social-link" href="https://github.com/nyanaung23" target="_blank" rel="noopener noreferrer">
                <svg fill="var(--social-icon-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="contact-content">

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
             <div className="form-header">
               <h3 className="form-title">LET'S CONNECT</h3>
               <p className="form-subtitle">
                 Eager to join a dynamic team and contribute to meaningful projects that make a difference.
               </p>
             </div>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="6"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: false }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {submitStatus && (
                <motion.div
                  className={`submit-status ${submitStatus}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {submitStatus === 'success' 
                    ? 'Message sent successfully! I\'ll get back to you soon.' 
                    : 'Failed to send message. Please try again or contact me directly.'
                  }
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
