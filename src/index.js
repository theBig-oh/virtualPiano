import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';





function RenderSite(){
  let body = document.querySelector('body');

  console.log(body);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],'bodyContain');  
      bodyContainer.innerHTML = `<div> Hey, Welcome to PureJS </div>`;

  
  body.append(bodyContainer);
}

RenderSite(); 