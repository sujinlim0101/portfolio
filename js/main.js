(() => {
    let yOffset = 0; //window.pageYOffset
    let prevScrollHeight = 0; //현재 스크롤 위치 이전의 섹션들의 높이를 더한 값
    let currentScene = 0; //현재 활성화된 씬
    let enterNewScene = false; //새로운 씬이 시작되는 순간 true
    const sceneInfo =  [
        {//0
            type:'sticky',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('.main-message.a'),
                messageB: document.querySelector('.main-message.b'),
                messageC: document.querySelector('.main-message.c'),
                messageD: document.querySelector('.main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages : [],
            },
            values: {
                videoImageCount: 72, 
                imgaeSequence: [0, 71],
                canvas_opacity: [1, 0, { start: 0.9, end: 1}],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {//1  sticky가 아니지만 heigth를 비율로 조정하기 위해 씀
            type:'sticky', 
            heightNum:1,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            },
            values: {
            }
        },
        {//2
            type:'normal',
            objs: {
                container: document.querySelector('#scroll-section-2'),
            },
        },
        {//3
            type:'normal',
            objs: {
                container: document.querySelector('#scroll-section-3'),

            }
        },
        
        {//4
            type:'normal',
            objs: {
                container: document.querySelector('#scroll-section-4'),
            }
        },

        {//5
            type:'sticky',
            heightNum:7,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-5'),
                messageA: document.querySelector('#scroll-section-5 .a'),
                messageB: document.querySelector('#scroll-section-5 .b'),
                messageC: document.querySelector('#scroll-section-5 .c'),
                pinB: document.querySelector('#scroll-section-5 .b .pin'),
                pinC: document.querySelector('#scroll-section-5 .c .pin'),
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages : []
            },
            values: {                
                videoImageCount: 145, 
                imgaeSequence: [0, 144],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1}],
                canvas_opacity_out: [1,0, { start: 0.7, end: 0.85 }],
                messageA_translateY_in: [20, 0, { start: 0, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.45 }],
                messageC_translateY_in: [20, 0, { start: 0.6, end: 0.65 }],
                messageA_opacity_in: [0, 1, { start: 0, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.45}],
                messageC_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -10, { start: 0.5, end: 0.6 }],
                messageC_translateY_out: [0, -10, { sstart: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3  }],
                messageB_opacity_out: [1, 0, {  start: 0.5, end: 0.6 }],
                messageC_opacity_out: [1, 0, { start: 0.7, end: 0.8 }],
                pinB_scaleY: [0.5, 1, { start: 0.4, end: 0.6 }],
                pinC_scaleY: [0.5, 1, { start: 0.55, end: 0.75 }]
            }
        },
        {//6 
            type:'normal',
            heightNum:2,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-6'),
            },
        },
        
    ]
    function checkNav() {
        if (yOffset > 44) {
			document.body.classList.add('nav-sticky');
		} else {
			document.body.classList.remove('nav-sticky');
		}
    }
    
    function setCanvasImages() {
        let imgElem;
        for (let i =1; i < sceneInfo[0].values.videoImageCount+1; i++) {
            imgElem = new Image();
            if (i < 10) {
                imgElem.src = `./images/001/000${i}.jpg`;
            } else if (i <100) {
                imgElem.src = `./images/001/00${i}.jpg`;
            } else {
                imgElem.src = `./images/001/0${i}.jpg`;
            }
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
        let imgElem1;
        for (let i =1; i < sceneInfo[5].values.videoImageCount+1; i++) {
            imgElem1 = new Image();
            if (i < 10) {
                imgElem1.src = `./images/002/000${i}.jpg`;
            } else if (i <100) {
                imgElem1.src = `./images/002/00${i}.jpg`;
            } else {
                imgElem1.src = `./images/002/0${i}.jpg`;
            }
            sceneInfo[5].objs.videoImages.push(imgElem1);
        }
    }
    function setLayout() {
        for (let i =0; i<sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }else{
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
            }
        
        }
        let totalScrollHeight = 0;
        yOffset = window.pageYOffset;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        const heightRatio = document.documentElement.clientHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[5].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

    }
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = (yOffset - prevScrollHeight) / sceneInfo[currentScene].scrollHeight;
        //부드러운 트랜지션을 위한 transition container
        const transition_conatiner = document.querySelector('#transition-container');

        switch(currentScene) {
            case 0:
                console.log('section 0 ')
                //섹션0으로 들어올 때 배경색 화이트 빼기
                transition_conatiner.removeAttribute('class','black-ani')
                let sequence = Math.round(calcValues(values.imgaeSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence],0,0);
                // console.log('0 play');
                
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                break;
            case 1:                
                transition_conatiner.removeAttribute('class','black-ani')
            case 2:
                transition_conatiner.setAttribute('class','black-ani')
                break;
            case 3:
                transition_conatiner.removeAttribute('class','black-ani')
                transition_conatiner.setAttribute('class','little-yellow')

                break;
            case 4:
                objs.container.style.background = '#f9f3e4';

                if(scrollRatio >0.8) {
                    objs.container.style.background = 'white';
                }
                break;            
            case 5:
                let sequence2 = Math.round(calcValues(values.imgaeSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2],0,0);
                console.log(objs.videoImages[sequence2]);
                transition_conatiner.setAttribute('class','little-yellow')
                if (scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);

                }
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.47) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;
            case 6:
                break;
        }
    }
    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        
        //섹션에서 스크롤이 얼마나됐는지 비율
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        
         //3번째(=[2])로 start와 end가 존재하는 경우 start와 end사이에 애니메이션 실행한다.
        if (values.length === 3) {
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            if(currentYOffset >= partScrollStart && currentYOffset <=partScrollEnd) {
                rv =  (currentYOffset- partScrollStart)  / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;

    }
    function scrollLoop() {
        enterNewScene = false;
        yOffset = window.pageYOffset;
        prevScrollHeight=0; 

        for (let i = 0; i < currentScene ; i ++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
        }
        if ( yOffset < prevScrollHeight) {
            if( currentScene === 0) { //모바일에서 바운스 되는 것 떄문에 yoffset이 -되어 currentscene이 -되는 것 방지
                return;
            }
            enterNewScene = true;
            currentScene--;
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        if (enterNewScene) return;
        playAnimation();
    }
    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',()=>{
        scrollLoop();
        checkNav();
    } )
    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0],0,0);
        sceneInfo[5].objs.context.drawImage(sceneInfo[5].objs.videoImages[0],0,0);

    });
    setCanvasImages();

})();