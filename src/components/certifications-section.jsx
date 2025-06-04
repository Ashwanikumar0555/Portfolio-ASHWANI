"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Download, X, Check, ZoomIn, ZoomOut, Share2 } from "lucide-react";
import { cn } from "../utils/cn";
import { themeColors } from "../ui/color-selector";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateModal = ({ certificate, isOpen, onClose, themeColor }) => {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 4,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certificate.title.replace(/\s+/g, '-').toLowerCase()}-certificate.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const openInNewTab = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${certificate.title} Certificate</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); }
              .certificate { max-width: 90%; max-height: 90vh; box-shadow: 0 15px 30px rgba(0,0,0,0.2); border-radius: 8px; }
              .watermark { position: absolute; bottom: 20px; right: 20px; font-family: 'Arial', sans-serif; font-size: 14px; color: #64748b; opacity: 0.8; }
              .verified { position: absolute; top: 20px; right: 20px; padding: 8px 16px; background: #10b981; color: white; border-radius: 6px; font-size: 12px; }
            </style>
          </head>
          <body>
            <img src="${certificate.image}" alt="${certificate.title}" class="certificate" />
            <div class="watermark">Verified Certificate • ${new Date().toLocaleDateString()}</div>
            <div class="verified">Verified</div>
          </body>
        </html>
      `);
    }
  };

  const shareCertificate = () => {
    const shareUrl = `https://portfolio.example.com/certificates/${certificate.title.replace(/\s+/g, '-').toLowerCase()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-20 bg-white dark:bg-slate-700 p-2 rounded-full text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white shadow-lg border border-slate-200 dark:border-slate-600 transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700">
              <div className="flex items-center gap-3">
                <Award className={cn("w-6 h-6", themeColors[themeColor].text)} />
                <h3 className="text-2xl font-bold">{certificate.title}</h3>
              </div>
              <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full flex items-center">
                <Check className="w-4 h-4 mr-1" /> Verified
              </span>
            </div>

            <div className="p-8 flex flex-col items-center relative overflow-auto max-h-[70vh]">
              <div 
                ref={certificateRef} 
                className="bg-white p-10 rounded-xl border border-slate-200 w-full max-w-4xl mx-auto shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <div className="text-center mb-8">
                  <h2 className={cn("text-3xl font-bold", themeColors[themeColor].text)}>Certificate of Achievement</h2>
                  <div className={cn("h-1 w-32 mx-auto mt-3 rounded-full", themeColors[themeColor].bg)}></div>
                </div>

                <div className="flex justify-center mb-8">
                  <div className={cn("p-2 border rounded-xl overflow-hidden relative", themeColors[themeColor].borderLight)}>
                    <img 
                      src={certificate.image} 
                      alt={certificate.title} 
                      className="max-h-96 w-full object-contain transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-sm text-slate-500 mb-2">This certifies that</p>
                  <p className="text-2xl font-semibold mb-2">Ashwani Kumar</p>
                  <p className="text-sm text-slate-500 mb-4">has successfully completed</p>
                  <p className={cn("text-3xl font-bold mb-3", themeColors[themeColor].text)}>{certificate.title}</p>
                  <p className="text-lg mb-4">Issued by {certificate.issuer} on {certificate.date}</p>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">{certificate.description}</p>
                </div>

                <div className="flex justify-between items-center mt-10 border-t pt-6 border-slate-100">
                  <div className="flex items-center gap-2">
                    <Award className={cn("w-6 h-6", themeColors[themeColor].text)} />
                    <span className="text-sm font-medium">Certificate ID: {certificate.id}</span>
                  </div>
                  <div>
                    <img src="/placeholder.svg?height=50&width=120&text=Signature" alt="Signature" className="h-12" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 items-center">
                <div className="flex gap-2">
                  <button
                    onClick={handleZoomIn}
                    className={cn(
                      "p-2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all",
                      themeColors[themeColor].accent
                    )}
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className={cn(
                      "p-2 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all",
                      themeColors[themeColor].accent
                    )}
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                </div>

                {/* <button
                  onClick={downloadCertificate}
                  disabled={isDownloading}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-lg transition-all text-sm font-medium",
                    "bg-white dark:bg-slate-700 border hover:bg-slate-50 dark:hover:bg-slate-600",
                    themeColors[themeColor].accent
                  )}
                >
                  {isDownloading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </button> */}

                <button
                  onClick={shareCertificate}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-lg transition-all text-sm font-medium",
                    "bg-white dark:bg-slate-700 border hover:bg-slate-50 dark:hover:bg-slate-600",
                    themeColors[themeColor].accent
                  )}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {isCopied ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function CertificationsSection({ themeColor = "blue" }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const certifications = [
    {
      id: "CERT-AZURE2024",
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "2024",
      description: "Comprehensive understanding of cloud concepts, Azure services, security, privacy, compliance, and pricing.",
      image: "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/Azure%20Certification.png?raw=true"
    },
    {
      id: "CERT-FS2023",
      title: "Full Stack Development",
      issuer: "Udemy",
      date: "2023",
      description: "Comprehensive course covering full-stack development with HTML, CSS, JavaScript, Node.js, and MongoDB.",
      image: "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/Full%20Stack%20Certificate.png?raw=true"
    },
    {
      id: "CERT-JS2023",
      title: "JavaScript Mastery",
      issuer: "Coursera",
      date: "2023",
      description: "Advanced JavaScript concepts including ES6+, asynchronous programming, and modern frameworks.",
      image: "https://github.com/Ashwanikumar0555/Portfolio-ASHWANI/blob/main/src/assets/JavaScript%20Certificate.png?raw=true"
    }
  ];

  const filteredCertifications = certifications.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCertificateDirectly = async (cert) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);

    const loadingToast = document.createElement('div');
    loadingToast.style.position = 'fixed';
    loadingToast.style.bottom = '20px';
    loadingToast.style.right = '20px';
    loadingToast.style.background = '#3b82f6';
    loadingToast.style.color = 'white';
    loadingToast.style.padding = '12px 20px';
    loadingToast.style.borderRadius = '8px';
    loadingToast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    loadingToast.style.zIndex = '9999';
    loadingToast.style.display = 'flex';
    loadingToast.style.alignItems = 'center';
    loadingToast.style.gap = '8px';
    loadingToast.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Generating certificate...</span>
    `;
    document.body.appendChild(loadingToast);

    tempDiv.innerHTML = `
      <div style="background: white; padding: 48px; width: 900px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h2 style="font-size: 28px; font-weight: bold; color: #3b82f6;">Certificate of Achievement</h2>
          <div style="height: 4px; width: 100px; background: #3b82f6; margin: 12px auto; border-radius: 2px;"></div>
        </div>
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="padding: 8px; border: 2px solid #e2e8f0; border-radius: 12px; display: inline-block; position: relative;">
            <img src="${cert.image}" alt="${cert.title}" style="max-height: 200px; object-fit: contain;" />
            <div style="position: absolute; top: 8px; right: 8px; background: #10b981; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 12px;">Verified</div>
          </div>
        </div>
        <div style="text-align: center; margin-bottom: 32px;">
          <p style="font-size: 16px; color: #64748b; margin-bottom: 8px;">This certifies that</p>
          <p style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Ashwani Kumar</p>
          <p style="font-size: 16px; color: #64748b; margin-bottom: 20px;">has successfully completed</p>
          <p style="font-size: 28px; font-weight: bold; color: #3b82f6; margin-bottom: 12px;">${cert.title}</p>
          <p style="font-size: 18px; margin-bottom: 20px;">Issued by ${cert.issuer} on ${cert.date}</p>
          <p style="font-size: 14px; color: #475569; max-width: 600px; margin: 0 auto;">${cert.description}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 20px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px; font-weight: 500;">Certificate ID: ${cert.id}</span>
          </div>
          <div>
            <img src="/placeholder.svg?height=50&width=120&text=Signature" alt="Signature" style="height: 48px;" />
          </div>
        </div>
      </div>
    `;

    try {
      const canvas = await html2canvas(tempDiv.firstChild, {
        scale: 4,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cert.title.replace(/\s+/g, '-').toLowerCase()}-certificate.pdf`);
      
      document.body.removeChild(loadingToast);
      const successToast = document.createElement('div');
      successToast.style.position = 'fixed';
      successToast.style.bottom = '20px';
      successToast.style.right = '20px';
      successToast.style.background = '#10b981';
      successToast.style.color = 'white';
      successToast.style.padding = '12px 20px';
      successToast.style.borderRadius = '8px';
      successToast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      successToast.style.zIndex = '9999';
      successToast.style.display = 'flex';
      successToast.style.alignItems = 'center';
      successToast.style.gap = '8px';
      successToast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Certificate downloaded successfully!</span>
      `;
      document.body.appendChild(successToast);
      setTimeout(() => document.body.removeChild(successToast), 3000);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      document.body.removeChild(loadingToast);
      const errorToast = document.createElement('div');
      errorToast.style.position = 'fixed';
      errorToast.style.bottom = '20px';
      errorToast.style.right = '20px';
      errorToast.style.background = '#ef4444';
      errorToast.style.color = 'white';
      errorToast.style.padding = '12px 20px';
      errorToast.style.borderRadius = '8px';
      errorToast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      errorToast.style.zIndex = '9999';
      errorToast.style.display = 'flex';
      errorToast.style.alignItems = 'center';
      errorToast.style.gap = '8px';
      errorToast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <span>Failed to download certificate</span>
      `;
      document.body.appendChild(errorToast);
      setTimeout(() => document.body.removeChild(errorToast), 3000);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <section id="certifications" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r text-transparent bg-clip-text inline-block",
              themeColors[themeColor].primary
            )}
          >
            Professional Certifications
          </h2>
          <div className={cn("h-1 w-24 bg-gradient-to-r mx-auto mb-8 rounded-full", themeColors[themeColor].primary)}></div>
          <p className="text-slate-700 dark:text-slate-300 max-w-3xl mx-auto text-lg">
            A showcase of my professional certifications and achievements in cloud computing, web development, and software engineering.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={cn(
                "bg-white dark:bg-slate-800/70 rounded-2xl border overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl",
                "border-slate-200 dark:border-slate-700"
              )}
            >
              <div className="h-64 relative overflow-hidden group">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cert.title}</h3>
                  <div className="flex items-center mt-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Award className={cn("w-5 h-5 text-white", themeColors[themeColor].text)} />
                    <span className="text-white text-sm font-medium">{cert.issuer} • {cert.date}</span>
                  </div>
                  <span className="inline-flex items-center mt-2 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Check className="w-4 h-4 mr-1" /> Verified
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 dark:text-slate-300 mb-6 line-clamp-3">{cert.description}</p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setSelectedCertificate(cert)}
                    className={cn(
                      "flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      "bg-white dark:bg-slate-700 border hover:bg-slate-50 dark:hover:bg-slate-600",
                      themeColors[themeColor].accent,
                      themeColors[themeColor].hover
                    )}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </button>
                  {/* <button
                    onClick={() => downloadCertificateDirectly(cert)}
                    className={cn(
                      "flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      themeColors[themeColor].bg,
                      themeColors[themeColor].hoverDarker,
                      "text-white"
                    )}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCertifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-600 dark:text-slate-400 text-lg">No certificates found matching your search.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          {/*  */}
        </motion.div>
      </div>

      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          isOpen={!!selectedCertificate} 
          onClose={() => setSelectedCertificate(null)}
          themeColor={themeColor}
        />
      )}
    </section>
  );
}



////////////////////////


// "use client"

// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from "framer-motion";
// import { Award, ExternalLink, Download, X, Check } from "lucide-react";
// import { cn } from "../utils/cn";
// import { themeColors } from "../ui/color-selector";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const CertificateModal = ({ certificate, isOpen, onClose, themeColor }) => {
//   const certificateRef = useRef(null);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [downloadSuccess, setDownloadSuccess] = useState(false);
  
//   const downloadCertificate = async () => {
//     if (!certificateRef.current) return;
    
//     try {
//       setIsDownloading(true);
//       const canvas = await html2canvas(certificateRef.current, {
//         scale: 3, // Higher scale for better quality
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff'
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4'
//       });
      
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${certificate.title.replace(/\s+/g, '-').toLowerCase()}-certificate.pdf`);
      
//       setDownloadSuccess(true);
//       setTimeout(() => {
//         setDownloadSuccess(false);
//       }, 2000);
//     } catch (error) {
//       console.error('Error downloading certificate:', error);
//     } finally {
//       setIsDownloading(false);
//     }
//   };
  
//   // Open in new tab function
//   const openInNewTab = () => {
//     const newWindow = window.open('', '_blank');
//     if (newWindow) {
//       newWindow.document.write(`
//         <html>
//           <head>
//             <title>${certificate.title} Certificate</title>
//             <style>
//               body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8fafc; }
//               .certificate { max-width: 100%; max-height: 100vh; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
//               .watermark { position: absolute; bottom: 10px; right: 10px; font-family: Arial; font-size: 12px; color: #64748b; opacity: 0.7; }
//             </style>
//           </head>
//           <body>
//             <img src="${certificate.image}" alt="${certificate.title}" class="certificate" />
//             <div class="watermark">Verified Certificate • ${new Date().toLocaleDateString()}</div>
//           </body>
//         </html>
//       `);
//     }
//   };
  
//   if (!isOpen) return null;
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button - positioned absolutely on top right */}
//             <button 
//               onClick={onClose} 
//               className="absolute top-4 right-4 z-10 bg-white dark:bg-slate-700 p-1.5 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 shadow-md border border-slate-200 dark:border-slate-600 transition-all hover:scale-110"
//               aria-label="Close"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
//               <h3 className="text-xl font-semibold flex items-center">
//                 <Award className={cn("w-5 h-5 mr-2", themeColors[themeColor].text)} />
//                 {certificate.title}
//               </h3>
//             </div>
            
//             <div className="p-6 flex flex-col items-center">
//               <div 
//                 ref={certificateRef} 
//                 className={cn(
//                   "bg-white p-8 rounded-lg border border-slate-200 w-full max-w-3xl mx-auto",
//                   "shadow-lg transition-all hover:shadow-xl"
//                 )}
//               >
//                 {/* Certificate header */}
//                 <div className="text-center mb-6">
//                   <h2 className={cn("text-2xl font-bold", themeColors[themeColor].text)}>Certificate of Completion</h2>
//                   <div className={cn("h-1 w-24 mx-auto mt-2", themeColors[themeColor].bg)}></div>
//                 </div>
                
//                 {/* Certificate image */}
//                 <div className="flex justify-center mb-6">
//                   <div className={cn("p-1 border rounded-lg overflow-hidden", themeColors[themeColor].borderLight)}>
//                     <img src={certificate.image} alt={certificate.title} className="h-48 object-contain" />
//                   </div>
//                 </div>
                
//                 {/* Certificate content */}
//                 <div className="text-center mb-6">
//                   <p className="text-sm text-slate-500 mb-1">This certifies that</p>
//                   <p className="text-xl font-semibold mb-1">John Doe</p>
//                   <p className="text-sm text-slate-500 mb-4">has successfully completed</p>
//                   <p className={cn("text-2xl font-bold mb-2", themeColors[themeColor].text)}>{certificate.title}</p>
//                   <p className="text-lg mb-4">Issued by {certificate.issuer} on {certificate.date}</p>
//                   <p className="text-sm text-slate-600 max-w-md mx-auto">{certificate.description}</p>
//                 </div>
                
//                 {/* Certificate footer */}
//                 <div className="flex justify-between items-center mt-8 border-t pt-4 border-slate-100">
//                   <div className="flex items-center">
//                     <Award className={cn("w-6 h-6 mr-2", themeColors[themeColor].text)} />
//                     <span className="text-sm font-medium">Certificate ID: CERT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
//                   </div>
//                   <div>
//                     <img src="/placeholder.svg?height=50&width=120&text=Signature" alt="Signature" className="h-12" />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Action buttons */}
//               <div className="flex gap-4 mt-8">
//                 <button
//                   onClick={openInNewTab}
//                   className={cn(
//                     "flex items-center px-4 py-2 rounded-lg transition-all",
//                     "bg-white border border-slate-200 hover:bg-slate-50 hover:shadow-md",
//                     "dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600",
//                     themeColors[themeColor].accent
//                   )}
//                 >
//                   <ExternalLink className="w-4 h-4 mr-2" />
//                   View Full Screen
//                 </button>
                
//                 <button
//                   onClick={downloadCertificate}
//                   disabled={isDownloading}
//                   className={cn(
//                     "flex items-center px-4 py-2 rounded-lg text-white transition-all",
//                     themeColors[themeColor].bg,
//                     themeColors[themeColor].hoverDarker,
//                     "relative overflow-hidden",
//                     isDownloading ? "opacity-80 cursor-wait" : "hover:shadow-md"
//                   )}
//                 >
//                   {isDownloading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : downloadSuccess ? (
//                     <>
//                       <Check className="w-4 h-4 mr-2" />
//                       Downloaded!
//                     </>
//                   ) : (
//                     <>
//                       <Download className="w-4 h-4 mr-2" />
//                       Download PDF
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default function CertificationsSection({ themeColor = "blue" }) {
//   const [selectedCertificate, setSelectedCertificate] = useState(null);
  
//   const certifications = [
//     {
//       title: "Web Development Bootcamp",
//       issuer: "Udemy",
//       date: "2023",
//       description: "Comprehensive course covering full-stack web development with MERN stack.",
//       image: "/placeholder.svg?height=200&width=300&text=Web+Dev+Certificate",
//     },
//     {
//       title: "React - The Complete Guide",
//       issuer: "Coursera",
//       date: "2023",
//       description: "Advanced React concepts including hooks, context API, and Redux.",
//       image: "/placeholder.svg?height=200&width=300&text=React+Certificate",
//     },
//     {
//       title: "JavaScript Algorithms and Data Structures",
//       issuer: "freeCodeCamp",
//       date: "2022",
//       description: "JavaScript fundamentals, algorithms, and data structures.",
//       image: "/placeholder.svg?height=200&width=300&text=JS+Certificate",
//     },
//   ];

//   const viewCertificate = (cert) => {
//     setSelectedCertificate(cert);
//   };

//   const downloadCertificateDirectly = async (cert) => {
//     // Create a temporary hidden div to render the certificate
//     const tempDiv = document.createElement('div');
//     tempDiv.style.position = 'absolute';
//     tempDiv.style.left = '-9999px';
//     tempDiv.style.top = '-9999px';
//     document.body.appendChild(tempDiv);
    
//     // Show loading indicator
//     const loadingToast = document.createElement('div');
//     loadingToast.style.position = 'fixed';
//     loadingToast.style.bottom = '20px';
//     loadingToast.style.right = '20px';
//     loadingToast.style.background = '#3b82f6';
//     loadingToast.style.color = 'white';
//     loadingToast.style.padding = '10px 16px';
//     loadingToast.style.borderRadius = '8px';
//     loadingToast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
//     loadingToast.style.zIndex = '9999';
//     loadingToast.style.display = 'flex';
//     loadingToast.style.alignItems = 'center';
//     loadingToast.style.gap = '8px';
//     loadingToast.innerHTML = `
//       <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//         <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//       </svg>
//       <span>Generating certificate...</span>
//     `;
//     document.body.appendChild(loadingToast);
    
//     tempDiv.innerHTML = `
//       <div style="background: white; padding: 40px; width: 800px;">
//         <div style="text-align: center; margin-bottom: 24px;">
//           <h2 style="font-size: 24px; font-weight: bold; color: #3b82f6;">Certificate of Completion</h2>
//           <div style="height: 4px; width: 80px; background: #3b82f6; margin: 8px auto;"></div>
//         </div>
        
//         <div style="text-align: center; margin-bottom: 24px;">
//           <div style="padding: 4px; border: 1px solid #e2e8f0; border-radius: 8px; display: inline-block;">
//             <img src="${cert.image}" alt="${cert.title}" style="height: 180px; object-fit: contain;" />
//           </div>
//         </div>
        
//         <div style="text-align: center; margin-bottom: 24px;">
//           <p style="font-size: 14px; color: #64748b; margin-bottom: 4px;">This certifies that</p>
//           <p style="font-size: 20px; font-weight: 600; margin-bottom: 4px;">John Doe</p>
//           <p style="font-size: 14px; color: #64748b; margin-bottom: 16px;">has successfully completed</p>
//           <p style="font-size: 24px; font-weight: bold; color: #3b82f6; margin-bottom: 8px;">${cert.title}</p>
//           <p style="font-size: 18px; margin-bottom: 16px;">Issued by ${cert.issuer} on ${cert.date}</p>
//           <p style="font-size: 14px; color: #475569; max-width: 500px; margin: 0 auto;">${cert.description}</p>
//         </div>
        
//         <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
//           <div style="display: flex; align-items: center;">
//             <span style="font-size: 14px; font-weight: 500;">Certificate ID: CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
//           </div>
//           <div>
//             <img src="/placeholder.svg?height=50&width=120&text=Signature" alt="Signature" style="height: 48px;" />
//           </div>
//         </div>
//       </div>
//     `;

//     try {
//       const canvas = await html2canvas(tempDiv.firstChild, {
//         scale: 3, // Higher scale for better quality
//         useCORS: true,
//         logging: false,
//         backgroundColor: '#ffffff'
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4'
//       });
      
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${cert.title.replace(/\s+/g, '-').toLowerCase()}-certificate.pdf`);
      
//       // Show success toast
//       document.body.removeChild(loadingToast);
//       const successToast = document.createElement('div');
//       successToast.style.position = 'fixed';
//       successToast.style.bottom = '20px';
//       successToast.style.right = '20px';
//       successToast.style.background = '#10b981';
//       successToast.style.color = 'white';
//       successToast.style.padding = '10px 16px';
//       successToast.style.borderRadius = '8px';
//       successToast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
//       successToast.style.zIndex = '9999';
//       successToast.style.display = 'flex';
//       successToast.style.alignItems = 'center';
//       successToast.style.gap = '8px';
//       successToast.innerHTML = `
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//           <polyline points="22 4 12 14.01 9 11.01"></polyline>
//         </svg>
//         <span>Certificate downloaded successfully!</span>
//       `;
//       document.body.appendChild(successToast);
//       setTimeout(() => {
//         document.body.removeChild(successToast);
//       }, 3000);
//     } catch (error) {
//       console.error('Error downloading certificate:', error);
//       // Show error toast
//       document.body.removeChild(loadingToast);
//       const errorToast = document.createElement('div');
//       errorToast.style.position = 'fixed';
//       errorToast.style.bottom = '20px';
//       errorToast.style.right = '20px';
//       errorToast.style.background = '#ef4444';
//       errorToast.style.color = 'white';
//       errorToast.style.padding = '10px 16px';
//       errorToast.style.borderRadius = '8px';
//       errorToast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
//       errorToast.style.zIndex = '9999';
//       errorToast.style.display = 'flex';
//       errorToast.style.alignItems = 'center';
//       errorToast.style.gap = '8px';
//       errorToast.innerHTML = `
//         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//           <circle cx="12" cy="12" r="10"></circle>
//           <line x1="15" y1="9" x2="9" y2="15"></line>
//           <line x1="9" y1="9" x2="15" y2="15"></line>
//         </svg>
//         <span>Failed to download certificate</span>
//       `;
//       document.body.appendChild(errorToast);
//       setTimeout(() => {
//         document.body.removeChild(errorToast);
//       }, 3000);
//     } finally {
//       document.body.removeChild(tempDiv);
//     }
//   };

//   return (
//     <section id="certifications" className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2
//             className={cn(
//               "text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text inline-block",
//               themeColors[themeColor].primary,
//             )}
//           >
//             Certifications
//           </h2>
//           <div className={cn("h-1 w-20 bg-gradient-to-r mx-auto mb-8", themeColors[themeColor].primary)}></div>
//           <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
//             Professional certifications that validate my skills and knowledge in various technologies and development
//             practices.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {certifications.map((cert, index) => (
//             <motion.div
//               key={cert.title}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 * index }}
//               viewport={{ once: true }}
//               className={cn(
//                 "bg-white dark:bg-slate-800/50 rounded-2xl border overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl",
//                 "border-slate-200 dark:border-slate-700",
//               )}
//             >
//               <div className="h-48 relative overflow-hidden group">
//                 <img src={cert.image || "/placeholder.svg"} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
//                 <div className={cn("absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70")}></div>
//                 <div className="absolute bottom-4 left-4 right-4">
//                   <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
//                   <div className="flex items-center mt-2">
//                     <Award className={cn("w-4 h-4 text-white mr-2", themeColors[themeColor].text)} />
//                     <span className="text-white text-sm">
//                       {cert.issuer} - {cert.date}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <p className="text-slate-700 dark:text-slate-300 mb-4">{cert.description}</p>
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => viewCertificate(cert)}
//                     className={cn(
//                       "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
//                       "bg-white dark:bg-slate-700 border hover:shadow-md",
//                       "border-slate-200 dark:border-slate-600",
//                       themeColors[themeColor].accent,
//                       themeColors[themeColor].hover
//                     )}
//                   >
//                     <ExternalLink className="h-4 w-4 mr-2" />
//                     View Certificate
//                   </button>
//                   <button
//                     onClick={() => downloadCertificateDirectly(cert)}
//                     className={cn(
//                       "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all",
//                       "bg-white dark:bg-slate-700 hover:shadow-md",
//                       themeColors[themeColor].accent,
//                       themeColors[themeColor].hover
//                     )}
//                   >
//                     <Download className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mt-12"
//         >
//           <button
//             className={cn(
//               "flex items-center px-4 py-2 rounded-lg mx-auto transition-all",
//               "bg-white dark:bg-slate-800 border hover:shadow-md",
//               "border-slate-200 dark:border-slate-700",
//               themeColors[themeColor].hover,
//               themeColors[themeColor].accent,
//             )}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-5 h-5 mr-2"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             Upload New Certificate
//           </button>
//         </motion.div>
//       </div>
      
//       {selectedCertificate && (
//         <CertificateModal 
//           certificate={selectedCertificate} 
//           isOpen={!!selectedCertificate} 
//           onClose={() => setSelectedCertificate(null)}
//           themeColor={themeColor}
//         />
//       )}
//     </section>
//   );
// }



// Grok
