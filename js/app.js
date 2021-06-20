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

let counter = 0;

function images (name, src) {
    this.name = name ; 
    this.src = `./assets/${src}`;
    this.views =0;
    images.all.push(this);
    //console.log(this.src);
    
};

images.all = [];

for(let i =0; i < pic.length ; i++){
    //console.log(pic.length);
    new images(pic[i].split('.')[0], pic[i]);

//console.log(i);
};

function render(){
    let leftIndex = randomNumber(0, pic.length - 1);
    let midleIndex;
    let rightIndex;
    //console.log(render);

    do {
        midleIndex = randomNumber(0, pic.length - 1);
        rightIndex = randomNumber(0, pic.length - 1);
    } while ( midleIndex === rightIndex || midleIndex === leftIndex  || leftIndex === rightIndex );
    

    leftImage.src = images.all[leftIndex].src;
    midleImage.src = images.all[midleIndex].src;
    rightImage.src = images.all[rightIndex].src;

    images.all[leftIndex].views++;
    images.all[midleIndex].views++;
    images.all[rightIndex].views++;

    console.log(images.all);

};
function eventRandom (event) {
    if((event.target.id === rightImage || event.target.id === leftImage || event.target.id === midleImage ) && counter < 25);
    render();
    counter++

};

imageContainer.addEventListener('click' , eventRandom);


/*const viewResult = document.getElementById('result'); 
let eventRandom = 'images';

viewResult.addEventListener('click', function(){
console.log(eventRandom);
someString = 'images Again';
})*/

// images.prototype.result(this.views , counter) {
//     console.log(result);
//     document.getElementById('finalResult').innerHTML = `${this.name}, had ${click}, vote , and was seen ${views}, times`

    
// }



render();









function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min ); 
  }