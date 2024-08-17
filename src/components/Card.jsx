import React from "react";

const Card = ({ src, title, date }) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mt-10 max-h-96">
			<img className="w-full max-h-40 bg-contain" src={src} alt="Sample" />
			<div className="px-6 py-4">
				<span className="text-black font-bold text-xl mb-2">{title}</span>
				<p className="text-gray-700 text-base">Release Year : {date}</p>
			</div>
		</div>
	);
};

export default Card;
