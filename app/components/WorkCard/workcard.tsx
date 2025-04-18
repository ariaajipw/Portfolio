'use client'

import React from "react";

const works = [
  {
    id: 1,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Hubton",
    subtitle: "Internship as web developer at Hubton Indonesia, i'm focusing on front-end side as a developer, doing some task for website front page",
  },
  {
    id: 2,
    thumbnail: "hubton.com",
    title: "Sajua Brewery",
    subtitle: "Build e-commerce website.",
  },
  {
    id: 3,
    thumbnail: "https://via.placeholder.com/400x300",
    title: "Lorem, ipsum.",
    subtitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  // {
  //   id: 4,
  //   thumbnail: "https://via.placeholder.com/400x300",
  //   title: "Project Keempat",
  //   subtitle: "Ini adalah deskripsi singkat dari project keempat.",
  // },
  // {
  //   id: 5,
  //   thumbnail: "https://via.placeholder.com/400x300",
  //   title: "Project 5",
  //   subtitle: "Ini adalah deskripsi singkat dari project keempat.",
  // },
];

const WorkCards: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-10 mb-18">Projects and Works</h1>
      <div className="grid grid-cols-1 gap-6 w-3xl">
        {works.map((work) => (
          <div
            key={work.id}
            className="bg-black dark:bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 grid grid-cols-2"
          >
            <div className="p-4 grid-cols-2">
              <h2 className="text-white dark:text-gray-900 text-xl font-semibold mb-2">{work.title}</h2>
              <p className="text-white dark:text-gray-900">{work.subtitle}</p>
            </div>
            
            <img
              src={work.thumbnail}
              alt={work.title}
              className="w-full h-60 "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkCards;