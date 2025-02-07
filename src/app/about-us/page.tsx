"use client"
import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Github, Twitter, Instagram } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
      linkedin: "https://www.linkedin.com/in/barghav-abhilash-b-r-2ab2ba29a/",
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
]
gsap.registerPlugin(ScrollTrigger)
export default function AboutPage() {
  useEffect(() => {
    const cardElements = document.querySelectorAll(".team-card")
    const imageElements = document.querySelectorAll(".team-image")
    const headings = document.querySelectorAll(".animate-heading")
    // Animate headings
    headings.forEach((heading: Element) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
          },
        }
      )
    })
    // Animate team cards
    cardElements.forEach((card: Element, index: number) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      )
    })
    // Animate team images with scale effect
    imageElements.forEach((image: Element) => {
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 85%",
          },
        }
      )
    })
    // Animate content sections
    const sections = document.querySelectorAll(".animate-section")
    sections.forEach((section: Element, index: number) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      )
    })
  }, [])
  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-16 space-y-24">
        <section className="max-w-4xl mx-auto text-foreground space-y-12">
          <h1 className="animate-heading text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            About Our Project
          </h1>
          
          <div className="space-y-16">
            <section className="animate-section glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Project Overview
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                The BaDAM152 Attendance System is a modern solution designed to streamline
                the process of tracking and managing student attendance in educational
                institutions. Our system aims to eliminate the traditional paper-based
                attendance methods and provide a more efficient, accurate, and transparent
                approach.
              </p>
            </section>
            <section className="animate-section glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Why We Created This
              </h2>
              <p className="text-white/80 text-lg mb-4">
                During our time as students, we observed several challenges with
                traditional attendance systems:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-white/80 text-lg">
                <li>Time-consuming manual attendance marking</li>
                <li>Difficulty in maintaining accurate records</li>
                <li>Limited accessibility to attendance data</li>
                <li>Lack of real-time tracking and reporting</li>
              </ul>
            </section>
            <section className="animate-section space-y-6">
              <h2 className="text-2xl font-semibold text-white">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-xl transition-transform duration-300 hover:translate-y-[-4px]">
                  <h3 className="text-xl font-semibold mb-4 text-white">For Students</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>Real-time attendance tracking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>Personal attendance history</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>Detailed attendance statistics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>Mobile-friendly interface</span>
                    </li>
                  </ul>
                </div>
                
                <div className="glass-card p-6 rounded-xl transition-transform duration-300 hover:translate-y-[-4px]">
                  <h3 className="text-xl font-semibold mb-4 text-white">For Faculty</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>Quick attendance marking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>Automated reports generation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>Student attendance analytics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      <span>Bulk data management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="animate-section glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Future Plans
              </h2>
              <p className="text-white/80 text-lg mb-4">
                We are continuously working to improve the system with planned features including:
              </p>
              <ul className="space-y-3 text-white/80 text-lg">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Advanced analytics and reporting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span>Integration with learning management systems</span>
                </li>
              </ul>
            </section>
          </div>
        </section>
        <section className="max-w-7xl mx-auto">
          <h2 className="animate-heading text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="team-card glass-card border-white/[0.1] transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden team-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-center text-xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                    {member.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-white/60 font-medium mb-4">
                    {member.roll}
                  </p>
                  <div className="flex justify-center space-x-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
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
      </main>
    </div>
  )
}