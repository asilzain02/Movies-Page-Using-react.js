const Search = (props) => {
    const {search,setsearch} = props;

    return ( 
        <div className="search">

        <div >
            <img src="./searchIcon.svg" alt="searchIcon" className="mr-2"/>
            <input className=''
             type="text"
             placeholder="Enter Movie Name"
             value={search}
             onChange={(event)=> setsearch(event.target.value)}
             />
        </div>
        </div>
     )
};
 
export default Search;
