import MakeElement from './MakeElement.js';

function moveCarousel() {

}


function ImageCarousel(data) {
  let pictures = data.displayImages;
  let makeEle = new MakeElement;
  let y = 1;
  let imageContainer = makeEle.createEle('div','ImageContainer',[12,12,12,12],'imageContainer');


  pictures.forEach(function(pic,i){
    let picContain = makeEle.createEle('div','picContain'+i,[12,12,12,12],'picContain');
    let actualPic = makeEle.createEle('div','actualPic'+i,[12,12,12,12],'actualPic');


    actualPic.style.cssText = `background:url(${pic}) no-repeat;`;

    if(i == 0 ) {
      picContain.classList.add('activePic');
    }
    picContain.append(actualPic);
    imageContainer.append(picContain);

  })


  console.log(window.innerWidth);



ready();




  return imageContainer;

}


  function ready(callback){
      // in case the document is already rendered
      if (document.readyState!='loading') callback();
      // modern browsers
      else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
      // IE <= 8
      else document.attachEvent('onreadystatechange', function(){
          if (document.readyState=='complete') callback();
      });
    }

    ready(function(){
      let picIndex = 0;
      let getImages = document.querySelectorAll('.picContain');

        setInterval(function(){
          picIndex = (picIndex + 1)% getImages.length;
          console.log(picIndex);
          getImages.forEach(function(img){
            img.classList.remove('activePic');
          });
          document.querySelector('#picContain'+picIndex).classList.add('activePic');
        },3400)




  });


export default ImageCarousel;