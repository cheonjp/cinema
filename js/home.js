(function(){
    // creating hero section
    const layPoster = heroMovies.map((movie)=>{
        return `
            <div class="heroItem">
                <div class="heroTextPart">
                    <p class="title">${movie.title}</p>
                    <p class="subTitle">${movie.text}</p>
                    <a href="#" class="orangeBtn" data-ticket ="${movie.title}"><span class="material-icons">
                        credit_card
                        </span>Buy tickets</a>

                    <a href="#" class="grayBtn" data-trailer ="${movie.title}"><span class="material-icons">
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
        <a href="#" class="orangeBtn" data-ticket ="${heroMovies[0].title}"><span class="material-icons">
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
        <a href="#" class="orangeBtn" data-ticket ="${heroMovies[heroMovies.length-1].title}"><span class="material-icons">
            credit_card
            </span>Buy tickets</a>

        <a href="#" class="grayBtn" data-trailer="${heroMovies[heroMovies.length-1].title}"><span class="material-icons">
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

// creating trailer

const body = document.querySelector('body')
const modalContainer = document.createElement('div');
(function(){

    const trailerButtons = document.querySelectorAll('.heroContainer .grayBtn')
    trailerButtons.forEach((trailerBtn)=>{
        trailerBtn.addEventListener('click',(e)=>{
            const data = trailerBtn.dataset.trailer
            heroMovies.forEach((movie)=>{
                if(movie.title === data){
                    createTrailer(movie)
                }
            })
        })
    })
})();

(function(){
    const ticketBtns = document.querySelectorAll('.heroContainer .orangeBtn')
    ticketBtns.forEach((ticketBtn)=>{
        ticketBtn.addEventListener('click',(e)=>{
            const data = ticketBtn.dataset.ticket
            heroMovies.forEach((movie)=>{
                if(movie.title === data){
                    createInfoModal(movie)
                }
            })
        })
    })
})()

function createTrailer(targetMovie){
    const modal = document.querySelector('.modal')
    if(modal === null){
        modalContainer.innerHTML = `
            <div class="modalContainer">
                <span class="material-icons i-close">
                    close
                    </span>
                <video class="trailerVideo" controls muted autoplay>
                    <source src="${targetMovie.trailer}">
                </video>
            </div>
        `
        modalContainer.classList.add('modal')
        body.appendChild(modalContainer)
        modalContainer.classList.add('activeModal')
    }else{
        const trailerBtn = document.querySelectorAll('.modal .grayBtn')
        const modalContainer = document.querySelector('.modalContainer')
        trailerBtn.forEach((btn)=>{
            btn.onclick=()=>{
                if(btn.dataset.trailer === targetMovie.title){
                    const subModal = document.createElement('div')
                    subModal.classList.add('subModal')
                    subModal.innerHTML=`
                    <div class="subModalContainer">
                        <span class="material-icons i-close">
                            close
                            </span>
                        <video class="trailerVideo" controls muted autoplay>
                            <source src="${targetMovie.trailer}">
                        </video>
                    </div>
                    `
                    modalContainer.appendChild(subModal)
                    subModal.classList.add('activeModal')
                }
            }
        })

        // modalContainer.innerHTML = `
        //         <div class="subModalContainer">
        //             <span class="material-icons i-close">
        //                 close
        //                 </span>
        //             <video class="trailerVideo" controls muted autoplay>
        //                 <source src="${targetMovie.trailer}">
        //             </video>
        //         </div>
        // `
    }

}

function createInfoModal(targetMovie){
    const {title,image,text,trailer,description,length,icon,actor}=targetMovie
    const targetContent = document.createElement('div')
    targetContent.innerHTML=`
        <div class="modalContainer activeModal">
            <span class="material-icons i-close">
                close
                </span>
            <div class="contentBox">
                <div class="titleContainer">
                    <h2 class="movieTitle">${title}</h2>
                </div>
                <div class="navigation">
                    <div class="process movie status"></div>
                    <div class="process"></div>
                    <div class="process"></div>
                    <div class="process"></div>
                    <div class="process selection"></div>
                    <div class="process"></div>
                    <div class="process"></div>
                    <div class="process"></div>
                    <div class="process checkout"></div>
                </div>
                <div class="infoContainer">
                    <div class="movieImg" style="background-image:url(${image})"></div>
                    <div class="movieInfoBox">
                        <div class="infoTopPart">
                            <div class="movieLength">Movie length: <span>${length}</span></div>
                            <div class="iconBox">
                                <span class="${icon[0]}"></span>
                                <span class="genreInfo">${icon[1]}</span>
                                <span class="genreInfo">${icon[2]}</span>
                            </div>
                        </div>
                        <div class="infoSubtitle">Cast</div>
                        <div class="cast">${actor}</div>
                        <div class="infoSubtitle">Synopsis</div>
                        <div class="movieDescriction">
                            ${description}
                        </div>
                    </div>
                    <div class="bookingBox displayNone">
                        <div class="bookingDateContainer section">
                            <div class="currentMonth">
                                2021.09
                            </div>
                            <div class="dateContainer">
                                <div class="dateBox">
                                    <span class="date select">Mon</span>
                                    <span class="date">Tus</span>
                                    <span class="date">Wed</span>
                                    <span class="date">Thu</span>
                                    <span class="date">Fri</span>
                                    <span class="date">Sat</span>
                                    <span class="date">Sun</span>
                                    <span class="date">Mon</span>
                                    <span class="date">Tus</span>
                                    <span class="date">Wed</span>
                                </div>
                                <div class="dayBox">
                                    <span class="day select">1</span>
                                    <span class="day">2</span>
                                    <span class="day">3</span>
                                    <span class="day">4</span>
                                    <span class="day">5</span>
                                    <span class="day">6</span>
                                    <span class="day">7</span>
                                    <span class="day">8</span>
                                    <span class="day">9</span>
                                    <span class="day">10</span>
                                </div>
                            </div>
                        </div>
                        <div class="selectTimeContainer section">
                            <div class="titleBox">
                                <span class="material-icons i-time">
                                    schedule
                                    </span>
                                    <span>Select Movie time</span>
                            </div>
                            <div class="timeBoxContainer">
                                <div class="timeBtnBox">
                                    <div class="timeBtn">12:18</div>
                                    <div class="seat">16 Seats</div>
                                </div>
                                <div class="timeBtnBox">
                                    <div class="timeBtn">12:18</div>
                                    <div class="seat">16 Seats</div>
                                </div>
                                <div class="timeBtnBox">
                                    <div class="timeBtn">12:18</div>
                                    <div class="seat">16 Seats</div>
                                </div>
                                <div class="timeBtnBox">
                                    <div class="timeBtn">12:18</div>
                                    <div class="seat">16 Seats</div>
                                </div>
                            </div>
                        </div>
                        <div class="selectSeatContainer section">
                            <div class="titleBox">
                                <span class="material-icons i-chair">
                                    chair
                                    </span>
                                <span>Select seat</span>
                            </div>
                            <div class="seatContainer">
                                <div class="seatColumn">
                                    <div class="seatGradeBox">
                                        <div class="gradeBox"></div>
                                        <div>Normal seats</div>
                                    </div>
                                    <div class="priceBox">
                                        <div>Price: <span class="price">12</span>$</div>
                                    </div>
                                    <select id="people" name="" id="">
                                        <option value="People">1</option>
                                        <option value="People">2</option>
                                        <option value="People">3</option>
                                        <option value="People">4</option>
                                        <option value="People">5</option>
                                        <option value="People">6</option>
                                        <option value="People">7</option>
                                        <option value="People">8</option>
                                        <option value="People">9</option>
                                        <option value="People">10</option>
                                        <option value="People" selected disabled>People</option>
                                    </select>
                                </div>
                                <div class="seatColumn">
                                    <div class="seatGradeBox">
                                        <div class="gradeBox"></div>
                                        <div>Normal seats</div>
                                    </div>
                                    <div class="priceBox">
                                        <div>Price: <span class="price">12</span>$</div>
                                    </div>
                                    <button id="searchSeat" class="yellowBorderBtn">
                                        <span class="material-icons i-seat">
                                            airline_seat_recline_normal
                                            </span>
                                            Find available seat
                                    </button>
                                </div>
                                <div class="seatColumn lastPriceBox">
                                    <div class="seatGradeBox">
                                        <div class="gradeBox"></div>
                                        <div>Normal seats</div>
                                    </div>
                                    <div class="priceBox">
                                        <div>Price: <span class="price">12</span>$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="processingButtonBox">
                    <a href="#" class="orangeBtn" data-ticket ="${title}"><span class="material-icons">
                        credit_card
                    </span>Buy tickets</a>

                    <a href="#" class="grayBtn" data-trailer ="${title}"><span class="material-icons">
                        videocam
                    </span> Play trailer</a>
                    <button class="backBtn whiteBorderBtn">Back</button>
                    <button class="nextBtn yellowBorderBtn">Next</button>
                </div>
            </div>
        </div>
    `
    body.appendChild(targetContent)
    targetContent.classList.add('modal')
    setTimeout(function(){
        targetContent.classList.add('activeModal')
    },10)
    changeBtn('movie')
    createTrailer(targetMovie)
    ticketing(targetMovie)
}

const changeBtn = (process)=>{
    const backBtn = document.querySelector('.modalContainer .backBtn')
    const nextBtn = document.querySelector('.modalContainer .nextBtn')
    const ticketBtn = document.querySelector('.modalContainer .orangeBtn')
    const trailerBtn = document.querySelector('.modalContainer .grayBtn')
    if(process ==='movie'){
        backBtn.classList.add('displayNone')
        nextBtn.classList.add('displayNone')
    }else{
        ticketBtn.classList.add('displayNone')
        trailerBtn.classList.add('displayNone')
        backBtn.classList.remove('displayNone')
        nextBtn.classList.remove('displayNone')
    }
}

const ticketing=(process)=>{
    const ticketBtn = document.querySelector('.modalContainer .orangeBtn')
    const movieInfo = document.querySelector('.movieInfoBox')
    const bookingBox = document.querySelector('.bookingBox')
    ticketBtn.onclick=()=>{
        movieInfo.classList.add('activeProcess')
        movieInfo.ontransitionend=()=>{
            movieInfo.classList.add('displayNone')
            bookingBox.classList.remove('displayNone')
            setTimeout(function(){
                bookingBox.classList.add('activeShow')
            },20)
            changeBtn('booking')
            activeNavi('booking')
        }
    }
}

let timing = 0
function activeNavi(status){
    const  statusDots = document.querySelectorAll('.process')
    for(let i=0;i<5; i++){
        setTimeout(()=>{
            statusDots[i].classList.add('status')
        },timing)
        timing+=50
    }
}











// https://xd.adobe.com/view/c5275501-8693-4b52-9135-69d10bdff06a-9074/