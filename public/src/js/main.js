(() => {
  let yOffset = 0; //window.pageYOffset
  let prevScrollHeight = 0; //현재 스크롤 위치 이전의 섹션들의 높이를 더한 값
  let currentScene = 0; //현재 활성화된 씬
  let enterNewScene = false; //새로운 씬이 시작되는 순간 true
  const sceneInfo = [
    {
      //0섹션 정보
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      //0섹션 objs
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector(".main-message.a"),
        messageB: document.querySelector(".main-message.b"),
        messageC: document.querySelector(".main-message.c"),
        messageD: document.querySelector(".main-message.d"),
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        //비디오(이미지)를 setCanvasImages함수에서 넣어줌
        videoImages: [],
      },
      //0섹션 값들로 쓰이는 것들
      values: {
        videoImageCount: 72,
        imgaeSequence: [0, 71],
        //흐려지는 효과
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        //0.1과 0.2 사이의 스크롤 비율에서 0~1만큼 opacity가 투명했다가(0) 선명해진다.(1)
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
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      //1  sticky가 아니지만 heigth를 비율로 조정하기 위해 씀
      //캔버스가 하얀색이고 양옆으로 여백이 남는경우) 스크롤이 빠르게 될 때 transition효과가 나타날때 양옆에 검은 테두리가 생김.
      //그것을 방지하기 위해 창 사이즈만큼 section의 높이로 주고, 완화하기 위한 조치로서 height num을 1로 줌.
      type: "sticky",
      heightNum: 1,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
      values: {},
    },
    {
      //2 normal은 자신이 가진 hegiht만큼 가지기 때문에 조정하지 않음.
      type: "normal",
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "normal",
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },

    {
      //4
      type: "normal",
      objs: {
        container: document.querySelector("#scroll-section-4"),
      },
    },

    {
      //5
      type: "sticky",
      heightNum: 7,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-5"),
        messageA: document.querySelector("#scroll-section-5 .a"),
        messageB: document.querySelector("#scroll-section-5 .b"),
        messageC: document.querySelector("#scroll-section-5 .c"),
        pinB: document.querySelector("#scroll-section-5 .b .pin"),
        pinC: document.querySelector("#scroll-section-5 .c .pin"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 90,
        imgaeSequence: [0, 89],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.7, end: 0.85 }],
        messageA_translateY_in: [20, 0, { start: 0, end: 0.2 }],
        messageB_translateY_in: [10, 0, { start: 0.3, end: 0.45 }],
        messageC_translateY_in: [10, 0, { start: 0.6, end: 0.65 }],
        messageA_opacity_in: [0, 1, { start: 0, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.45 }],
        messageC_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -10, { start: 0.5, end: 0.6 }],
        messageC_translateY_out: [0, -5, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.5, end: 0.6 }],
        messageC_opacity_out: [1, 0, { start: 0.7, end: 0.85 }],
        pinB_scaleY: [0.5, 1, { start: 0.4, end: 0.6 }],
        pinC_scaleY: [0.5, 1, { start: 0.55, end: 0.8 }],
      },
    },
    {
      //6
      type: "normal",
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-6"),
      },
    },
  ];
  //nav의 sticky와 투명도 조절.
  function checkNav() {
    if (yOffset > 44) {
      document.body.classList.add("nav-sticky");
    } else {
      document.body.classList.remove("nav-sticky");
    }
  }

  function setCanvasImages() {
    let imgElem;
    for (let i = 1; i < sceneInfo[0].values.videoImageCount + 1; i++) {
      imgElem = new Image();
      if (i < 10) {
        imgElem.src = `public/src/images/001/000${i}.jpg`;
      } else if (i < 100) {
        imgElem.src = `public/src/images/001/00${i}.jpg`;
      } else {
        imgElem.src = `public/src/images/001/0${i}.jpg`;
      }
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
    let imgElem1;
    for (let i = 1; i < sceneInfo[5].values.videoImageCount + 1; i++) {
      imgElem1 = new Image();
      if (i < 10) {
        imgElem1.src = `public/src/images/003/000${i}.jpg`;
      } else if (i < 100) {
        imgElem1.src = `public/src/images/003/00${i}.jpg`;
      } else {
        imgElem1.src = `public/src/images/003/0${i}.jpg`;
      }
      sceneInfo[5].objs.videoImages.push(imgElem1);
    }
  }
  function setLayout() {
    //section의 height를 셋팅.
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      } else {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[
          i
        ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
      }
    }
    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    for (let i = 0; i < sceneInfo.length; i++) {
      //전 섹션까지의 모든 합을 구한뒤 지금 yOffset과 비교하여 씬을 알아냄
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    //세로 기준에 맞추어 캔버스 크기를 조절함
    document.body.setAttribute("id", `show-scene-${currentScene}`);
    const heightRatio = document.documentElement.clientHeight / 1080;
    //캔버스가 가운데로 조절되기 위해 맞춰주는 값
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[5].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio =
      (yOffset - prevScrollHeight) / sceneInfo[currentScene].scrollHeight;
    //부드러운 트랜지션을 위한 transition container
    const transition_conatiner = document.querySelector(
      "#transition-container"
    );

    switch (currentScene) {
      case 0:
        //섹션0으로 들어올 때 배경색 화이트 빼기
        //너무 빨리 스크롤 경우에 black-ani가 빠지지 않을 수 있기 떄문에 모든 section에 추가해줌.
        transition_conatiner.removeAttribute("class", "black-ani");
        let sequence = Math.round(
          calcValues(values.imgaeSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        //opacity in과 opacity out이 겹치는 구간이 있기 때문에 0.2와 0.25의 중간값으로 서로 겹치는 영역이 없게 처리.
        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_in,
            currentYOffset
          );
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_out,
            currentYOffset
          );
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;
      case 1:
        //섹션 1-3까지 영역의 black-ani 추가
        transition_conatiner.removeAttribute("class", "black-ani");
      case 2:
        transition_conatiner.setAttribute("class", "black-ani");
        break;
      case 3:
        transition_conatiner.removeAttribute("class", "black-ani");
        transition_conatiner.setAttribute("class", "little-yellow");

        break;
      case 4:
        objs.container.style.background = "#f9f3e4";

        if (scrollRatio > 0.8) {
          //부드럽게 캔버스로 넘어가기 위해서 하얀색 배경으로 바꿈.
          objs.container.style.background = "white";
        }
        break;
      case 5:
        let sequence2 = Math.round(
          calcValues(values.imgaeSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }
        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.47) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset
          )})`;
        }

        if (scrollRatio <= 0.67) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset
          )})`;
        }
        break;
      case 6:
        break;
    }
  }
  //스크롤 비율에 따라 opacity, tansform(scaleY)가 달라져야 한다
  //비율이 0과 1사이의 값이 계산되며,
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
      //정해진 스크롤 범위 안에 있으면 사이값을 계산한다.
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
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
    //씬에 들어왔는지 검사하는 값.
    enterNewScene = false;
    yOffset = window.pageYOffset;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      //전 섹션의 모든 값을 합침.
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      //현 스크롤 값이 전 섹션 + 지금 섹션의 값보다 더 값이 큰(+1) 씬으로 감.
      enterNewScene = true;
      currentScene++;
    }
    if (yOffset < prevScrollHeight) {
      //현 스크롤 값이 전 섹션 + 지금 섹션의 값보다 더 값이 작은(-1) 씬으로 감.
      if (currentScene === 0) {
        //모바일에서 바운스 되는 것 떄문에 yoffset이 -되어 currentscene이 -되는 것 방지
        return;
      }
      enterNewScene = true;
      currentScene--;
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
    // 씬에 처음으로 들어갔을 때 이상값이 생기는 현상 때문에 이 때 한번 패스하고, return.
    if (enterNewScene) return;
    playAnimation();
  }

  window.addEventListener("load", () => {
    //로드가 끝나면 before load 클래스를 없앰.
    document.body.classList.remove("before-load");
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    window.addEventListener("scroll", () => {
      scrollLoop();
      checkNav();
    });
    //리사이즈할 떄 setLayout 다시해줘야함.
    window.addEventListener("resize", setLayout);

    //모바일에서 가로모드로 전환
    window.addEventListener("orientationchange", () => {
      setTimeout(setLayout, 500);
    });
    //트랜지션효과 때문에 div(.loading)을 바로 없애지 않고 transitionend 이후에 제거.
    document
      .querySelector(".loading")
      .addEventListener("transitionend", (e) => {
        if (document.querySelector(".loading")) {
          document.body.removeChild(e.currentTarget);
        }
      });
  });

  setCanvasImages();
})();
