
const clearContainer = id =>{
    const clearArea = document.getElementById(id);
    clearArea.value= '';
}

document.getElementById('search_btn').addEventListener('click',()=>{
    const inputField = document.getElementById('input_field');
    const inputValue = inputField.value ;
    clearContainer('input_field');
     fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(rcvData=>rcvData.json())
    .then(data => showSearchResult(data.data))
    
})

const showSearchResult = arrayOfObjects =>{
    const parent = document.getElementById('append_search');
    parent.textContent='';
    arrayOfObjects.forEach(object => {
      const newDiv = document.createElement('div')
      newDiv.innerHTML= `
      <div onclick="fetchDetails('${object.slug}')" class="bg-orange-500 rounded shadow p-5">
           <div>
               <img src="${object.image}" alt="">
           </div>
           <h1>brand : ${object.brand}</h1>
           <p>Name : ${object.phone_name.slice(0,50)}</p>
      ` 
      parent.appendChild(newDiv);      
   });
}

const fetchDetails = id =>{
    fetch( `https://openapi.programming-hero.com/api/phone/${id}`)
    .then(rcvData=>rcvData.json())
    .then(data=>showDetails(data.data))
}

const showDetails = data =>{
    console.log(data.releaseDate)
   const parent = document.getElementById('append_details');
   parent.textContent='';
   const newDiv =document.createElement('div');
   newDiv.innerHTML = `
   <div class="bg-orange-500 rounded shadow p-5">
   <div>
       <img src="${data.image}" alt="">
   </div>
   <h1>Name :${data.name}</h1>
   <p>description:${data.releaseDate.slice(0,50)}</p>
                      `
    parent.appendChild(newDiv)
    
}
