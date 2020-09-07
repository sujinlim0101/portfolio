"use strict";(function(){//nav의 sticky와 투명도 조절.
function checkNav(){44<yOffset?document.body.classList.add("nav-sticky"):document.body.classList.remove("nav-sticky")}function setLayout(){//section의 height를 셋팅.
for(var i=0;i<sceneInfo.length;i++)"normal"===sceneInfo[i].type?sceneInfo[i].scrollHeight=sceneInfo[i].objs.container.offsetHeight:(sceneInfo[i].scrollHeight=sceneInfo[i].heightNum*window.innerHeight,sceneInfo[i].objs.container.style.height=sceneInfo[i].scrollHeight+"px");var totalScrollHeight=0;yOffset=window.pageYOffset;for(var _i2=0;_i2<sceneInfo.length;_i2++)if(totalScrollHeight+=sceneInfo[_i2].scrollHeight,totalScrollHeight>=yOffset){currentScene=_i2;break}//세로 기준에 맞추어 캔버스 크기를 조절함
document.body.setAttribute("id","show-scene-"+currentScene);var heightRatio=document.documentElement.clientHeight/1080;//캔버스가 가운데로 조절되기 위해 맞춰주는 값
sceneInfo[0].objs.canvas.style.transform="translate3d(-50%, -50%, 0) scale("+heightRatio+")",sceneInfo[5].objs.canvas.style.transform="translate3d(-50%, -50%, 0) scale("+heightRatio+")"}function blackIn(){transitionContainer.setAttribute("class","black-ani")}function blackOut(){//너무 빨리 스크롤 경우에 black-ani가 빠지지 않을 수 있기 떄문에 모든 section에 추가해줌.
transitionContainer.removeAttribute("class","black-ani")}function playAnimation(){var objs=sceneInfo[currentScene].objs,values=sceneInfo[currentScene].values,currentYOffset=yOffset-prevScrollHeight,scrollHeight=sceneInfo[currentScene].scrollHeight,scrollRatio=(yOffset-prevScrollHeight)/sceneInfo[currentScene].scrollHeight;//부드러운 트랜지션을 위한 transition container
switch(currentScene){case 0:blackOut();var sequence=Math.round(calcValues(values.imgaeSequence,currentYOffset));objs.context.drawImage(objs.videoImages[sequence],0,0),.22>=scrollRatio?(objs.messageA.style.opacity=calcValues(values.messageA_opacity_in,currentYOffset),objs.messageA.style.transform="translate3d(0, "+calcValues(values.messageA_translateY_in,currentYOffset)+"%, 0)"):(objs.messageA.style.opacity=calcValues(values.messageA_opacity_out,currentYOffset),objs.messageA.style.transform="translate3d(0, "+calcValues(values.messageA_translateY_out,currentYOffset)+"%, 0)"),.42>=scrollRatio?(objs.messageB.style.opacity=calcValues(values.messageB_opacity_in,currentYOffset),objs.messageB.style.transform="translate3d(0, "+calcValues(values.messageB_translateY_in,currentYOffset)+"%, 0)"):(objs.messageB.style.opacity=calcValues(values.messageB_opacity_out,currentYOffset),objs.messageB.style.transform="translate3d(0, "+calcValues(values.messageB_translateY_out,currentYOffset)+"%, 0)"),.62>=scrollRatio?(objs.messageC.style.opacity=calcValues(values.messageC_opacity_in,currentYOffset),objs.messageC.style.transform="translate3d(0, "+calcValues(values.messageC_translateY_in,currentYOffset)+"%, 0)"):(objs.messageC.style.opacity=calcValues(values.messageC_opacity_out,currentYOffset),objs.messageC.style.transform="translate3d(0, "+calcValues(values.messageC_translateY_out,currentYOffset)+"%, 0)"),.82>=scrollRatio?(objs.messageD.style.opacity=calcValues(values.messageD_opacity_in,currentYOffset),objs.messageD.style.transform="translate3d(0, "+calcValues(values.messageD_translateY_in,currentYOffset)+"%, 0)"):(objs.messageD.style.opacity=calcValues(values.messageD_opacity_out,currentYOffset),objs.messageD.style.transform="translate3d(0, "+calcValues(values.messageD_translateY_out,currentYOffset)+"%, 0)");break;case 1:blackOut();case 2:blackIn(),16;break;case 3:blackOut();break;case 4:.8<scrollRatio&&(objs.container.style.background="white");break;case 5:var sequence2=Math.round(calcValues(values.imgaeSequence,currentYOffset));objs.context.drawImage(objs.videoImages[sequence2],0,0),objs.canvas.style.opacity=.5>=scrollRatio?calcValues(values.canvas_opacity_in,currentYOffset):calcValues(values.canvas_opacity_out,currentYOffset),.22>=scrollRatio?(objs.messageA.style.opacity=calcValues(values.messageA_opacity_in,currentYOffset),objs.messageA.style.transform="translate3d(0, "+calcValues(values.messageA_translateY_in,currentYOffset)+"%, 0)"):(objs.messageA.style.opacity=calcValues(values.messageA_opacity_out,currentYOffset),objs.messageA.style.transform="translate3d(0, "+calcValues(values.messageA_translateY_out,currentYOffset)+"%, 0)"),.47>=scrollRatio?(objs.messageB.style.transform="translate3d(0, "+calcValues(values.messageB_translateY_in,currentYOffset)+"%, 0)",objs.messageB.style.opacity=calcValues(values.messageB_opacity_in,currentYOffset),objs.pinB.style.transform="scaleY("+calcValues(values.pinB_scaleY,currentYOffset)+")"):(objs.messageB.style.transform="translate3d(0, "+calcValues(values.messageB_translateY_out,currentYOffset)+"%, 0)",objs.messageB.style.opacity=calcValues(values.messageB_opacity_out,currentYOffset),objs.pinB.style.transform="scaleY("+calcValues(values.pinB_scaleY,currentYOffset)+")"),.67>=scrollRatio?(objs.messageC.style.transform="translate3d(0, "+calcValues(values.messageC_translateY_in,currentYOffset)+"%, 0)",objs.messageC.style.opacity=calcValues(values.messageC_opacity_in,currentYOffset),objs.pinC.style.transform="scaleY("+calcValues(values.pinC_scaleY,currentYOffset)+")"):(objs.messageC.style.transform="translate3d(0, "+calcValues(values.messageC_translateY_out,currentYOffset)+"%, 0)",objs.messageC.style.opacity=calcValues(values.messageC_opacity_out,currentYOffset),objs.pinC.style.transform="scaleY("+calcValues(values.pinC_scaleY,currentYOffset)+")");}}//스크롤 비율에 따라 opacity, tansform(scaleY)가 달라져야 한다
//비율이 0과 1사이의 값이 계산되며,
function calcValues(values,currentYOffset){var rv=void 0,scrollHeight=sceneInfo[currentScene].scrollHeight,scrollRatio=currentYOffset/sceneInfo[currentScene].scrollHeight;//섹션에서 스크롤이 얼마나됐는지 비율
//3번째(=[2])로 start와 end가 존재하는 경우 start와 end사이에 애니메이션 실행한다.
if(3===values.length){var partScrollStart=values[2].start*scrollHeight,partScrollEnd=values[2].end*scrollHeight;//정해진 스크롤 범위 안에 있으면 사이값을 계산한다.
currentYOffset>=partScrollStart&&currentYOffset<=partScrollEnd?rv=(currentYOffset-partScrollStart)/(partScrollEnd-partScrollStart)*(values[1]-values[0])+values[0]:currentYOffset<partScrollStart?rv=values[0]:currentYOffset>partScrollEnd&&(rv=values[1])}else rv=scrollRatio*(values[1]-values[0])+values[0];return rv}function scrollLoop(){enterNewScene=!1,yOffset=window.pageYOffset,prevScrollHeight=0;for(var i=0;i<currentScene;i++)//전 섹션의 모든 값을 합침.
prevScrollHeight+=sceneInfo[i].scrollHeight;if(yOffset>prevScrollHeight+sceneInfo[currentScene].scrollHeight&&(enterNewScene=!0,currentScene++),yOffset<prevScrollHeight){// 현 스크롤 값이 전 섹션 + 지금 섹션의 값보다 더 값이 작은(-1) 씬으로 감.
if(0===currentScene)// 모바일에서 바운스 되는 것 떄문에 yoffset이 -되어 currentscene이 -되는 것 방지
return;enterNewScene=!0,currentScene--}// 씬에 처음으로 들어갔을 때 이상값이 생기는 현상 때문에 이 때 한번 패스하고, return.
document.body.setAttribute("id","show-scene-"+currentScene),enterNewScene||playAnimation()}function throttle(callback,milliseconds){return function(){var _arguments=arguments;throttleCheck||(throttleCheck=setTimeout(function(){callback.apply(void 0,_arguments),throttleCheck=!1},milliseconds))}}function debounce(callback,milliseconds){return function(){var _arguments2=arguments;// clearTimeout을 이용하여 이벤트 발생을 무시함.
// 마지막 호출에 set한 시간이 지난 후에 한번만, 이벤트가 호출되도록 함.
clearTimeout(debounceCheck),debounceCheck=setTimeout(function(){callback.apply(void 0,_arguments2)},milliseconds)}}var yOffset=0,prevScrollHeight=0,currentScene=0,enterNewScene=!1,throttleCheck=void 0,debounceCheck=void 0,transitionContainer=document.querySelector("#transition-container"),sceneInfo=[{//0섹션 정보
type:"sticky",heightNum:5,scrollHeight:0,//0섹션 objs
objs:{container:document.querySelector("#scroll-section-0"),messageA:document.querySelector(".main-message.a"),messageB:document.querySelector(".main-message.b"),messageC:document.querySelector(".main-message.c"),messageD:document.querySelector(".main-message.d"),canvas:document.querySelector("#video-canvas-0"),context:document.querySelector("#video-canvas-0").getContext("2d"),//비디오(이미지)를 setCanvasImages함수에서 넣어줌
videoImages:[]},//0섹션 값들로 쓰이는 것들
values:{videoImageCount:72,imgaeSequence:[0,71],//흐려지는 효과
canvas_opacity:[1,0,{start:.9,end:1}],//예) 0.1과 0.2 사이의 스크롤 비율에서 0~1만큼 opacity가 투명했다가(0) 선명해진다(1).
messageA_opacity_in:[0,1,{start:.1,end:.2}],messageB_opacity_in:[0,1,{start:.3,end:.4}],messageC_opacity_in:[0,1,{start:.5,end:.6}],messageD_opacity_in:[0,1,{start:.7,end:.8}],messageA_translateY_in:[20,0,{start:.1,end:.2}],messageB_translateY_in:[20,0,{start:.3,end:.4}],messageC_translateY_in:[20,0,{start:.5,end:.6}],messageD_translateY_in:[20,0,{start:.7,end:.8}],messageA_opacity_out:[1,0,{start:.25,end:.3}],messageB_opacity_out:[1,0,{start:.45,end:.5}],messageC_opacity_out:[1,0,{start:.65,end:.7}],messageD_opacity_out:[1,0,{start:.85,end:.9}],messageA_translateY_out:[0,-20,{start:.25,end:.3}],messageB_translateY_out:[0,-20,{start:.45,end:.5}],messageC_translateY_out:[0,-20,{start:.65,end:.7}],messageD_translateY_out:[0,-20,{start:.85,end:.9}]}},{//1  sticky가 아니지만 heigth를 비율로 조정하기 위해 씀
//캔버스가 하얀색이고 양옆으로 여백이 남는경우) 스크롤이 빠르게 될 때 transition효과가 나타날때 양옆에 검은 테두리가 생김.
//그것을 방지하기 위해 창 사이즈만큼 section의 높이로 주고, 완화하기 위한 조치로서 height num을 1로 줌.
type:"sticky",heightNum:1,scrollHeight:0,objs:{container:document.querySelector("#scroll-section-1")},values:{}},{//2 normal은 자신이 가진 hegiht만큼 가지기 때문에 조정하지 않음.
type:"normal",objs:{container:document.querySelector("#scroll-section-2")}},{//3
type:"normal",objs:{container:document.querySelector("#scroll-section-3")}},{//4
type:"normal",objs:{container:document.querySelector("#scroll-section-4")}},{//5
type:"sticky",heightNum:7,scrollHeight:0,objs:{container:document.querySelector("#scroll-section-5"),messageA:document.querySelector("#scroll-section-5 .a"),messageB:document.querySelector("#scroll-section-5 .b"),messageC:document.querySelector("#scroll-section-5 .c"),pinB:document.querySelector("#scroll-section-5 .b .pin"),pinC:document.querySelector("#scroll-section-5 .c .pin"),canvas:document.querySelector("#video-canvas-1"),context:document.querySelector("#video-canvas-1").getContext("2d"),videoImages:[]},values:{videoImageCount:90,imgaeSequence:[0,89],canvas_opacity_in:[0,1,{start:0,end:.1}],canvas_opacity_out:[1,0,{start:.7,end:.85}],messageA_translateY_in:[20,0,{start:0,end:.2}],messageB_translateY_in:[10,0,{start:.3,end:.45}],messageC_translateY_in:[10,0,{start:.6,end:.65}],messageA_opacity_in:[0,1,{start:0,end:.2}],messageB_opacity_in:[0,1,{start:.3,end:.45}],messageC_opacity_in:[0,1,{start:.6,end:.65}],messageA_translateY_out:[0,-20,{start:.25,end:.3}],messageB_translateY_out:[0,-10,{start:.5,end:.6}],messageC_translateY_out:[0,-5,{start:.7,end:.8}],messageA_opacity_out:[1,0,{start:.25,end:.3}],messageB_opacity_out:[1,0,{start:.5,end:.6}],messageC_opacity_out:[1,0,{start:.7,end:.85}],pinB_scaleY:[.5,1,{start:.4,end:.6}],pinC_scaleY:[.5,1,{start:.55,end:.8}]}},{//6
type:"normal",scrollHeight:0,objs:{container:document.querySelector("#scroll-section-6")}}];//window.pageYOffset
//현재 스크롤 위치 이전의 섹션들의 높이를 더한 값
//현재 활성화된 씬
//새로운 씬이 시작되는 순간 true
window.addEventListener("load",function(){//로드가 끝나면 before load 클래스를 없앰.
// throttling
// 리사이즈할 떄 setLayout 다시해줘야함.
// window.addEventListener("resize", setLayout);
//디바운스
//모바일에서 가로모드로 전환
//트랜지션효과 때문에 div(.loading)을 바로 없애지 않고 transitionend 이후에 제거.
document.body.classList.remove("before-load"),setLayout(),sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0,0),window.addEventListener("scroll",function(){scrollLoop(),checkNav()}),window.addEventListener("scroll",function(){throttle(function(){scrollLoop(),checkNav()},16)}),window.addEventListener("resize",debounce(setLayout,250)),window.addEventListener("orientationchange",function(){setTimeout(setLayout,500)}),document.querySelector(".loading").addEventListener("transitionend",function(e){document.querySelector(".loading")&&document.body.removeChild(e.currentTarget)})}),function(){for(var imgElem=void 0,i=1;i<sceneInfo[0].values.videoImageCount+1;i++)imgElem=new Image,imgElem.src=10>i?"public/src/images/001/000"+i+".jpg":100>i?"public/src/images/001/00"+i+".jpg":"public/src/images/001/0"+i+".jpg",sceneInfo[0].objs.videoImages.push(imgElem);for(var imgElem1=void 0,_i=1;_i<sceneInfo[5].values.videoImageCount+1;_i++)imgElem1=new Image,imgElem1.src=10>_i?"public/src/images/003/000"+_i+".jpg":100>_i?"public/src/images/003/00"+_i+".jpg":"public/src/images/003/0"+_i+".jpg",sceneInfo[5].objs.videoImages.push(imgElem1)}()})();