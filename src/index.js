import '../css/style.scss';
import MakeElement from './Tools/MakeElement';
import BaseLevel from './Component/Base';




function RenderSite(){
  let body = document.querySelector('body');

  console.log(body);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],'bodyContain');  
  let Base = new BaseLevel; 
  bodyContainer.append(Base.renderDiv());

  
  body.append(bodyContainer);
}



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', RenderSite);
} else {
    RenderSite();
}