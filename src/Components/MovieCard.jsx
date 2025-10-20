const MovieCard = (props) => {
    const{movie:{title,poster_path,original_language,vote_average,popularity,release_date}} = props;
    return ( 
        <div className="movie-card" >
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './no-image.png'} />
             <div className="text-white mt-2">
                <h4 className="my-8 p-2 border rounded-lg border-blue-600 ">
                {title}
                </h4>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg"/>
                    </div>
                    <p className="font-bold">
                        {vote_average ? `${vote_average.toFixed(1)}` : 'No Ratings'}
                    </p>
                    <span>-</span>
                    <p className="pr-1">{original_language}</p>
                    <div className="rating">
                        <img src='searchIcon.svg' />
                    </div>
                    <p>{popularity ? `${popularity.toFixed(0)}` : '0'}</p>
                    <span>¤</span>
                    <p >{release_date ? `${release_date.split('-')[0]}`: 'Yet to be Released'}</p>
                </div>
             </div>
        </div>
       
     );
}
 
export default MovieCard;