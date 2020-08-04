(() => {
    let yOffset = 0; //window.pageYOffset
    let prevScrollHeight = 0; //현재 스크롤 위치 이전의 섹션들의 높이를 더한 값
    let currentScene = 0; //현재 활성화된 씬

    const sceneInfo =  [
        {
            type:'sticky',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('.main-message.a'),
                messageB: document.querySelector('.main-message.b'),
                messageC: document.querySelector('.main-message.c'),
                messageD: document.querySelector('.main-message.d'),
            },
            values: {
                messageA_opactiy:[0, 1],
                messageB_opacity:[],
                messageC_opacity:[],
                messageD_opacity:[]
            }
        },
        {
            type:'normal',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            },
            values: {
                backcolor: [1,255],
            }
        },
        {
            type:'sticky',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            },
        },
        {
            type:'sticky',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            },
        },
        
    ]
    function setLayout() {
        for (let i =0; i<sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        let totalScrollHeight = 0;
        for (let i =0; i <sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= pageYOffset) {
                currentScene = i;
                break;
            }
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        console.log(currentScene);
    }
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let currentYOffset = yOffset - prevScrollHeight;

        switch(currentScene) {
            case 0:
                let messageA_opactiy_in = calcValues(values.messageA_opactiy, currentYOffset);
                objs.messageA.style.opacity = messageA_opactiy_in ;
                break;
            case 1:
                let backcolor = Math.round(calcValues(values.backcolor, currentYOffset));
                if (backcolor < 255){
                objs.container.style.backgroundColor = `rgb(${backcolor},${backcolor},${backcolor})`
                }
                console.log(`rgb(${backcolor},${backcolor},${backcolor})`);
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
    function calcValues(values, currentYOffset) {
        let rv;
        //섹션에서 스크롤이 얼마나됐는지 비율
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        rv = scrollRatio * (values[1] - values[0]) + values[0];
        return rv;

    }
    function scrollLoop() {
        yOffset = window.pageYOffset;
        prevScrollHeight=0; 
        for (let i = 0; i < currentScene ; i ++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight) {
            currentScene++;
        }
        if ( yOffset < prevScrollHeight) {
            if( currentScene === 0) { //모바일에서 바운스 되는 것 떄문에 yoffset이 -되어 currentscene이 -되는 것 방지
                return;
            }
            currentScene--;
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',()=>{
        scrollLoop();
        playAnimation();
    } )
    window.addEventListener('load',setLayout);
})();