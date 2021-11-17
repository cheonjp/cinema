// Hero page section
(function(){
    // movies data
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

    // creating hero section
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
    container.innerHTML+=`
    ${clonedFirstMovie}
 
    `
   

    // adding class name to target posters
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
    const prevBtn = document.querySelector('.prevBtn')
    const dotsBox = document.querySelector('.dotBox')
    
    nextBtn.style.left = window.innerWidth - 100 + 'px'
    
    const dotCenter = (window.innerWidth / 2) - 86
    dotsBox.style.left=dotCenter + 'px'

    container.style.transform = `translateX(-${window.innerWidth}px)`

    
    // arrow click function
    const arrows = document.querySelectorAll('.arrow')
    arrows.forEach((arrow)=>{
        arrow.addEventListener('click', changeSlide)
    })

    let slideIndex = 1
    let slideWidth = window.innerWidth
    function changeSlide(){
        container.style.transition = '.5s ease-in-out'
        if(this.classList.contains('prevBtn')){
            slideIndex--
            if(slideIndex <= 0){
                // slideIndex = heroMovies.length-1
                returnIndex()
            }
            container.style.transform=`translateX(-${slideWidth * slideIndex}px)`
            leftArrowDotsAction()
            gaugeTimer()
        }else if(this.classList.contains('nextBtn')){
            slideIndex++
            if(slideIndex > heroMovies.length-1){
                returnIndex()
            }
            container.style.transform=`translateX(-${slideWidth * slideIndex}px)`
            rightArrowDotsAction()
            gaugeTimer()
        }
        
    }

    function returnIndex(){
        setTimeout(()=>{
            container.style.transition = '0s'
            if(slideIndex > heroMovies.length-1){
                slideIndex = 0
            }else if(slideIndex <= 0 ){
                slideIndex = heroMovies.length
            }
            container.style.transform=`translateX(-${slideWidth * slideIndex}px)`
        },500)
    }

    const dots = document.querySelectorAll('.dot')
    function leftArrowDotsAction(){
        dots.forEach((dot)=>{
            dot.classList.remove('activeDot')
            if(slideIndex === 0){
                dots[2].classList.add('activeDot')
            }else if(slideIndex === 1){
                dots[0].classList.add('activeDot')
            }else if(slideIndex ===2){
                dots[1].classList.add('activeDot')
            }
        })
    }
    function rightArrowDotsAction(){
        dots.forEach((dot)=>{
            dot.classList.remove('activeDot')
            if(slideIndex === 3){
                dots[2].classList.add('activeDot')
            }else if(slideIndex === 1){
                dots[0].classList.add('activeDot')
            }else if(slideIndex ===2){
                dots[1].classList.add('activeDot')
            }
        })
    }

    
    const gauge = document.querySelector('.gauge')
    function gaugeTimer(){
        gauge.className ='gauge'
        setTimeout(function(){
            gauge.classList.add('activeGauge')
        },10)
       
    }
    gauge.addEventListener('transitionend',function(){
        nextBtn.click()
    })


    gaugeTimer()

    dotClickSlide()

    function dotClickSlide(){
        dots.forEach((dot)=>{
            dot.addEventListener('click',(e)=>{
                targetDot()
                dot.classList.remove('activeDot')
                if(e.target === dots[0]){
                    slideIndex = 0
                    dots[0].classList.add('activeDot')
                }else if(e.target === dots[1]){
                    slideIndex = 1
                    dots[1].classList.add('activeDot')
                } else if(e.target === dots[2]){
                    slideIndex =2
                    dots[2].classList.add('activeDot')
                }
                container.style.transition = '.5s ease-in-out'
                container.style.transform=`translateX(-${slideWidth * slideIndex}px)`
                gaugeTimer()
            })
        })
        function targetDot(){
            dots.forEach(function(dot){
                dot.classList.remove('activeDot')
            })
        }
    }

})();
