import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      content: "amansaluja017@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone",
      content: "+91 9306234357",
      description: "Monday to Friday, 9am-6pm"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Address",
      content: "karnal, Haryana",
      description: "Visit us at our office"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Chat",
      content: "Live chat available",
      description: "Instant support during business hours"
    }
  ]

  const faqs = [
    {
      question: "How do I sign up as a service provider?",
      answer: "Click on 'Become a Provider' and fill out the registration form. Our team will verify your credentials and get you started."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, digital wallets, and bank transfers for your convenience."
    },
    {
      question: "How do I track my booking?",
      answer: "Once you book a service, you can track its status in real-time through the 'My Bookings' section in your account."
    },
    {
      question: "What's your cancellation policy?",
      answer: "You can cancel bookings up to 24 hours before the scheduled time for a full refund."
    },
    {
      question: "Are providers verified and insured?",
      answer: "Yes! All our service providers are background-checked, verified, and carry appropriate insurance coverage."
    },
    {
      question: "How does the rating system work?",
      answer: "Customers rate providers after service completion. This helps us maintain quality standards and help others find great services."
    }
  ]

  return (
    <div className="w-full">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Have questions? We're here to help. Contact our support team anytime.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactMethods.map((method, idx) => (
            <div key={idx} className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-2">
              <div className="text-blue-600 mb-4 group-hover:scale-125 transition-transform">
                {method.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{method.title}</h3>
              <p className="text-gray-800 font-semibold mb-2">{method.content}</p>
              <p className="text-gray-600 text-sm">{method.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message subject"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all hover:scale-105 group"
              >
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  ✓ Message sent successfully! We'll be in touch soon.
                </div>
              )}
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-full min-h-[600px] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-transparent opacity-20"></div>
              <div className="relative text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Find Us Here</h3>
                <p className="text-gray-600 max-w-xs">
                  Located in the heart of the city. Easy access and convenient parking available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                <details className="cursor-pointer">
                  <summary className="flex items-center justify-between p-6 font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors">
                    {faq.question}
                    <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 border-t border-gray-200 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
