import './App.css'
import tailwindcss from 'tailwindcss';
import { useEffect, useState } from 'react';
import React from 'react';
import Search from './Components/Search';
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard';
import { useDebounce } from 'react-use';
import { userSeachCount,treandingmovies } from './Appwrite';

const API_BASE_ENDPOINT = 'https://api.themoviedb.org/3';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWIzNTE0ODg1ZjJkMzhkYTg2ODBmYTJhMDkxOTBjYSIsIm5iZiI6MTc2MDkzODM1OC41OCwic3ViIjoiNjhmNWM5NzZjYmNmNWRlNWZlMTAyMDA5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.uebwScJGVvjA6dcsN27ZIlQ46Qc3giD9NwAN0GwKeeg';

const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: '/applicaton/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWIzNTE0ODg1ZjJkMzhkYTg2ODBmYTJhMDkxOTBjYSIsIm5iZiI6MTc2MDkzODM1OC41OCwic3ViIjoiNjhmNWM5NzZjYmNmNWRlNWZlMTAyMDA5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.uebwScJGVvjA6dcsN27ZIlQ46Qc3giD9NwAN0GwKeeg'
  }
};



const App=() =>{
  const [search,setsearch] = useState('');
  const [errormsg,seterrormsg] = useState("");
  const [Load,setLoad] = useState(false);
  const [MovieList,setMovieList] = useState([]); //using Array to display all movie in single list 
  const [debouncesearch,setdeboundsearch] = useState('');
  const [trending,settrending] = useState([]);

  useDebounce(() =>
      setdeboundsearch(search), 500,
  [search])

  const FetchMovies = async (query = '')=>{
    setLoad(true)
    seterrormsg("")

    try{
      const Endpoint = query ? `${API_BASE_ENDPOINT}/search/movie?query=${encodeURIComponent(query)}`
       : `${API_BASE_ENDPOINT}/discover/movie?sort_by=popularity.desc`;

      console.log('no error')

      const response = await fetch(Endpoint,API_OPTIONS);
      console.log('no respone error')

      if(!response){
        throw new Error("failed to get data");
      }
      const data = await response.json();
      console.log(data);

      console.log("success Fetched DATA");

      if(data.response == 'False'){
        seterrormsg(`Response Failed : ${data.Error}`);
        setMovieList([]);
        return; //exit the function
      }

      setMovieList(data.results);

      if(query && (data.results.length > 0)){
        await userSeachCount(query, data.results[0])
      }

  //     fetch(Endpoint, API_OPTIONS)
  // .then(res => res.json())
  // .then(json => console.log(json))
  // .catch(err => console.error(err));


    } catch (error){
      console.log(`Error Fetching : ${error}`)
      seterrormsg(error);
    }finally {
      setLoad(false)
    }  
  }

  const FetchTrending = async ()=>{
    try{
      const trendmov = await treandingmovies();
      
      settrending(trendmov)
      console.log(trending)
    }catch (error){
      console.log(`ERROR Fetching Treanding Movies : ${error}`);
    }
  }

  useEffect(() => {
    FetchMovies(debouncesearch);
  }, [debouncesearch]);

  useEffect(()=> {
   FetchTrending();
  }, [])

  return (
    <div className='base'>

    <main>
        <div className='pattern'/>
          <div className='wrapper'>
              
              <header>
                <img  src='./hero-img.png' alt="Banner" />
                <h1><span className='text-gradient'>Movies</span><br/><span className='text-green-200'> Find Here</span></h1>
                <Search search={search} setsearch={setsearch}/>
                {search ? <h2 className='text-white text-2xl mt-8'> Result : {search}</h2> : null }
              </header>

              {console.log(`i am trenading: ${trending}`)}

              {trending.length > 0 && (
                <section className='trending'>
                <h2>
                  Trending in India
                </h2>
                <ul>
                  {trending.map((movie,index)=>(
                    <li key = {movie.$id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} />
                      {/* <p>{movie.count}</p> */}
                    </li>
                  ))}
                </ul>

              </section>
              )}
              
              
              <section className='all-movies'>
                <h2 ><span className='text-gradient'>Movie Section</span></h2>
                {Load ? (<Spinner/>) : errormsg ? (<p className='text-red-500'>{errormsg}</p>) : (
                  <ul>
                    {MovieList.map((movie) =>(
                      <MovieCard key={movie.id} movie={movie}/>
                    ))}
                  </ul>
                )}
                  

              </section>
              
              
                

          </div>

        
    </main>
    </div>
  )
};

export default App





