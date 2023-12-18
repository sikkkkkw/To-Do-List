const randimage=document.querySelector("#rand-image");
const images=["img1.jpg","img2.jpg","img3.jpg"];

const selectedimage = images[Math.floor(Math.random()*images.length)];

const img = document.createElement("img");
img.setAttribute("src",`images/${selectedimage}`);
randimage.appendChild(img);