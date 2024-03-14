const RecipeCard = ({ name, difficulty, prepTime, cookTime, image }) => {
  return (
    <div className='recipe-card card hover:shadow-lg transition ease-linear transform hover:scale-105'>
      <div className='image-placeholder max-h-30'>
        <img src={image} alt={name} className='object-cover object-center ' />
      </div>
      <p className='text-left font-bold'>{name}</p>
      <p className='text-left text-slate-400/75'>
        Difficulty Level: {difficulty}
      </p>
      <div className='flex '>
        <p className='text-left text-white bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 '>
          Prep Time: {prepTime} Mins
        </p>
        <p className='text-left text-white bg-green-700   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gree-600'>
          Cook Time: {cookTime} Mins
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
