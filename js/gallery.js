
//Picture Objects
// will hold file name for small and large photo taken from first array of picture names...
class Picture {

    smallPicture = "";
    bigPicture = "";
    gray = false;
    constructor(small,large){
        this.smallPicture = small;
        this.bigPicture = large;
        focused: false

    }

    setGray(){
        if(this.gray == false){
            this.gray = true;
        }
        else{
            this.gray = false;
        }
    }

    getGray(){
        return this.gray;
    }

    getSmallPicture(){
        // console.log("inside get small pic");
        return this.smallPicture;
    }
    getLargePicture(){
        return this.bigPicture;
    }
    
};

//Picture constructor to hold data for it...


var galleryPosition = 0;

//hold the current position of window slider on the gallery array. 
var gallerySlider = [0,1,2,3,4];

var galleryImages = [];


// Grab img node which displays main picture
const displayPicture = document.querySelector('figure img');

//grab container which holds multiple choices of pictures to display
const picturePool =  document.querySelector('section div ul');

//grab prevous button
const buttonPrev = document.getElementById("button-previous");

//grab next button
const buttonNext = document.getElementById("button-next");

//flower array
const picArray = ["flowers-pink-small", "flowers-purple-small", "flowers-red-small", "flowers-white-small", "flowers-yellow-small", 
    "flowers-red2-small", "flowers-brown-small", "flowers-rnb-small", "flowers-philly-small", "flowers-green-small"];

const picObjArray = [];

//picturePool.style.border = "5px green solid";

//shift photos backwards
buttonPrev.addEventListener('click', function(){

    //get new slider
    positionLogic("backwards");

    //update imgs in UL
    updateImages();

    console.log("PREVIOUS pressed.");

});

//shift photos forward
buttonNext.addEventListener('click', function(){

    //everything moves once to the left.
    //position up one
    galleryPosition++;

    //positioning logic first
    var oldPos = positionLogic("forward");

    //update imgs in UL
    updateImages();
});

// 6 7 8 9 0
// 7 8 9 0 1
// 8 9 0 1 2

//handle gallery slider forward and backwards.
function positionLogic(direction){

    for(var i = 0; i < 5; i++){

        if(direction == "forward"){
            gallerySlider[i]++;
            if(gallerySlider[i] == picArray.length){
                gallerySlider[i] = 0;
            }
        }   
        else{
            gallerySlider[i]--;
            if(gallerySlider[i] < 0){
                gallerySlider[i] = picArray.length-1;
            }
        }
    }

}

//update img tags given new slider.
function updateImages(){

    const displayed = document.querySelector('figure img');

    for(var i = 0; i < 5; i++){
        //run through img element in UL and update given the NEW slider.
        galleryImages[i].setAttribute('src', picObjArray[gallerySlider[i]].getSmallPicture());

        if(displayed.getAttribute('src') == picObjArray[gallerySlider[i]].getLargePicture()){
            galleryImages[i].style.filter = "grayscale(0%)";
        }
        else{
            galleryImages[i].style.filter = "grayscale(100%)";
        }
    }
}


// populate array with objects that hold both small and large/fake large images
function populatePicArray(picArray){

    for(var i = 0; i < picArray.length; i++){

        const smallPath = "images/" + picArray[i] + ".jpg";
        const largePath = picPath(smallPath);

        var picObj = new Picture(smallPath,largePath);

        picObjArray.push(picObj);

    }
    console.log(picObjArray);



    // for(var i = 0; i < picArray.length; i++){
    //     //create img element
    //     const newImg =  document.createElement('img');
    //     //set image element to picture index in array
    //     newImg.setAttribute('src',"images/" + picArray[i] + ".jpg");
    //     newImg.setAttribute('width',"240");
    //     newImg.setAttribute('height',"160");
    //     //append img to picturePool
    //     picturePool.appendChild(newImg);
    // }
}


//populate ul with imgs on load
function populateGallery(){

    for(var i = 0; i < 5; i++){
            //create img element
            const newImg =  document.createElement('img');
            //set image element to picture index in array
            newImg.setAttribute('src',picObjArray[i].getSmallPicture());
            newImg.setAttribute('width',"240");
            newImg.setAttribute('height',"160");

            //add grayscale to all but the first image on first load..
            if(i != galleryPosition){
                newImg.style.filter = "grayscale(90%)";
                // newImg.style.opacity = "0.5";
            }
            //append img to picturePool
            picturePool.appendChild(newImg);
            //console.log(picObjArray[i].getSmallPicture())
    }
}




//take photo and make sure the large one is given for image display
function picPath(imageClicked){

    //src="images/flowers-purple-small.jpg"
    var newPic = imageClicked.slice(0,-9);

    //return large picture path for small pictures
    return newPic+"large.jpg";
}

//current display of images within the gallery. 
// This is here to have only 5 img tags within the ul at a time.
    // When sliders change gallery images, the 5 img tags are updated.
    // this is done, instead of having a bunch of img tags within the UL.
function galleryArray(){

    var tempRay = document.querySelectorAll('ul img');
    console.log(tempRay);
    for(var i = 0; i < 5; i++){

        
        //push img element node into array.
        galleryImages.push(tempRay[i]);
        
        console.log(galleryImages.length);

    }
console.log(galleryImages.length);
}

//deal with grey image resets.
function massGray(){

    for(var i = 0; i < 5; i++){
        //console.log(galleryImages.length);
        //console.log(galleryImages);
        galleryImages[i].style.filter = "grayscale(90%)";
        
    }

}

//on click listener for image pool
picturePool.addEventListener('click', function(event){

    //grab image clicked,'s src to send to pictureDisplay
    const imageClicked = event.target.getAttribute('src');

    //grayscale every other image...
    massGray();

    //
    event.target.style.filter = "none";

    //send large picture for display, not small one
    const largeCorrect = picPath(imageClicked);

    //set pictureDisplay with image clicked...
    displayPicture.setAttribute('src',largeCorrect);

    //galleryArray();
    
    // if (event.target && event.target.nodeName === 'IMG') {

    // }


});


//populate array with Objects.
populatePicArray(picArray);
//console.log(picArray.length);

//populate gallery with img
populateGallery();

//gather imgs in list.
galleryArray();