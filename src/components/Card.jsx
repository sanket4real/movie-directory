import React from "react";

const Card = ({ src, title, date }) => {
	return (
		<div
			tabIndex="0"
			className="max-w-md rounded overflow-hidden shadow-lg bg-white mt-10 max-h-96 w-full sm:max-w-1/2 lg:w-1/4 xl:w-1/5">
			<img
				className="object-contain max-h-72 w-[100%]"
				src={src}
				alt={`${title} poster`}
			/>
			<div className="px-6 py-4">
				<h4 className="text-black font-bold text-xl mb-2">{title}</h4>
				<p className="text-gray-700 text-base">Release Year : {date}</p>
			</div>
		</div>
	);
};

export default Card;
