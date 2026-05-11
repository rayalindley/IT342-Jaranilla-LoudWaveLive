import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";

function PartnerPage() {
  
  const user = JSON.parse(localStorage.getItem("user"));
    console.log("User", user);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    organizationType: "",
    businessEmail: "",
    contactNumber: "",
    experience: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/partner/apply", {
        userId: user.id,
        ...formData
      });

      alert("Application submitted successfully!");
      
      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        organizationType: "",
        businessEmail: "",
        contactNumber: "",
        experience: "",
        reason: ""
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    }
  };

  return (
    <MainLayout>
        <div className="partner-page">
            <h1>Partner With LoudWave Live</h1>

            <p>
                Bring your concerts and events to a larger audience through our
                professional ticketing platform.
            </p>

            <div className="partner-benefits">
                <h2>Why Partner With Us?</h2>
                <ul>
                <li>🎯 Reach thousands of music enthusiasts</li>
                <li>🎫 Professional ticket management system</li>
                <li>📊 Real-time analytics and reporting</li>
                <li>💰 Secure payment processing</li>
                <li>📱 Modern event platform experience</li>
                <li>🚀 Promote events efficiently across channels</li>
                </ul>
            </div>

            {!user ? (
                <div className="partner-login-prompt">
                <p>
                    Please log in first before submitting a partnership application.
                </p>
                <Link to="/login">
                    <button>Log In to Continue</button>
                </Link>
                </div>
            ) : (
                <form className="partner-form" onSubmit={handleSubmit}>
                <h2>Partnership Application</h2>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="companyName"
                    placeholder="Company / Organization Name *"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="organizationType"
                    placeholder="Organization Type (e.g., Event Organizer, Venue, Promoter) *"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="businessEmail"
                    placeholder="Business Email *"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number *"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="experience"
                    placeholder="Tell us about your event experience (types of events, past successes, etc.) *"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="reason"
                    placeholder="Why do you want to partner with LoudWave Live? What are your goals? *"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit Partnership Application</button>
                </form>
            )}
        </div>
    </MainLayout>
  );
}

export default PartnerPage;