import React from 'react';
import '../css/topic.css';

const Topic = ({ title, onClick, style }) => {
  return (
    <div className='topic-container'>
      <a onClick={onClick}>
        <h3 style={style} className='topic-title'>
          {title}
          <span className='topic-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </span>
        </h3>
      </a>
    </div>
  );
};

export default Topic;
