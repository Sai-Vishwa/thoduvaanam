import { motion } from "framer-motion";
import { useEffect } from "react";
import '../../index.css'
import './About.scss'

function AboutUs(){
    useEffect(() => {
        const font = new FontFace("Liberty", "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf')");
        font.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
        });
      }, []);
    
      return (
        <div className="main flex items-center justify-center h-screen w-screen">
          
          <div className="container">
  <svg viewBox="0 0 960 300">
    <symbol id="s-text">
      <text textAnchor="middle" x="50%" y="80%" className="text-3xl">ABOUT AADUKALAM</text>
    </symbol>

    <g className = "g-ants">
      <use  xlinkHref="#s-text" className="text-copy"></use>
      <use xlinkHref="#s-text" className="text-copy"></use>
      <use xlinkHref="#s-text" className="text-copy"></use>
      <use xlinkHref="#s-text" className="text-copy"></use>
      <use xlinkHref="#s-text" className="text-copy"></use>
    </g>
  </svg>
</div>
        </div>
      );
}

export default AboutUs;