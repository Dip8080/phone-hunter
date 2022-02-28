
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
   arrayOfObjects.forEach(object => {
      console.log(object)
      const newDiv = document.createElement('div')
      newDiv.innerHTML= `
      <div class="bg-orange-500 rounded shadow-lg p-5">
           <div>
               <img src="${object.image}" alt="">
           </div>
           <h1>brand : ${object.brand}</h1>
           <p>Name : ${object.phone_name.slice(0,50)}</p>
      ` 
      parent.appendChild(newDiv);      
   });
}

