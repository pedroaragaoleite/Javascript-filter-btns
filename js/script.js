const recipesCenter = document.querySelector('.recipes__center');
const filterBtns = document.querySelectorAll('.filter-btn');
const recipesBtn = document.querySelector('.recipes__btns');


// Load JSON file
const xhr = new XMLHttpRequest();
xhr.open('GET', '../receitas.json', true);
xhr.send();
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        let recipes = JSON.parse(this.responseText);
        displayRecipesItems(recipes);
        displayRecipesButtons();
        // console.log(recipes);


        // function display recipes buttons
        function displayRecipesButtons() {
            // Add category "All" to all recipes
            const categories = recipes.reduce(
              function (values, item) {
                  // add categoty to the array
                if (!values.includes(item.category)) {
                  values.push(item.category);
                }
                return values;
              },
              // add all to category
              ["all"]
            );

            // Create the buttons
            const categoryBtns = categories.map(function (category) {
                return `<button type="button" class="filter-btn" data-id=${category}>${category}
                        </button>`;
            })
            // removes the coma of the string
            .join("");
            
            // add the btns to HTML
            recipesBtn.innerHTML = categoryBtns;
            const filterBtns = recipesBtn.querySelectorAll(".filter-btn");
           

            // Filter Buttons
            filterBtns.forEach(function(btn) {
                btn.addEventListener('click', function(e){
                    // Get the id's from the btns
                    const category = e.currentTarget.dataset.id;
                    const recipeCategory = recipes.filter(function(recipeItem) {                        
                        if(recipeItem.category == category) {                           
                            return recipeItem;
                            
                        }
                    })
                    // if category button === all load all recipes
                    if (category === 'all') {
                        displayRecipesItems(recipes);
                    // else load only the btn category
                    } else {
                        displayRecipesItems(recipeCategory);
                        // console.log((recipeCategory));
                    }
                });
            });

        }
                
                    
        // function create and load recipes in HTML
        function displayRecipesItems(recipes) {
            recipesCenter.innerHTML = '';

            for(let recipe of recipes) {
                // console.log(recipe.title);
                recipesCenter.innerHTML += `
                <article class="recipes__item">
                    <img class="recipes__img" src="${recipe.image}" alt="" />
                    <div class="recipes__name">
                        <h4>${recipe.title}</h4>
                    </div>
                    <p class="recipes__text">
                        ${recipe.subtitle}                    
                    </p>
                </article>            `
            }
        } 
    }
}

