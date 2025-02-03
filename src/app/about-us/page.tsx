"use client"

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const teamMembers = [
  {
    name: "Dhruv Koli",
    roll: "23bcs044",
    image: "/Dhruv.png",
    social: {
      linkedin: "https://www.linkedin.com/in/dhruvkoli",
      github: "https://github.com/dask-58",
      twitter: "https://twitter.com/dask_58",
    }
  },
  {
    name: "Amritanshu Aditya",
    roll: "23bcs013",
    image: "/Amar.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/amritanshuaditya/",
      github: "https://github.com/Immortal-Beyond-Oblivion",
    }
  },
  {
    name: "Barghav Abhilash",
    roll: "23bcs028",
    image: "/Barghav.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/barghav-abhilash-b-r-2ab2ba29a/",
      github: "https://github.com/Meow-Codes",
      instagram: "https://www.instagram.com/abhilash_2557/",
    }
  },
  {
    name: "K V Modak",
    roll: "23bcs067",
    image: "/Modak.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/kv-modak-45aaa12aa/",
      github: "https://github.com/mod756", 
      instagram: "https://www.instagram.com/modak_756/",
    }
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  useEffect(() => {
    const cardElements = document.querySelectorAll('.team-card');
    const imageElements = document.querySelectorAll('.team-image');
    
    cardElements.forEach((card: Element) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    imageElements.forEach((image: Element) => {
      gsap.fromTo(
        image,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">About Us</h1>
      <div className="max-w-4xl mx-auto text-center text-gray-300 mb-16">
        <p className="text-lg mb-4">
          We are a team of four passionate 4th-semester Computer Science 
          students from IIIT Dharwad, this webpage you are seeing is
          the web portal for our CS301 Software Engineering project.
        </p>
        <p className="text-lg mb-4">
          Our software is designed to be, user-friendly, and highly efficient, 
          We aim to push the boundaries of what's possible.
        </p>
        <p className="text-lg">
          Meet the minds behind this project:
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-800 border-gray-700 team-card">
            <div className="relative w-full h-48 rounded-t-2xl overflow-hidden team-image">
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-t-2xl"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center mt-4 text-xl font-semibold text-white">
                {member.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-300 font-medium mb-2">{member.roll}</p>
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div className="max-w-4xl mx-auto text-center text-gray-300 mt-10">
        If you like this webpage consider 
      </div> */}
    </div>
  );
};