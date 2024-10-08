import React from 'react';

interface PersonGroupProps {
  imageUrls: string[];
}

const PersonGroup: React.FC<PersonGroupProps> = ({ imageUrls }) => {
  return (
    <div>
      {imageUrls.map((url, index) => (
        <img
          key={index}
          alt={`Person ${index + 1}`}
          src={url}
          className={`relative z-${30 - index * 10} inline-block h-8 w-8 rounded-full ring-2 ring-white`}
        />
      ))}
    </div>
  );
};

export default PersonGroup;
