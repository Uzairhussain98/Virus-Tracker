import React from 'react'
import useWebAnimations from "@wellyshen/use-web-animations";
import virus from '../components/virus.png'


const Header = () => {

    const { ref, } = useWebAnimations({
        keyframes: [
          { transform: 'rotate(0)' } ,
          { transform: 'rotate(360deg)' }
        ],
        timing: {
          duration: 2000, // Run for 1000ms
          iterations: Infinity, // Repeat once
           direction:"alternate",// Run the animation forwards and then backwards
          easing: "ease-in-out", // Use a fancy timing function
      }}
        );


  
  
  
    return (
    <div>
        <div style={{textAlign:"center"}} >
  <img  ref={ref} src={virus} alt="corona" style={{width:"130px" ,height :"130px"}}/>
  <h1>Covid-19 Tracker</h1>
  </div>
      
    </div>
  )
}

export default Header
