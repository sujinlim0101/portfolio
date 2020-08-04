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
            },
        },
        {
            type:'normal',
            heightNum:5,
            scrollHeight:0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            },
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

        console.log(sceneInfo);
    }
    function scrollLoop() {
        yOffset = window.pageYOffset;
        prevScrollHeight=0; 
        for (let i = 0; i < currentScene ; i ++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            // //  section1에서 white로 색 변하게 하기
            // if(currentScene ===1) {
            //     console.log('white');
            //     sceneInfo[currentScene].objs.container.style.backgroundColor='white';
            // }
            
        }
        if ( yOffset < prevScrollHeight) {
            if( currentScene === 0) { //모바일에서 바운스 되는 것 떄문에 yoffset이 -되어 currentscene이 -되는 것 방지
                return;
            }
            currentScene--;
            // //  section1에서 white로 색 변하게 하기
            // if(currentScene ===1) {
            //     sceneInfo[currentScene].objs.container.style.backgroundColor='white'; 
            // }
        }
        console.log(currentScene);
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',()=>{
        scrollLoop();
    } )
    setLayout();
})();