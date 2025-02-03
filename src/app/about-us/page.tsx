"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const teamMembers = [
  {
    name: "Amritanshu Aditya",
    roll: "23bcs013",
    image: "/Amar.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/amritanshuaditya/",
      github: "https://github.com/Immortal-Beyond-Oblivion",
    },
  },
  {
    name: "Barghav Abhilash",
    roll: "23bcs028",
    image: "/Barghav.jpeg",
    social: {
      linkedin:
        "https://www.linkedin.com/in/barghav-abhilash-b-r-2ab2ba29a/",
      github: "https://github.com/Meow-Codes",
      instagram: "https://www.instagram.com/abhilash_2557/",
    },
  },
  {
    name: "Dhruv Koli",
    roll: "23bcs044",
    image: "/Dhruv.png",
    social: {
      linkedin: "https://www.linkedin.com/in/dhruvkoli",
      github: "https://github.com/dask-58",
      twitter: "https://twitter.com/dask_58",
    },
  },
  {
    name: "K V Modak",
    roll: "23bcs067",
    image: "/Modak.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/kv-modak-45aaa12aa/",
      github: "https://github.com/mod756",
      instagram: "https://www.instagram.com/modak_756/",
    },
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  useEffect(() => {
    const cardElements = document.querySelectorAll(".team-card");
    const imageElements = document.querySelectorAll(".team-image");

    cardElements.forEach((card: Element) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    imageElements.forEach((image: Element) => {
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const projectSections = document.querySelectorAll(".animate-section");
    projectSections.forEach((section: Element) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-10 px-4 md:px-10">
      <section className="max-w-4xl mx-auto text-gray-300">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          About Our Project
        </h1>
        <div className="space-y-12">
          <section className="animate-section">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Project Overview
            </h2>
            <p className="text-gray-300 text-lg">
              The BaDAM152 Attendance System is a modern solution designed to
              streamline the process of tracking and managing student attendance
              in educational institutions. Our system aims to eliminate the
              traditional paper-based attendance methods and provide a more
              efficient, accurate, and transparent approach.
            </p>
          </section>

          <section className="animate-section">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Why We Created This
            </h2>
            <p className="text-gray-300 text-lg">
              During our time as students, we observed several challenges with
              traditional attendance systems:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-300 text-lg">
              <li>Time-consuming manual attendance marking</li>
              <li>Difficulty in maintaining accurate records</li>
              <li>Limited accessibility to attendance data</li>
              <li>Lack of real-time tracking and reporting</li>
            </ul>
          </section>

          <section className="animate-section">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 text-lg text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">For Students</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time attendance tracking</li>
                  <li>Personal attendance history</li>
                  <li>Detailed attendance statistics</li>
                  <li>Mobile-friendly interface</li>
                </ul>
              </div>
              <div className="bg-gray-800 text-lg text-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">For Faculty</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Quick attendance marking</li>
                  <li>Automated reports generation</li>
                  <li>Student attendance analytics</li>
                  <li>Bulk data management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* <section className="animate-section">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Technology Stack
            </h2>
            <div className="bg-gray-800 text-white p-6 rounded-lg">
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center space-x-2">
                  <span className="font-semibold">Frontend:</span>
                  <span>Next.js, TypeScript, Tailwind CSS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="font-semibold">Backend:</span>
                  <span>Node.js, MongoDB</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="font-semibold">Authentication:</span>
                  <span>JWT, bcrypt</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="font-semibold">Deployment:</span>
                  <span>Vercel</span>
                </li>
              </ul>
            </div>
          </section> */}

          <section className="animate-section">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Future Plans
            </h2>
            <p className="text-gray-300 text-lg">
              We are continuously working to improve the system with planned
              features including:
            </p>
            <ul className="list-disc pl-6 mt-4 text-lg space-y-2 text-gray-300">
              <li>Advanced analytics and reporting</li>
              <li>Integration with learning management systems</li>
            </ul>
          </section>
        </div>
      </section>
      
      <section className="mt-16">
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          About Us
        </h1>
        <div className="max-w-4xl mx-auto text-left text-gray-300 mb-10">
          <p className="text-lg mb-4">
            We are a team of four passionate 4th-semester Computer Science
            students from IIIT Dharwad. This webpage is the web portal for our
            CS301 Software Engineering project.
          </p>
          <p className="text-lg mb-4">
            Our software is designed to be user-friendly and highly efficient.
            We aim to push the boundaries of what's possible.
          </p>
          <p className="text-lg">Meet the minds behind this project:</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="team-card shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-800 border-gray-700"
            >
              <div className="relative w-full h-48 rounded-t-2xl overflow-hidden team-image">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-2xl"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-center mt-4 text-xl font-semibold text-white">
                  {member.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-300 font-medium mb-2">
                  {member.roll}
                </p>
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
      </section>
    </div>
  );
}
