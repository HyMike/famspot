import { useState, useEffect } from "react"

export const Carousel = () => {
    
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides =  [
        {
        title: "Ready to Get Started?",
        content: "Join our community today and discover amazing activities for your child. It's free to sign up and takes less than 2 minutes!",
        img: "/images/pumpkin_patch.jpg",
      },
      {
        title: "Why Parents Love FamSpot",
        content: "Over 10,000 families trust us to provide safe, educational, and fun activities for their children.",
        img: "/images/kids.jpg",
      },
      {
        title: "Perfect for Every Family",
        content: "Whether you have toddlers, preschoolers, or elementary kids, we have activities tailored just for them.",
        img: "/images/kids.jpg",
      }
    ]

    useEffect(()=> {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000) 
      return () => clearInterval(timer)
      }, [slides.length])

      
    const handleToSlide = (index:number) => {
      setCurrentSlide(index)
      
    }


    // const currentSlideData = slides[currentSlide]; 
    const currentSlideData = slides[0]; 

  
    return (
      <div className="carousel-container">
      <div className="carousel-slide">
        <img className="carousel-img" src={currentSlideData.img} /> 
        <h3 className="carousel-title">Get Suggestions Like These...</h3>
        {/* <p className="carousel-content">{currentSlideData.content}</p> */}

      </div>
      
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )


}