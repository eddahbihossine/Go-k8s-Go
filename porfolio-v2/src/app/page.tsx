"use client";
import React, { useState } from 'react';
import GradientBackground from './components/background';
import ProjectsSection from './components/cards';


const Page = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className='w-screen h-screen  text-white flex flex-col items-center'>
      {/* Navigation */}
      <nav className='w-full p-8 flex justify-center gap-8 text-gold font-[Hamid] text-xl my-10'>
        {['home', 'about', 'projects', 'blogs'].map((section) => (
          <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`transition-all duration-300 ${activeSection === section ? 'underline' : ''}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className='w-full flex-1 flex flex-col items-center justify-center p-10'>
        <GradientBackground />
        {activeSection === 'home' && (
          
          <div className='flex flex-col items-center gap-6'>
            <h1 className='text-7xl text-gold font-[Hamid]'>This is EH Eddahbi</h1>
            <p className='text-white font-[Hamid] text-xl'>A software Engineer</p>
          </div>
        )}

        {activeSection === 'about' && (
          <div className='max-w-2xl text-center'>
            <h2 className='text-5xl text-gold font-[Hamid] mb-4'>About Me</h2>
            <p className='text-lg'>I am a junior software engineer specializing in cloud and Go development. I have a passion for building scalable cloud-native applications and leveraging the power of Go to create high-performance back-end systems. My experience includes working with Kubernetes, Docker, and various cloud platforms.</p>
            <div className='flex justify-center mt-6'>
              <img src='/Go.svg' alt='Golang Logo' className='w-30 h-20' />
              <img src='/Docker.svg' alt='Golang Logo' className='w-20 h-20' />
              <img src='/Kubernetes.svg' alt='Golang Logo' className='w-20 h-20' />
              <img src='/aws.svg' alt='Golang Logo' className='w-20 h-20' />
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
          <div className='max-w-3xl text-center'>
            <ProjectsSection />
          </div>
        )}

        {activeSection === 'blogs' && (
          <div className='max-w-2xl text-center'>
            <h2 className='text-5xl text-gold font-[Hamid] mb-4'>Blogs</h2>
            <p className='text-lg'>Stay tuned for my latest tech insights, tutorials, and industry trends.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
