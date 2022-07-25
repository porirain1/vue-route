Vue.component("header-el", {
    data : () => {
        return {
            menuItem : [
                {name : "animal"}
                , {name : "history"}
                , {name : "environment"}
                , {name : "science"}
                , {name : "travel"}
            ]
        }
    }
    , template : `  <header>
                        <div class="logo">
                            <router-link to="/"><img src="./img/toplogo.png" alt="logo"></router-link>
                        </div>
                        <div class="menu">
                            <ul>
                                <li v-for="oneMenu in menuItem">
                                    <router-link :to="'/'+oneMenu.name">{{oneMenu.name}}</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="mypage">
                            <ul>
                                <li><a href=""></a></li>
                                <li><a href=""></a></li>
                            </ul>
                        </div>
                        <div class="resBtn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </header>`
});

const pageMain = {
    data : () => {
        return {
            movieItem : [
                {video:"animal.mp4", title : "animal"}
                , {video:"history.mp4", title : "history"}
                , {video:"environment.mp4", title : "environment"}
                , {video:"science.mp4", title : "science"}
                , {video:"travel.mp4", title : "travel"}
            ]
            , randomIndex : Math.floor(Math.random() * 5) /* 0 ~ 4 사이 값 발생 */
        }
    }
    , created() {/* 초기 화면상에 던질 수 있는 데이터를 처리하는 곳 = initData() */}
    , mounted() { /* created() 보다 늦지만 초기 함수 구문으로 정의할 수 있는 구성 (jQeury 구문도 정의하여 적용 가능한 위치) */ }
    , template : `  <section id="main">
                        <video :src="'./video/' + movieItem[randomIndex].video" autoplay loop muted playsinline></video>
                        <div class="video_dark"></div>
                        <div class="wrap">
                            <div class="main_cont">
                                <div class="content">
                                    <img src="./img/yellowFrame.png" alt="yellowFrame">
                                    <h2>{{movieItem[randomIndex].title}}</h2>
                                </div>
                            </div>
                        </div>
                    </section>`
};

function getPage(category){
    const categoryName  = category.toUpperCase();
    let itemList      = [];
    let filePattern   = "";
    let imgDir       = "";
    switch (categoryName) {
        case "ANIMAL" : 
            filePattern = "animal";
            imgDir = "animals";
            break;
        case "HISTORY" :
            filePattern = "history";
            imgDir = "history";
            break;
        case "ENVIRONMENT" :
            filePattern = "environ";
            imgDir = "environment";
            break;
        case "SCIENCE" :
            filePattern = "science";
            imgDir = "science";
            break;
        case "TRAVEL" :
            filePattern = "travel";
            imgDir = "travel";
            break;

    }

    for ( let i = 1 ; i < 13 ; i ++ ) {
        itemList.push({image : `${filePattern}_news_${i}.jpg`, name : `${filePattern}_news_${i}`});
    }

    const page = {
        data : () => {
            return {
                categoryName : categoryName
                , item : itemList
            }
        }
        , template : `  <section id="sub_item">
                            <div class="wrap">
                                <h2>{{categoryName}}</h2>
                                <div class="content">
                                    <div v-for="oneItem in item" class="box">
                                        <div class="bg_img" :style="'background-image:url(./img/${imgDir}/'+oneItem.image+')'">
                                            <div class="info"><h3>{{oneItem.image}}</h3></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>`
    };
    return page;
}

const rtRoutes = [
    { path : "/", component : pageMain}
    ,{ path : "/animal", component : getPage("animal")}
    ,{ path : "/history", component : getPage("history")}
    ,{ path : "/environment", component : getPage("environment")}
    ,{ path : "/science", component : getPage("science")}
    ,{ path : "/travel", component : getPage("travel")}
];

const router1 = new VueRouter({
   routes : rtRoutes 
});

const footer = {
    template : `<footer>
                    <p>Copyrights &copy; National Geographic</p>
                </footer>`
}

new Vue({
    el : "#app"
    , router : router1
    , components : {
        "footer-el" : footer
    }
});

const $body = document.querySelector("body");
const $menu = document.querySelector("header .menu");
const $resBtn = document.querySelector("header .resBtn");

// 반응형 메뉴 리스트 클릭시 
const menuList = () => {
    const $menuList = document.querySelectorAll("header .menu.active li");
    for ( const v of $menuList ) {
        console.log(v);
        v.addEventListener("click", function() {
            $body.classList.remove("showMenu");
            $menu.classList.remove("active");
            $resBtn.classList.remove("active");
        });
    }
    const $logo = document.querySelector("body.showMenu .logo");
    $logo.addEventListener("click", function() {
        $body.classList.remove("showMenu");
        $menu.classList.remove("active");
        $resBtn.classList.remove("active");
    });
};

// 반응형 메뉴 아이콘 클릭시 
$resBtn.addEventListener("click", function() {
    const $active_resBtn = $resBtn.classList.contains("active");
    if ( !$active_resBtn ) {
        $body.classList.add("showMenu");
        $menu.classList.add("active");
        $resBtn.classList.add("active");
        menuList();
    }
    else {
        $body.classList.remove("showMenu");
        $menu.classList.remove("active");
        $resBtn.classList.remove("active");
    }
});