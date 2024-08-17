import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const MovieApp = () => {
	const [searchQuery, setSearchQuery] = useState();
	const [movies, setMovies] = useState([]);
	const [sortBy, setSortBy] = useState("popularity.desc");
	const [genre, setGenre] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("");

	useEffect(() => {
		const fetchGenre = async () => {
			const response = await axios.get(
				`https://api.themoviedb.org/3/genre/movie/list`,
				{
					params: {
						api_key: import.meta.env.VITE_MOVIE_KEY,
					},
				}
			);
			setGenre(response.data.genres);
		};
		fetchGenre();
	}, []);
	useEffect(() => {
		const fetchMovies = async () => {
			const response = await axios.get(
				`https://api.themoviedb.org/3/discover/movie`,
				{
					params: {
						api_key: import.meta.env.VITE_MOVIE_KEY,
						sortBy: sortBy,
						page: 1,
						with_genres: selectedGenre,
						query: searchQuery,
					},
				}
			);
			setMovies(response.data.results);
		};
		fetchMovies();
	}, [searchQuery, sortBy, selectedGenre]);

	const handleSearchChange = (e) => {
		e.preventDefault();
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/movie`,
			{
				params: {
					api_key: import.meta.env.VITE_MOVIE_KEY,
					query: searchQuery,
				},
			}
		);

		setMovies(response.data.results);
		console.log(movies);
	};

	const handleSortBy = (e) => {
		setSortBy(e.target.value);
	};

	const handleGenreChange = (e) => {
		setSelectedGenre(e.target.value);
	};

	return (
		<div className="p-3">
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-500  md:text-5xl lg:text-6xl text-center">
				Block <span className="text-yellow-400">Buster</span>
			</h1>

			<div className="max-w-2xl mx-auto">
				<label
					htmlFor="default-search"
					className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
					Search
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="search-input block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search Movies..."
						required
					/>
					<button
						onClick={handleSearchSubmit}
						type="submit"
						className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Search
					</button>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row max-w-2xl mx-auto gap-4 mt-3">
				<div className="sm:w-[50%] w-full">
					<label
						htmlFor="sort-by"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Sort By :
					</label>
					<select
						id="sort-by"
						onChange={handleSortBy}
						value={sortBy}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option defaultValue>Choose an option</option>
						<option value="popularity.desc">Popularity Descending</option>
						<option value="popularity.asc">Popularity Ascending</option>
						<option value="vote_average.desc">Rating Descending</option>
						<option value="vote_average.asc">Rating Ascending</option>
						<option value="release_date.desc">Release Date Descending</option>
						<option value="release_date.asc">Release Date Ascending</option>
					</select>
				</div>
				<div className="sm:w-[50%] w-full">
					<label
						htmlFor="genre"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Genre :
					</label>
					<select
						id="genre"
						value={selectedGenre}
						onChange={handleGenreChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option defaultValue>Choose a genre</option>
						{genre.map((item) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex flex-wrap gap-10 mt-5">
				{movies.map((movie) => (
					<Card
						key={movie.id}
						title={movie.title}
						date={movie.release_date}
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
					/>
				))}
			</div>
		</div>
	);
};

export default MovieApp;
