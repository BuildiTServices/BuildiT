const fs = require('fs');
const img = fs.readFileSync('./public/buildit-logo.jpg').toString('base64');
const svg = `<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleView">
      <rect width="256" height="256" rx="64" ry="64" />
    </clipPath>
  </defs>
  <image width="256" height="256" href="data:image/jpeg;base64,${img}" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
fs.writeFileSync('./public/favicon.svg', svg);
