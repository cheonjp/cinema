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
                    <div class="process movie status blink"></div>
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
                                    <span class="day select" data-booking-date="0">Mon</span>
                                    <span class="day" data-booking-date="1">Tus</span>
                                    <span class="day" data-booking-date="2">Wed</span>
                                    <span class="day" data-booking-date="3">Thu</span>
                                    <span class="day" data-booking-date="4">Fri</span>
                                    <span class="day" data-booking-date="5">Sat</span>
                                    <span class="day" data-booking-date="6">Sun</span>
                                    <span class="day" data-booking-date="7">Mon</span>
                                    <span class="day" data-booking-date="8">Tus</span>
                                    <span class="day" data-booking-date="9">Wed</span>
                                </div>
                                <div class="dayBox">
                                    <span class="date select" data-booking-date="0">1</span>
                                    <span class="date" data-booking-date="1">2</span>
                                    <span class="date" data-booking-date="2">3</span>
                                    <span class="date" data-booking-date="3">4</span>
                                    <span class="date" data-booking-date="4">5</span>
                                    <span class="date" data-booking-date="5">6</span>
                                    <span class="date" data-booking-date="6">7</span>
                                    <span class="date" data-booking-date="7">8</span>
                                    <span class="date" data-booking-date="8">9</span>
                                    <span class="date" data-booking-date="9">10</span>
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
                                        <option value="1" class="optionPeople">1</option>
                                        <option value="2" class="optionPeople">2</option>
                                        <option value="3" class="optionPeople">3</option>
                                        <option value="4" class="optionPeople">4</option>
                                        <option value="5" class="optionPeople">5</option>
                                        <option value="6" class="optionPeople">6</option>
                                        <option value="7" class="optionPeople">7</option>
                                        <option value="8" class="optionPeople">8</option>
                                        <option value="9" class="optionPeople">9</option>
                                        <option value="10" class="optionPeople">10</option>
                                        <option value="selected" selected disabled>People</option>
                                    </select>
                                </div>
                                <div class="seatColumn">
                                    <div class="seatGradeBox">
                                        <div class="gradeBox yellow"></div>
                                        <div>Premium seats</div>
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
                                        <div class="gradeBox red"></div>
                                        <div>Unavailable seats</div>
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
    createTrailer(targetMovie)
    ticketing(targetMovie)
    processingBooking()
    selectOption()
    selectPeople()
}

let peopleNumber
function selectPeople(){
    peopleDropBox = document.querySelector('#people')
    peopleOptions = document.querySelectorAll('#people .optionPeople')
    peopleOptions.forEach((option)=>{
        option.addEventListener('click',()=>{
            return peopleNumber = option.value
        })
    })
}



const changeBtn = (processStatus)=>{
    const backBtn = document.querySelector('.modalContainer .backBtn')
    const nextBtn = document.querySelector('.modalContainer .nextBtn')
    const ticketBtn = document.querySelector('.modalContainer .orangeBtn')
    const trailerBtn = document.querySelector('.modalContainer .grayBtn')
    if(processStatus ==='movie'){
        backBtn.classList.add('displayNone')
        nextBtn.classList.add('displayNone')
        ticketBtn.classList.remove('displayNone')
        trailerBtn.classList.remove('displayNone')
    }else if(processStatus !== 'movie'){
        ticketBtn.classList.add('displayNone')
        trailerBtn.classList.add('displayNone')
        backBtn.classList.remove('displayNone')
        nextBtn.classList.remove('displayNone')
    }
}

const ticketing=()=>{
    let takingProcessBack =false
    let processStatus = 'movie'
    const ticketBtn = document.querySelector('.modalContainer .orangeBtn')
    const backBtn = document.querySelector('.modal .backBtn')
    ticketBtn.onclick=()=>{
        if(processStatus === 'movie'){
            takingProcessBack = false
            if(takingProcessBack === false){
                processStatus = 'select_time_seat'
                activeNavi(processStatus,takingProcessBack)
            }
        }
    }
    backBtn.onclick=()=>{
        if(processStatus ==='select_time_seat'){
            takingProcessBack = true
            processStatus = 'movie'
            activeNavi(processStatus,takingProcessBack)
        }
    }
    changeBtn(processStatus)
}



function activeNavi(status,backup){
    let timing = 0
    const  statusDots = document.querySelectorAll('.process')
    if(status === 'movie' && backup === true){
        statusDots.forEach((dot)=>{
            dot.classList.remove('status')
        })
        statusDots[0].classList.add('status')
    }
    if(status ==='select_time_seat' && backup === false){
        for(let i=0;i<5; i++){
            setTimeout(()=>{
                statusDots[i].classList.add('status')
            },timing)
            timing+=50
        }
    }
    changeBtn(status)
    changeInfo(status, backup)
    blinkStatus(status)
}

function blinkStatus(status){
    const dots = document.querySelectorAll('.process')
    dots.forEach((dot)=>{
        dot.classList.remove('blink')
        if(status === 'movie'){
            if(dot.classList.contains('movie')){
                dot.classList.add('blink')
            }
        }
        if(status ==='select_time_seat'){
            if(dot.classList.contains('selection')){
                dot.classList.add('blink')
            }
        }
    })
}

function changeInfo(status, backup){
    const movieInfo = document.querySelector('.movieInfoBox')
    const bookingBox = document.querySelector('.bookingBox')
    if(status ==='select_time_seat' && backup === false){
        movieInfo.classList.add('activeProcess')
        setTimeout(()=>{
            movieInfo.classList.add('displayNone')
            bookingBox.classList.remove('displayNone')
        },300)
        setTimeout(()=>{
            bookingBox.className = 'bookingBox activeShow'
        },330)
    }
    if(status === 'movie' && backup === true){
        bookingBox.classList.remove('activeShow')
        setTimeout(()=>{
            bookingBox.classList.add('displayNone')
            movieInfo.classList.remove('displayNone')
            setTimeout(()=>{
                movieInfo.classList.remove('activeProcess')
            },320)
        },300)
    }
}


function processingBooking(){
    peopleNumber = undefined
    let index = -1
    const bookingMonth = document.querySelector('.currentMonth')
    const bookingDate = document.querySelectorAll('.date')
    const bookingDay = document.querySelectorAll('.day')

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    bookingMonth.innerText = currentYear + '.' + currentMonth
    bookingDate.forEach((date)=>{
        index+=1
        const currentDate = new Date().getDate()
        let setDate = currentDate + index
        if(setDate > 31){
            setDate = setDate - 31

        }
        date.innerText = setDate
    })
    index = -1
    bookingDay.forEach((day)=>{
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        index +=1
        const currentDay = new Date().getDay()
        if((currentDay+index) > 6){
            index = -currentDay
        }
        const calculatedIndex = index + currentDay
        
        day.innerText = days[calculatedIndex]
    })

    const hours =[]
    const minutes = []
    let timeIndex =0
    const timeBtn = document.querySelectorAll('.timeBtn')
    timeBtn.forEach((btn)=>{
        let hour = Math.floor(Math.random() * 24)
        let minute = Math.floor(Math.random()*60)
        hours.push(hour)
        hours.sort((a,b)=>{
            return a - b
        })
        minutes.push(minute)
    })
    timeBtn.forEach((btn)=>{
        btn.classList.remove('activeOption')
        const finalHour = hours[timeIndex].toString()
        if(finalHour.length === 1){
            btn.innerText ='0'+hours[timeIndex]+' : '
        }else if(finalHour.length ===2){
            btn.innerText = hours[timeIndex]+' : '
        }
        
        const finalMinute = minutes[timeIndex].toString()
        if(finalMinute.length === 1){
            btn.innerText+='0'+finalMinute
        }else if(finalMinute.length ===2){
            btn.innerText+=' '+finalMinute
        }
        timeIndex++

        const currentTime = ()=>{
            const currentHour = new Date().getHours()
            const currentMin = new Date().getMinutes()
            return (currentHour.toString() + currentMin.toString())
        }
        const btnText = btn.innerText
        const onlyMovieTime = btnText.replace(':','')
        const movieTime = onlyMovieTime.replace(/ /g,'')
        const today = document.getElementsByClassName('date')[0]
        if(movieTime < currentTime() && today.classList.contains('select')){
            btn.classList.add('unavailableTime')
        }else{
            btn.classList.remove('unavailableTime')
        }

        const seats = document.querySelectorAll('.seat')
        seats.forEach((seat)=>{
            const seatNum = Math.floor(Math.random()*189)
            const calculatedSeat = seatNum % 4
            if(calculatedSeat === 0){
                seat.textContent='Sold Out'
                seat.previousElementSibling.classList.add('soldOut')
            }else{
                seat.textContent =seatNum +' tickets'
                seat.style.color='white'
                seat.previousElementSibling.classList.remove('soldOut')
            }
            if(seatNum < 20 && !seat.previousElementSibling.classList.contains('unavailableTime') && !seat.previousElementSibling.classList.contains('soldOut')){
                seat.classList.add('activeHurryUp')
            }else{
                seat.classList.remove('activeHurryUp')
            }
            
        })
    })
}

function selectOption(){
    let dateIndex = 0
    const movieTimeBtn = document.querySelectorAll('.timeBtn')
    const dateButtons = document.querySelectorAll('.date')
    const dayButtons = document.querySelectorAll('.day')
    movieTimeBtn.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('unavailableTime')){
                movieTimeBtn.forEach((btn)=>{
                    btn.classList.remove('activeOption')
                })
                if(!e.target.classList.contains('soldOut')){
                    e.target.classList.add('activeOption')
                }
            }
        })
    })
    dateButtons.forEach((eachBtn)=>{
        selectDate(eachBtn,dayButtons)
    })
    dayButtons.forEach((eachBtn)=>{
        selectDate(eachBtn,dateButtons)
    })


    function selectDate(targetBtn,siblingBtn){
        targetBtn.addEventListener('click',()=>{
            dayButtons.forEach((day)=>{
                day.classList.remove('select')
            })
            dateButtons.forEach((date)=>{
                date.classList.remove('select')
            })
            const dataset = targetBtn.dataset.bookingDate
            dateIndex = dataset
            targetBtn.classList.add('select')
            siblingBtn[dateIndex].classList.add('select')
            processingBooking()
        })
    }
    findingAvailableSeat()
}

function findingAvailableSeat(){
    const seatAlphabets=['A','B','C','D','E','F','G','H','I']
    const searchingSeatBtn = document.querySelector('#searchSeat')
    const parentElement = document.querySelector('.modalContainer')
    const modal = document.createElement('div')

    searchingSeatBtn.addEventListener('click',()=>{
        let totalLine = ''
        const selectedTime = document.querySelector('.activeOption')
        if(peopleNumber !==undefined && selectedTime !== null){
            seatAlphabets.map((eachLine)=>{
                let lineSeat = `
                    <div class="seatLine">
                        <span class="seat" data-seat="${eachLine}1">1</span>
                        <span class="seat" data-seat="${eachLine}2">2</span>
                        <span class="seat" data-seat="${eachLine}3">3</span>
                        <span class="seat" data-seat="${eachLine}4">4</span>
                        <span class="passage">${eachLine}</span>
                        <span class="seat" data-seat="${eachLine}5">5</span>
                        <span class="seat" data-seat="${eachLine}6">6</span>
                        <span class="seat" data-seat="${eachLine}7">7</span>
                        <span class="seat" data-seat="${eachLine}8">8</span>
                        <span class="seat" data-seat="${eachLine}9">9</span>
                        <span class="seat" data-seat="${eachLine}10">10</span>
                        <span class="seat" data-seat="${eachLine}11">11</span>
                        <span class="seat" data-seat="${eachLine}12">12</span>
                        <span class="seat" data-seat="${eachLine}13">13</span>
                        <span class="seat" data-seat="${eachLine}14">14</span>
                        <span class="seat" data-seat="${eachLine}15">15</span>
                        <span class="seat" data-seat="${eachLine}16">16</span>
                        <span class="seat" data-seat="${eachLine}17">17</span>
                        <span class="passage">${eachLine}</span>
                        <span class="seat" data-seat="${eachLine}18">18</span>
                        <span class="seat" data-seat="${eachLine}19">19</span>
                        <span class="seat" data-seat="${eachLine}20">20</span>
                        <span class="seat" data-seat="${eachLine}21">21</span>
                    </div>
                `
                totalLine += lineSeat
            })
            modal.innerHTML = `
                <div class="seatMapContainer">
                    <div class="screen">Screen</div>
                    ${totalLine}
                </div>
            `
            modal.classList.add('seatMapModal')
            parentElement.appendChild(modal)
            updatePremiumSeats()
            updateAvailableSeats()
        } 
        if(selectedTime === null){
            createAlert('.selectTimeContainer','Select movie time','fingerLeft')
        }
        if(peopleNumber === undefined){
            createAlert('.seatContainer', 'Select people','fingerUp')
        }
    })
    function createAlert(targetClass, targetMessage,className){
        const targetBox = document.querySelector(targetClass)
        const alertElement = document.createElement('div')
        alertElement.innerHTML = `
                <img src="../img/finger.svg">
                <span>${targetMessage}</span>
        `
        alertElement.classList.add('alertBox',className)
        targetBox.appendChild(alertElement)
        setTimeout(()=>{
            targetBox.removeChild(alertElement)
        },3000)
    }
    
}
function updatePremiumSeats(){
    const seats = document.querySelectorAll('.seat')
    seats.forEach((seat)=>{
        const seatData = seat.dataset.seat
        const textData = `${seatData}`
        if(textData.includes('C')||textData.includes('D')||textData.includes('E')||textData.includes('F')||textData.includes('G')){
            const dataNumber = textData.slice(1,3)
            if(dataNumber > 8 && dataNumber < 14){
                seat.classList.add('premiumSeat')
            }
        }
    })
}

function updateAvailableSeats(){
    const leftTickets = document.querySelectorAll('.timeBtnBox .seat')
    const seats = document.querySelectorAll('.seatMapContainer .seat')
    leftTickets.forEach((ticket)=>{
        const timeBtn = ticket.previousElementSibling
        if(timeBtn.classList.contains('activeOption')){
            let occupiedSeat = parseInt(ticket.textContent)
            let availableSeat = seats.length - occupiedSeat

            const randomSeats =[]
            for(let i=0; i<availableSeat; i++){
                generateNumber()
                calculatingSeat(generateNumber())

                randomSeats.forEach((seatNum)=>{
                    seats[seatNum].classList.add('unavailableSeat')
                })
                
                
            }
            function calculatingSeat(seatNum){
                if(randomSeats.indexOf(seatNum)  <0){
                    return randomSeats.push(seatNum)
                }else if(randomSeats.indexOf(seatNum) >=0){
                    generateNumber()
                    calculatingSeat(generateNumber())
                }
            }
            function generateNumber(){
                let randomNumber = Math.floor(Math.random()*seats.length)
                return randomNumber
            }
            
        }
    })
    selectingSeat()
}

function selectingSeat(){
    const seats = document.querySelectorAll('.seatMapModal .seat')
    seats.forEach((seat)=>{
        if(!seat.classList.contains('unavailableSeat')){
            seat.addEventListener('click',()=>{
                seat.classList.toggle('selected')
            })
        }
    })
}


// for test
document.getElementsByClassName('orangeBtn')[0].click()
// document.getElementById('searchSeat').click()









// https://xd.adobe.com/view/c5275501-8693-4b52-9135-69d10bdff06a-9074/