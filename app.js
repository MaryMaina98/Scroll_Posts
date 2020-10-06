const postContainer= document.getElementById('post-container');
const circle= document.querySelector('.loader');
const filter= document.querySelector('#filter');


// global variables
let limit;
let page = 1;

async function getPosts(){
    limit = 6;
    const response = await 
    
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    
    const data= await response.json();
    console.log(data);


     return data;

//     .then(response =>response.json())
//     .then(data =>console.log(data))
//     .catch(err=> console.log('This is an error'))
// 
}
//Show DOM

async function showPosts(){
    const posts= await getPosts();
    console.log(posts);
    let output = ' ';
    posts.forEach(post=>{
        
        output += `
        <div class="post">
        <div class="number">${post.userId}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
            ${post.body}
            </p>
        </div> `;
})

document.getElementById('post-container').innerHTML = output;

}

//show loading and fetch more posts

 function showLoading(){
     circle.classList.add('show');
     

     setTimeout( ()=>{
      circle.classList.remove('show');
    
      setTimeout(()=>{
          page++;
          showPosts();
      }, 400);

     }, 1000);
 }


//Invoke the function
showPosts();

window.addEventListener('scroll',()=>{
const {scrollTop, scrollHeight, clientHeight} = document.documentElement
    if(scrollTop + clientHeight >= scrollHeight -6){
    showLoading();
    }
    
    console.log(document.documentElement.scrollHeight);
    console.log(document.documentElement.scrollIntoView);
    console.log(document.documentElement.scrollLeft)

})

//filter posts by input if its in the DOM
filter.addEventListener('input',(e)=>{
    const input = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')
    posts.forEach(post =>{
       const title = post.querySelector('.post-title').innerText.toUpperCase();
       const body= post.querySelector('.post-body').innerText.toUpperCase();

   if(title.indexOf(input)> -1 || body.indexOf(input)> -1){
       post.style.display ='flex';
       post.style.color ='yellow';

   }else{
     post.style.display ='none';
   }
   
   
    })

})
// function filterPosts(e){
// const
// }
