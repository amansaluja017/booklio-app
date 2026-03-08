import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Heart, Target, Eye, Award, Users, Zap } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "We prioritize customer satisfaction and deliver exceptional service quality"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Reliable",
      description: "Consistent, dependable service from verified professionals you can trust"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovative",
      description: "Leveraging technology to make booking services easier and faster"
    }
  ]

  const stats = [
    { number: "50K+", label: "Users" },
    { number: "5K+", label: "Providers" },
    { number: "10K+", label: "Services" },
    { number: "100K+", label: "Bookings" }
  ]

  return (
    <div className="w-full">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Booklio</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Transforming the way people find and book local services with transparency, quality, and convenience
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Booklio was founded in 2023 with a simple mission: to connect people with trusted local service professionals instantly.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We began by noticing the gap in the market - finding a reliable plumber, electrician, or cleaner was too time-consuming and unreliable. We built Booklio to solve this problem.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we've connected thousands of customers with skilled professionals across various service categories. We're committed to maintaining the highest standards of quality and transparency.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-transparent rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-12 text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Eye className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Our Vision</h3>
                    <p>Making quality services accessible to everyone</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Target className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Our Mission</h3>
                    <p>Connect customers with trusted professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Our Promise</h3>
                    <p>Quality, transparency, and reliability always</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-blue-600 mb-4 group-hover:scale-125 transition-transform">
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center hover:scale-110 transition-transform">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
