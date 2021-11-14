// Hero page section
(function(){
    const heroMovies = [
        {
            
            title:'Spider Man4',
            image:'/img/hero_1.jpg',
            text:'The most dangerous thing is coming. The most exciting series finally released.',
            ticket:'임시',
            trailer:'임시',
        
        },
        {
          
            title:'Lost',
            image:'/img/hero_2.jpg',
            text:'Now, I bet you will see the most horrified, scared movie in this year.',
            ticket:'',
            trailer:''
        },
        {
           
            title:'unforgettable Memory',
            image:'/img/hero_3.jpg',
            text:'I met her once, but I can feel something odd. Is it love?',
            ticket:'',
            trailer:''
        }
    ]


    const layPoster = heroMovies.map((movie)=>{
        return `
            <div class="heroItem">
                <div class="heroTextPart">
                    <p class="title">${movie.title}</p>
                    <p class="subTitle">${movie.text}</p>
                    <a href="#" class="orangeBtn"><span class="material-icons">
                        credit_card
                        </span>Buy tickets</a>

                    <a href="#" class="grayBtn"><span class="material-icons">
                        videocam
                        </span> Play trailer</a>
                </div>
            </div>
        `
    })
    
    const container = document.querySelector('.heroPageSection')
    const posterContainerWidth = window.innerWidth*(layPoster.length+2) + 'px'
    container.style.width=posterContainerWidth


    layPoster.forEach((poster)=>{
        container.innerHTML += poster
        addClass()
    })

    const clonedFirstMovie = `
    <div class="heroItem clonedFirstMovie" style='background-image: url(${heroMovies[0].image});'>
    <div class="heroTextPart">
        <p class="title">${heroMovies[0].title}</p>
        <p class="subTitle">${heroMovies[0].text}</p>
        <a href="#" class="orangeBtn"><span class="material-icons">
            credit_card
            </span>Buy tickets</a>

        <a href="#" class="grayBtn"><span class="material-icons">
            videocam
            </span> Play trailer</a>
        </div>
    </div>  
    `
    // clonedFirstMovie.classList.add('clonedFirstMovie')
    container.innerHTML+=`
    ${clonedFirstMovie}
          <div class="arrow prevBtn">
                <span class="material-icons">
                    arrow_back_ios_new
                    </span>
            </div>
            <div class="arrow nextBtn">
                <span class="material-icons">
                    arrow_forward_ios
                    </span>
            </div>
            <div class="dotBox">
                <span class="dot activeDot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
    `
   

    
    function addClass(){
        let classNum = 1
        const posters = document.querySelectorAll('.heroItem')
        posters.forEach(function(poster){
            poster.classList.add(`item${classNum}`)
            poster.style.backgroundImage=`url(/img/hero_${classNum++}.jpg)`
        })
    }

    const clonedLastMovie = `
    <div class="heroItem clonedLastMovie" style='background-image: url(${heroMovies[heroMovies.length-1].image});'>
    <div class="heroTextPart">
        <p class="title">${heroMovies[heroMovies.length-1].title}</p>
        <p class="subTitle">${heroMovies[heroMovies.length-1].text}</p>
        <a href="#" class="orangeBtn"><span class="material-icons">
            credit_card
            </span>Buy tickets</a>

        <a href="#" class="grayBtn"><span class="material-icons">
            videocam
            </span> Play trailer</a>
        </div>
    </div>  
    `
    const heroContents = container.innerHTML
    container.innerHTML = `
    ${clonedLastMovie}
    ${heroContents}
    `

    
    

    const nextBtn = document.querySelector('.nextBtn')
    const dotsBox = document.querySelector('.dotBox')
    
    nextBtn.style.left = window.innerWidth - 100 + 'px'
    
    const dotCenter = (window.innerWidth / 2) - 86
    dotsBox.style.left=dotCenter + 'px'

    
    // arrow click function
    const arrows = document.querySelectorAll('.arrow')
    arrows.forEach((arrow)=>{
        arrow.addEventListener('click', changeSlide)
    })

    let slideIndex = 1
    function changeSlide(e){
        const heroItems = document.querySelectorAll('.heroItem')
        if(this.classList.contains('prevBtn')){
            slideIndex-=1
            if(slideIndex === 0){
                slideIndex = heroMovies.length
            }
            heroItems.forEach(function(poster){
                poster.style.transform='translate(-1920px,0)'
            })
        }else if(this.classList.contains('nextBtn')){
            slideIndex+=1
            if(slideIndex > heroMovies.length){
                slideIndex = 0
            }
            heroItems.forEach(function(poster){
                poster.style.transform='translate(-1920px,0)'
            })
        }
    }


})();
