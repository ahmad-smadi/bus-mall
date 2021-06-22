'use strict';

let pic = [
'bag.jpg' ,
'banana.jpg',
'bathroom.jpg', 
'boots.jpg',
'breakfast.jpg',
'bubblegum.jpg',
'chair.jpg',
'cthulhu.jpg',
'dog-duck.jpg',
'dragon.jpg',
'pen.jpg',
'pet-sweep.jpg',
'scissors.jpg',
'shark.jpg',
'sweep.png',
'tauntaun.jpg',
'unicorn.jpg',
'usb.gif',
'water-can.jpg',
'wine-glass.jpg'
  
];
//console.log('pic');
let imageContainer = document.getElementById('imageContainer')
let leftImage = document.getElementById('leftImage');
let midleImage = document.getElementById('midleImage');
let rightImage = document.getElementById('rightImage');
let finalResult = document.getElementById('finalResult');
let result = document.getElementById('result');

let counter = 0;

function images (name, src) {
    this.name = name ; 
    this.src = `./assets/${src}`;
    this.views =0;
    this.click = 0;
    images.all.push(this);
    //console.log(this.src);
    
};

images.all = [];


//console.log(i);

let leftIndex;
let midleIndex;
let rightIndex;
let veiwImage = [];

function render(){
    do {
        leftIndex = randomNumber(0, pic.length - 1);
        midleIndex = randomNumber(0, pic.length - 1);
        rightIndex = randomNumber(0, pic.length - 1);
    } while ( midleIndex === rightIndex || midleIndex === leftIndex  || leftIndex === rightIndex  || veiwImage.includes(leftIndex) || veiwImage.includes(midleIndex) || veiwImage.includes(rightIndex) );
    
    

    leftImage.src = images.all[leftIndex].src;
    midleImage.src = images.all[midleIndex].src;
    rightImage.src = images.all[rightIndex].src;

    images.all[leftIndex].views++;
    images.all[midleIndex].views++;
    images.all[rightIndex].views++;
//console.log(veiwImage);
    veiwImage=[];
    veiwImage.push(leftIndex, midleIndex , rightIndex );
    //console.log(images.all);
    imageContainer.addEventListener('click' , eventRandom);
};


function eventRandom (event) {
    console.log(counter);
    if(((event.target.id === 'rightImage' || event.target.id === 'midleImage' ) || event.target.id === 'leftImage' ) && counter < 25 ){
        
        if (event.target.id === 'rightImage'){
            images.all[leftIndex].click++; 
        } else if (event.target.id === 'midleImage'){
            images.all[midleIndex].click++;
        }else if (event.target.id === 'leftImage'){
            images.all[rightIndex].click++;
        }
       
        render();
    counter++
    
    } else if (counter = 25 ){
        // imageContainer.removeEventListener('click' , eventRandom);
       
        makeChart();
        localStorage.setItem( 'images', JSON.stringify( images.all ) );
    } 
}
    
//console.log(counter);
function listItems (e){
    for (let i =0; i < images.all.length ; i++){
        let li = document.createElement('li');
        finalResult.appendChild(li);
        li.textContent = `${images.all[i].name} had ${images.all[i].click} votes , and was seen ${images.all[i].views} times .`
    }
   
    result.removeEventListener('click' , listItems)
    
}

function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min ); 
  }

  function makeChart() {

    let name = [];
    let views = [];
    let click = [];
  
    for(let i = 0; i < images.all.length; i++) {
      name.push(images.all[i].name);
      views.push(images.all[i].views);
      click.push(images.all[i].click);
    }
  
    let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  
    let myChart = new Chart( ctx, {
      type: 'bar',
      data: {
        labels: name,
        datasets: [{
          label: 'view',
          data: views,
          backgroundColor: 'rgb(57, 162, 219)' ,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 10
        },
        {
            label: 'click',
          data: click,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 10

        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    } );
  
  }

  result.addEventListener('click' ,listItems  );
  
    function localData() {
     let data = JSON.parse(localStorage.getItem('images')); 
     console.log(data)
     if (data) {
       images.all = data;
     }else
        {
        for(let i =0; i < pic.length ; i++){
          new images(pic[i].split('.')[0], pic[i]);
      
       }
     }
    
     render();
  }
    //console.log(data[i].name)
 
    localData();