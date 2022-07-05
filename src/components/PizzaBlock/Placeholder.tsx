import React from 'react';
import ContentLoader from 'react-content-loader';

const Placeholder = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="135" cy="130" r="125" />
        <rect x="0" y="275" rx="10" ry="10" width="280" height="20" />
        <rect x="0" y="313" rx="10" ry="10" width="280" height="86" />
        <rect x="0" y="425" rx="10" ry="10" width="95" height="30" />
        <rect x="130" y="418" rx="25" ry="25" width="150" height="45" />
    </ContentLoader>
);

export default Placeholder;
