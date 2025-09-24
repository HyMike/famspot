import { useState } from 'react'
import './App.css'
import api from "../src/services/api";


interface SignupFormData {
  name: string
  email: string
  zipCode: string
  ageRange: string

}

function App() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    zipCode: '',
    ageRange: '',
    email: "",
    
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    api.post("/users/signup", formData);
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  return (
    <div className="app">
  
      {/* Features Section */}
      {/* <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose FamSpot?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👶</div>
              <h3>Safe & Secure</h3>
              <p>All activities are vetted for safety with background-checked instructors and secure locations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Educational</h3>
              <p>Every activity is designed to promote learning and development appropriate for your child's age.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👶</div>
              <h3>Age-Appropriate</h3>
              <p>Activities are carefully curated for specific age ranges to ensure maximum engagement and safety.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Local Focus</h3>
              <p>Find activities in your neighborhood and connect with other families in your area.</p>
            </div>
          </div>
        </div>
      </section> */}

  

      {/* Signup Section */}
      <section className="signup-section">
        <div className="container">
          <div className="signup-content">
          <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Give Your Child the Best Start in Life
          </h1>
          <p className="hero-subtitle">
            Join thousands of parents who trust FamSpot to provide safe, educational, 
            and fun activities for their children. From toddlers to elementary school, 
            we've got your family covered.
          </p>
          <div className="hero-stats">
            <div className="stat">  
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Happy Families</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Activities</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </section>
            
            <div className="signup-form-container">
              {!isSubmitted ? (
                <form className="signup-form" onSubmit={handleSubmit}>
                  <h3>Create Your Account</h3>
                  <div className="form-group">
                    <label htmlFor="name">Parent's Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your Email"
                      title="Please enter a Email"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your ZIP code"
                      pattern="[0-9]{5}"
                      title="Please enter a valid 5-digit ZIP code"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="ageRange">Child's Age Range</label>
                    <select
                      id="ageRange"
                      name="ageRange"
                      value={formData.ageRange}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select age range</option>
                      <option value="toddler">Toddler (0-3 years)</option>
                      <option value="preschool">Preschool (3-5 years)</option>
                      <option value="elementary">Elementary (5-10 years)</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Join FamSpot Today
                  </button>
                  
                  <p className="form-disclaimer">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">🎉</div>
                  <h3>Welcome to FamSpot!</h3>
                  <p>Thank you for joining our community. We'll be in touch soon with personalized activity recommendations for your family.</p>
                  <button 
                    className="submit-btn"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: '', zipCode: '', ageRange: '' })
                    }}
                  >
                    Sign Up Another Family
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

          {/* Testimonials Section */}
          <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Parents Are Saying</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"FamSpot has been a game-changer for our family. My 4-year-old loves the activities and I love knowing he's safe and learning."</p>
              <div className="testimonial-author">- Sarah M., Mom of 2</div>
            </div>
            <div className="testimonial">
              <p>"Finally, a platform that understands what parents need. The age-appropriate activities are perfect for my elementary school kids."</p>
              <div className="testimonial-author">- Michael R., Dad of 3</div>
            </div>
            <div className="testimonial">
              <p>"The local focus is amazing. We've met so many great families in our area through FamSpot activities."</p>
              <div className="testimonial-author">- Jennifer L., Mom of 1</div>
            </div>
          </div>
        </div>
      </section>

  
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 FamSpot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
