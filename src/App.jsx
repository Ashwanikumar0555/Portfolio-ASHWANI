import { useState } from 'react';
import React from 'react';
import './App.css';
import Header from './components/header';
import BackgroundAnimation from './components/background-animation';
import { cn } from './utils/cn';
import HeroSection from './components/hero-section';
import AboutSection from './components/about-section';
import SkillsSection from './components/skills-section';
import TimelineSection from './components/timeline-section';
import ProjectsSection from './components/projects-section';
import CertificationsSection from './components/certifications-section';
import ReferencesSection from './components/ReferencesSection';
import ContactSection from './components/contact-section';
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('light');
  const [themeColor, setThemeColor] = useState('blue');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <main className={cn("relative min-h-screen", theme === "dark" ? "dark" : "")}>
      {/* Background animation */}
      <BackgroundAnimation themeColor={themeColor} />

      {/* Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection 
          theme={theme}
          toggleTheme={toggleTheme}
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          scrollToSection={scrollToSection}
        />

        {/* About Section */}
        <AboutSection 
          themeColor={themeColor} 
        />

        {/* Skills Section */}
        <SkillsSection 
          themeColor={themeColor} 
        />

        {/* Timeline Section */}
        <TimelineSection
          themeColor={themeColor} 
        />

        {/* Project Section */}
        <ProjectsSection themeColor={themeColor} />

        {/* Certifications Section */}
        <CertificationsSection themeColor={themeColor} />

        {/* References Section */}
         <ReferencesSection themeColor={themeColor} /> 

         {/* Contact  */}
         <ContactSection themeColor={themeColor} /> 

        {/* Footer */}
        <Footer themeColor={themeColor} /> 
      </div>
    </main>
  );
}

export default App;