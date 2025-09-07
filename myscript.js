
fetch("https://openapi.programming-hero.com/api/categories")
.then(res => res.json())
.then(data => {
    console.log("Full API Response:", data);
    console.log("Categories only:", data.categories);
    console.log("Is Array?", Array.isArray(data.categories));

    displayData(data.categories);
})


const displayData = (categories) => {
    const display = document.getElementById('display01');
    display.innerHTML = '';

   

    categories.forEach(category => {
        const dataDiv = document.createElement('div');
        dataDiv.innerHTML = `
            <h2 class="text-lg">${category.category_name}</h2>
            
        `;
        display.appendChild(dataDiv);
    });
};
 


