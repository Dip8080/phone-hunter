
const clearContainer = id =>{
    const clearArea = document.getElementById(id);
    clearArea.value= '';
}

document.getElementById('search_btn').addEventListener('click',()=>{
    const inputField = document.getElementById('input_field');
    const inputValue = inputField.value ;
    if(inputValue==''){
        alert('enter something')
    }
    clearContainer('input_field');
     fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(rcvData=>rcvData.json())
    .then(data => showSearchResult(data.data))
/*     .catch(error=>{
        alert('no data found',error)
    }) */
    
})

const showSearchResult = arrayOfObjects =>{
    if(arrayOfObjects.length==0){
        alert('no result found')
    }
    const parent = document.getElementById('append_search');
    const parent2 = document.getElementById('append_details');
    parent2.textContent='';
    parent.textContent='';
    arrayOfObjects?.forEach(object => {
      const newDiv = document.createElement('div')
      newDiv.innerHTML= `
      <div onclick="fetchDetails('${object.slug}')" class="flex justify-center bg-orange-500 rounded shadow p-5">
           <div>
               <img class="py-3" src="${object.image}" alt="">
               <h1>brand : ${object.brand}</h1>
           <p>Name : ${object.phone_name.slice(0,50)}</p>
           </div>
       
      </div>
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
   <div class="grid g-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2  bg-orange-500 rounded shadow p-3">
   <div class="px-3 mt-6 w-86">
       <img class="" src="${data.image}" alt="">
       <h1 class=" antialiased text-xl mt-2">Brand :<span class="text-xl"> ${data.brand} </span></h1>
   </div>
     <div class=" py-2 px-4">
   <h1 class=" antialiased text-xl mt-2">Name :<span class="text-base"> ${data.name} </span></h1>
   <p  class=" antialiased text-xl">Release date :<span class ="text-base">
    ${data.releaseDate.slice(0,50) ? data.releaseDate:'sorry, Not found'} <span></p>
   <p class = " pt-3 antialiased" > <span class="text-xl"> Mainfeature : </span>    <br>
   chipset : ${data.mainFeatures.chipSet} <br>
   displaySize : ${data.mainFeatures.displaySize}<br>
   memory : ${data.mainFeatures.memory} <br>
   storage : ${data.mainFeatures.storage} <br>
   </P>
   <p class="mt-2 antialiased"> <span class="text-xl"> Sensors : </span><br>
     ${data.mainFeatures.sensors[0]} <br>
     ${data.mainFeatures.sensors[1]} <br>
     ${data.mainFeatures.sensors[2]} <br>
     ${data.mainFeatures.sensors[3]}
   </p>
     </div>
    </div>                  `
    parent.appendChild(newDiv)
    
}
