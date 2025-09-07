
fetch("https://openapi.programming-hero.com/api/categories")
.then((res)=> res.json())
.then((data)=>{
    console.log(data);
    displayData(data);
})

const displayData = (catagories)=>{
    const display = document.getElementById('display')
    display.innerHTML='';
   

    catagories.forEach(dataList=>{
        console.log(dataList);

        const dataDiv = document.createElement('div'); 

        dataDiv.innerHTML=`<h2 class="font-bold text-lg">${dataList.category_name}</h2>`

        display.appendChild(dataDiv);

    });
       
}