import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Users, Shield, TrendingUp } from "lucide-react";

export default function IndexPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Booking",
      description: "Book services in seconds with our simple and fast booking process"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Professionals",
      description: "Connect with verified and experienced service providers"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Your bookings and payments are fully secured and protected"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Best Prices",
      description: "Competitive pricing from trusted local service providers"
    }
  ];

  const categories = [
    { name: "Plumbing", icon: "🔧" },
    { name: "Electrical", icon: "⚡" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Painting", icon: "🎨" },
    { name: "Carpentry", icon: "🪵" },
    { name: "Gardening", icon: "🌱" },
    { name: "AC & Repair", icon: "❄️" },
    { name: "More", icon: "➕" }
  ];

  return (
    <div className="w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Local Services, One Tap Away
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Booklio connects you with trusted local service providers for all your home and business needs. Quality services, verified professionals, transparent pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/home")}
                  className="flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 group"
                >
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-transparent rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-2xl p-4 text-center hover:bg-white/30 transition-all">
                    <div className="text-3xl mb-2">10K+</div>
                    <div className="text-sm">Services</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 text-center hover:bg-white/30 transition-all">
                    <div className="text-3xl mb-2">5K+</div>
                    <div className="text-sm">Providers</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 text-center hover:bg-white/30 transition-all">
                    <div className="text-3xl mb-2">50K+</div>
                    <div className="text-sm">Happy Users</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 text-center hover:bg-white/30 transition-all">
                    <div className="text-3xl mb-2">4.9⭐</div>
                    <div className="text-sm">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Browse Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl p-6 text-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-gray-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Booklio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group"
              >
                <div className="text-blue-600 mb-4 group-hover:scale-125 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers finding trusted local services
          </p>
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 group"
          >
            Browse Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
