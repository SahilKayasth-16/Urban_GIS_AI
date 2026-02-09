import "../styles/VideoBackground.css";
import bgVideo from "../assets/video/urban_gis_ai_bg.mp4";

const VideoBackground = () => {
  return (
    <div className="video-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
        poster="fallback.jpg"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="video-overlay"></div>
    </div>
  );
};

export default VideoBackground;
