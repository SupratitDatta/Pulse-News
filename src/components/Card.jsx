import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/card.css';

const Card = ({
  imageUrl,
  title,
  description,
  lastUpdated,
  url,
  source,
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/detail/${title}`, {
      state: { imageUrl, title, lastUpdated, source, description },
    });
  };

  const handleOriginalSite = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const trimDescription = (desc) => {
    if (!desc) return '';
    const words = desc.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + ' ...';
    }
    return desc;
  };

  const trimmedDescription = trimDescription(description);

  return (
    <div className="card-container">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        {source && <div className="card-source">{source}</div>}
        <h1 className="card-title">
          <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
        </h1>
        {description && (
          <p className="card-description">{trimmedDescription}</p>
        )}
        <div className="card-footer">
          <p className="card-last-updated">{lastUpdated}</p>
          <div className="card-button-group">
            <button onClick={handleOriginalSite} className="card-site-link-btn">
              Original Site
            </button>
            <button onClick={handleReadMore} className="card-read-more-btn">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;