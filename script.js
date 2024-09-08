/* 전체 기능을 포함한 하나의 코드 파일 */

/* text_iife.js */
// 텍스트 작성과 삭제 즉시 실행 함수
//즉시 실행함수는 누가 호출 안 해도 혼자 자동으로 실행함
(function(){
    // main 요소 내 h2 태그의 span 요소를 선택하여 변수에 할당
    const spanEl = document.querySelector("main h2 span");
    
    // 순차적으로 출력할 직업 목록 배열
    const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
    
    // 현재 배열의 인덱스를 가리킬 변수
    let index = 0;

    // 현재 배열에서 선택된 직업을 문자 단위로 쪼개어 저장할 배열
    let currentTxt = txtArr[index].split("");
    
    // 텍스트 작성 함수 (한 글자씩 텍스트를 추가)
    function writeTxt(){
        // 배열에서 한 글자씩 꺼내서 span 요소에 추가
        spanEl.textContent += currentTxt.shift(); 
        
        // 아직 글자가 남아있다면 재귀적으로 호출하여 다음 글자를 추가
        if(currentTxt.length !== 0){ 
            setTimeout(writeTxt, Math.floor(Math.random() * 100)); // 불규칙한 시간 간격으로 호출
        }else{
            // 모두 출력된 후, 3초 후에 텍스트를 삭제하는 함수 호출
            currentTxt = spanEl.textContent.split(""); // 텍스트를 배열로 다시 변환
            setTimeout(deleteTxt, 3000);
        }
    }
    
    // 텍스트 삭제 함수 (한 글자씩 삭제)
    function deleteTxt(){
        currentTxt.pop(); // 배열에서 마지막 글자를 제거
        spanEl.textContent = currentTxt.join(""); // 배열을 다시 문자열로 합쳐서 표시
        
        // 아직 글자가 남아있다면 재귀적으로 호출하여 다음 글자를 삭제
        if(currentTxt.length !== 0){
            setTimeout(deleteTxt, Math.floor(Math.random() * 100));
        }else{
            // 모든 글자가 삭제되면 다음 직업을 출력하기 위해 인덱스 증가 (순환 반복)
            index = (index + 1) % txtArr.length;
            currentTxt = txtArr[index].split(""); // 다음 직업을 문자 단위로 나누어 저장
            writeTxt(); // 다시 텍스트를 작성하는 함수 호출
        }
    }
    
    writeTxt(); // 처음 텍스트를 출력하는 함수 실행
})();

/* scroll_request.js */
// 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제
const headerEl = document.querySelector("header");

// 스크롤 이벤트가 발생할 때마다 `requestAnimationFrame`을 통해 `scrollCheck` 함수 호출
window.addEventListener('scroll', function(){
    requestAnimationFrame(scrollCheck);
});

// 스크롤 상태를 확인하는 함수
function scrollCheck(){
    // 브라우저의 스크롤 위치를 확인 (IE 호환을 위해 pageYOffset도 체크)
    let browserScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
    
    // 스크롤이 0보다 크면 active 클래스를 추가, 그렇지 않으면 제거
    if(browserScrollY > 0){
        headerEl.classList.add("active");
    }else{
        headerEl.classList.remove("active");
    }
}

/* move.js */
// 애니메이션 스크롤 이동 함수 정의
const animationMove = function(selector){
    // ① 이동할 대상 요소 선택
    const targetEl = document.querySelector(selector);
    
    // ② 현재 브라우저의 스크롤 위치(y 값)
    const browserScrollY = window.pageYOffset;
    
    // ③ 이동할 대상의 화면 내 위치 계산
    const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY;
    //현재~목표 + 페이지 상단~현재 = 페이지 상단~목표
    
    // ④ 스크롤 이동 (부드러운 애니메이션 적용)
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
};

// 스크롤 이동 이벤트 등록
const scrollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");

// 모든 스크롤 이벤트 요소에 클릭 이벤트 추가
for(let i = 0; i < scrollMoveEl.length; i++){
    scrollMoveEl[i].addEventListener('click', function(e){
        const target = this.dataset.target; // 클릭한 요소의 data-target 값을 가져옴
        animationMove(target); // 해당 위치로 스크롤 이동
    });
}
