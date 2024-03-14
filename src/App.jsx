import { useEffect, useState } from 'react';
import './App.css';
import RecipeCard from './components/RecipeCard';

function App() {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [searchDifficulty, setSearchDifficulty] = useState('');

  //Gets first 8 recipes when the page loads
  useEffect(() => {
    fetch('https://dummyjson.com/recipes?limit=8')
      .then((response) => response.json())
      .then((json) => {
        setResults([...json.recipes]);
      });
  }, []);

  //Filters the data directly from the API. In a full app I would rather save from DB then use SQL to pull filtered data
  const fetchData = () => {
    // Grabs all the data from the API
    fetch('https://dummyjson.com/recipes')
      .then((response) => response.json())
      .then((json) => {
        let filteredData = [];
        //If there is any text in the search bar it filters by the text
        if (searchText) {
          filteredData = json.recipes.filter((data) => {
            return data.name.toLowerCase().includes(searchText.toLowerCase());
          });
          //if not is passes the data unfiltered
        } else {
          filteredData = [...json.recipes];
        }

        //If difficulty has been set then the data is filtered
        if (searchDifficulty) {
          filteredData = filteredData.filter((data) => {
            return data.difficulty.includes(searchDifficulty);
          });
        }

        //If prep time has been set then the data is filtered
        if (searchTime) {
          switch (searchTime) {
            case '-15':
              filteredData = filteredData.filter((data) => {
                return data.prepTimeMinutes <= 15;
              });
              break;
            case '+15':
              filteredData = filteredData.filter((data) => {
                return data.prepTimeMinutes >= 15;
              });
              break;
            case '+30':
              filteredData = filteredData.filter((data) => {
                return data.prepTimeMinutes >= 30;
              });
              break;
          }
        }

        setResults(filteredData);
      });
  };

  return (
    <div className='recipe-search-page'>
      <header>
        <h1 className='text-3xl font-extrabold pt-6'>Recipe Search Page</h1>
      </header>
      <main>
        <div className='search-bar flex flex-wrap items-center justify-between gap-4 p-4 border-b border-gray-300 min-w-[800px]'>
          <input
            type='text'
            name='search'
            placeholder='Search for Recipe Name...'
            className='flex-1 p-2 border-2 border-gray-300 rounded'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            name='difficulty'
            className='p-2 border-2 border-gray-300 rounded'
            value={searchDifficulty}
            onChange={(e) => setSearchDifficulty(e.target.value)}
          >
            <option value=''>Difficulty</option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
          </select>
          <select
            name='total-time'
            className='p-2 border-2 border-gray-300 rounded'
            value={searchTime}
            onChange={(e) => setSearchTime(e.target.value)}
          >
            <option value=''>Total Time to Make</option>
            <option value='-15'>15 minutes or less</option>
            <option value='+15'>15-30 minutes</option>
            <option value='+30'>30 minutes or more</option>
          </select>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
            onClick={fetchData}
          >
            Search
          </button>
        </div>
        <div className='results mt-8 grid md:grid-cols-3 gap-10'>
          {/* Loops through the results but limits them to 8 */}
          {results.slice(0, 8).map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                name={recipe.name}
                difficulty={recipe.difficulty}
                prepTime={recipe.prepTimeMinutes}
                cookTime={recipe.cookTimeMinutes}
                image={recipe.image}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
