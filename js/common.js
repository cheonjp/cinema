const shadowDOM_css = `
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet">
<style>
* {
    font-family: roboto, arial;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }
.header {
    width: 100%;
    background-color: black;
    height: 70px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    padding: 0 20px;
    z-index:2 !important;
  }
  .activeHeader{
    animation-name:headerAni;
    animation-duration:.5s;
    animation-fill-mode: forwards;
  }

  .inactiveHeader{
    animation-name:returnHeaderAni;
    animation-duration:.5s;
    animation-fill-mode: forwards;
  }
  @keyframes headerAni {
    0%{
      top:0;
    }
    50%{
      top:-70px;
      background-color:rgba(0,0,0,0.9);
    }
    100%{
      top:0;
      background-color:rgba(20,20,20,0.8);
    }
  }
  @keyframes returnHeaderAni {
    0%{
      top:0;
    }
    50%{
      top:-70px;
      background-color:rgba(0,0,0,0.9);
    }
    100%{
      top:0;
      background-color:rgba(0,0,0);
    }
  }

  
  .header .headerContent {
    width: 100%;
    max-width: 1350px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: auto;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
  }
  
  .header .logo {
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    width: 30%;
    padding-top: 20px;
  }
  
  .header .menuBtn {
    font-size: 1.1rem;
    text-decoration: none;
    color: white;
    font: weight 400px;
    height: 70px;
    display: inline-block;
    padding-top: 25px;
    font-weight: 400;
    -webkit-transition: letter-spacing .2s;
    -o-transition: letter-spacing .2s;
    transition: letter-spacing .2s;
    position: relative;
  }
  

  
  .header .menuBtn:before {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 3px;
    background-color: #f1ca0b;
    -webkit-transition: .2s;
    -o-transition: .2s;
    transition: .2s;
    content: '';
  }
  
  .header .menuBtn:hover:before {
    width: 100%;
  }
  
  .header .menuPart {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    width: 45%;
    max-width: 550px;
  }
  
  .header .searchBox {
    background-color: white;
    width: 200px;
    border: none;
    border-radius: 50px;
    padding-left: 10px;
    height: 30px;
    outline: none;
  }
  
  .header .searchBoxContainer {
    padding-top: 19px;
    position: relative;
  }
  .searchBoxContainer .alertBox{
      position:absolute;
      color:white;
      border-radius:50px;
      top:-30px;
      right:-190px;
      height:30px;
      transition:.3s;
     
  }
  .activeSlide{
    top:20px !important;
  }
 
  .header .i-search {
      cursor:pointer;
    width: 30px;
    height: 30px;
    color: black;
    position: absolute;
    top: 23px;
    right: 0;
  }
  .footer {
    color: white;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#232323), to(#000));
    background-image: -webkit-linear-gradient(top, #232323, #000);
    background-image: -o-linear-gradient(top, #232323, #000);
    background-image: linear-gradient(to bottom, #232323, #000);
    height: 303px;
  }
  
  .footer .footerContainer {
    text-align: center;
    padding-top: 20px;
  }
  
  .footer .footerLogo {
    font-size: 44px;
    font-weight: bold;
    margin: 20px 0 30px 0;
  }
  
  .footer .footerMenu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 600px;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin: auto;
  }
  
  .footer .menu {
    font-size: 1.1rem;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .i-social {
    width: 40px;
    height: 40px;
    margin: 20px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    position: relative;
  }
  
  .i-social:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(black));
    background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0), black);
    background-image: -o-linear-gradient(rgba(0, 0, 0, 0), black);
    background-image: linear-gradient(rgba(0, 0, 0, 0), black);
  }
  
  .social_1 {
    background-image: url(/img/icon_facebook.svg);
  }
  
  .social_2 {
    background-image: url(/img/icon_instagram.svg);
  }
  
  .social_3 {
    background-image: url(/img/icon_twitter.svg);
  }
  .header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 70px;
	z-index: 1;
    }

    .i-alert{
      color:red;
      font-size:20px;
      margin-right:5px;
      transform:translateY(5px);
    }
    .underline{
      position:relative;
    }
    .underline:before{
      position:absolute;
      content:'';
      width:100% !important;
      height:3px !important;
      bottom:0 !important;
      left:0 !important;
      background-color:#f1ca0b !important;
    }
</style>
`
const header = document.createElement('template')
header.innerHTML = `
  ${shadowDOM_css}
<header class="header">
<div class="headerContent">
    <div class="logo">CINEMA WORLD</div>
    <div class="menuPart">
        <a href="" class="menuBtn">Cinema</a>
        <a href="" class="menuBtn">Movie</a>
        <a href="" class="menuBtn">Food & Drink</a>
        <a href="" class="menuBtn">Contact</a>
    </div>
    <div class="searchBoxContainer">
        <input type="text" class="searchBox" placeholder="Search movies">
        <span class="material-icons i-search">
            search
        </span>
    </div>
</div>
</header>
`

class Header extends HTMLElement{
    constructor(){
        super()

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(header.content.cloneNode(true))
    }
    connectedCallback(){
        const searchBar = this.shadowRoot.querySelector('.searchBoxContainer')
        const searchIcon = this.shadowRoot.querySelector('.header .i-search')
        const searchBox = this.shadowRoot.querySelector('.searchBox')
        searchBar.addEventListener('click', searchAction)
        searchBar.addEventListener('keyup', searchAction)
        
        
        function searchAction(e){
          let targetText = ''
          if(e.target === searchIcon || e.keyCode === 13){
            if(searchBox.value === ''){
              targetText = 'Write at least 1 letter'
              alertMessage(targetText,true)
            }else{
              targetText = 'Not in service yet'
              alertMessage(targetText,true)
            }
          }
        }
        function alertMessage(targetText, trigger){
            const newElement = document.createElement('div')
            if(searchBar.children[2]){
              searchBar.removeChild(searchBar.children[2])
            }
            let actionTrigger = trigger
            actionTrigger = false
            newElement.innerHTML = `  
            <span class="material-icons i-alert">
            block
            </span>     
            <span class="alertText">${targetText}</span>
            `
            newElement.classList.add('alertBox')
            searchBar.appendChild(newElement)
            setTimeout(function(){
              newElement.classList.add('activeSlide')
            },10)
            actionTrigger = trigger
            if(actionTrigger === true){
              setTimeout(()=>{
                newElement.classList.remove('activeSlide')
              },3000)
              setTimeout(function(){
                searchBar.removeChild(newElement)
              },3300)
              searchBox.value=''
           }
        }

        let activeAnimation = true
        window.onscroll=()=>{
          const header = this.shadowRoot.querySelector('.header')
          if(window.scrollY > 100 && activeAnimation === true){
            header.className='header activeHeader'
            activeAnimation = false
          }
          if(window.scrollY < 100 && activeAnimation ===false){
            header.className = 'header inactiveHeader'
            activeAnimation = true
          }
        };

        const menuBtn = this.shadowRoot.querySelectorAll('.menuBtn')
        function menuUnderLine(){
          const text = window.location.toString()
          if(text.includes('index')){
            menuBtn[0].classList.add('underline')
          }
        }
        menuUnderLine()
      
    }
}

window.customElements.define('template-header', Header)

// footer component
const footer = document.createElement('template')
footer.innerHTML = `
${shadowDOM_css}

<div class="footer">
    <div class="footerContainer">
        <div class="footerLogo">CINEMA WORLD</div>
        <div class="footerMenu">
            <div class="menu">Cinema</div>
            <div class="menu">Movie</div>
            <div class="menu">Food & Drinks</div>
            <div class="menu">Contact</div>
        </div>
        <div class="socialMediaBox">
            <div class="socialMedia">
                <div class="i-social social_1"></div>
                <div class="i-social social_2"></div>
                <div class="i-social social_3"></div>
            </div>
        </div>
        <div class="copyright">
            Copyright © 2021 Cinema World, All Rights Reserved
        </div>
    </div>
</div>

`
class Footer extends HTMLElement{
    constructor(){
        super()

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(footer.content.cloneNode(true))
    }
}

window.customElements.define('template-footer',Footer)


const closeButtons = document.querySelectorAll('.i-close')


function closeBtn(){
  const closeButtons = document.querySelectorAll('.i-close')
  closeButtons.forEach((btn)=>{
    btn.addEventListener('click',()=>{
      if(btn.parentElement.classList.contains('modalContainer')){
        closeModal()
      }else if(btn.parentElement.classList.contains('subModalContainer')){
        closeSubModal()
      }else if(btn.parentElement.classList.contains('seatMapContainer')){
        closeSeatModal()
      }
    })
  })
}


function closeModal(){
  const modal = document.querySelector('.modal')
  const parentElement = modal.parentElement
  modal.classList.remove('activeModal')
  modal.addEventListener('transitionend',()=>{
    if(!modal.classList.contains('activeModal')){
      parentElement.removeChild(modal)
    }
  })
}
function closeSubModal(){
  const subModal = document.querySelector('.subModal')
  const parentElement = subModal.parentElement
  subModal.classList.remove('activeModal')
  setTimeout(()=>{

    parentElement.removeChild(subModal)
  },300)
}
function closeSeatModal(){
  const seatModal = document.querySelector('.seatMapModal')
  const container = document.querySelector('.seatMapContainer')
  seatModal.classList.remove('activeModal')
  setTimeout(()=>{
    seatModal.style.display='none'
  },300)
}

window.onclick=(e)=>{
  if(e.target.matches('.modal')){
    closeModal()
  }else if(e.target.matches('.subModal')){
    closeSubModal()
  }else if(e.target.matches('.seatMapModal')){
    closeSeatModal()
  }else if(e.target.matches('.closeModalBtn')){
    closeModal()
  }
  closeBtn()
}




const movieInfo = [
  {
      
      title:'Spider Man4',
      image:'/img/hero_1.jpg',
      description:'Peter Parker as he prepares for his future with Mary Jane Watson, while facing three new villains: Uncle Ben\'s true killer, Flint Marko, who becomes Sandman after a freak accident; Harry Osborn, his former friend, who is now aware of Peter\'s identity and ...',
      trailer:'../video/spiderman.mp4',
      length:'127 Min',
      icon:['adult', 'violence'],
      actor:'Lion Mack, Jone Jons, Mark Hunt'
      
  
  },
  {
    
      title:'Lost',
      image:'/img/hero_2.jpg',
      description:'While searching for their missing archaeology professor, a group of students discovers a cave where time passes differently than it does on the surface.',
      ticket:'',
      trailer:'../video/lost.mp4',
      length:'108 Min',
      icon:['adolescent','violence'],
      actor:'Tom Cruise, James Willis, Matt Hardy'
  },
  {
     
      title:'unforgettable Memory',
      image:'/img/hero_3.jpg',
      text:'I met her once, but I can feel something odd. Is it love?',
      ticket:'',
      trailer:'../video/memory.mp4',
      length:'121 Min',
      icon:['adolescent','romance'],
      actor:'Londa Rousy, Missha Tate, Black Jack'
  }
];










