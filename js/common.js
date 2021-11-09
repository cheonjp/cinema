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
  
  .header .menuBtn:hover {
    letter-spacing: 1px;
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
      background:red;
      color:white;
      border-radius:50px;
      top:19px;
      left:0px;
      height:30px;
  }
  .alertText{
      padding:5px 10px;
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

        function searchAction(e){
            let targetText = ''
            if(e.target === searchIcon){
                if(searchBox.value === ''){
                    targetText = 'At least 1 letter'
                    alertMessage(targetText,true)
                }else{
                    targetText = 'Can not find one'
                    alertMessage(targetText,true)
                }
            }
        }
        function alertMessage(targetText, trigger){
            const newElement = document.createElement('div')
            let actionTrigger = trigger
            actionTrigger = false
            newElement.innerHTML = `           
                <div class="alertText">${targetText}</div>
            `
            newElement.classList.add('alertBox')
            searchBar.appendChild(newElement)
            actionTrigger = trigger
           if(actionTrigger === true){
               setTimeout(()=>{
                searchBar.removeChild(newElement)
                searchBox.value=''
               },3000)
           }
        }
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