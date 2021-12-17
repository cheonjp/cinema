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
            poster.style.backgroundImage=`url(./img/hero_${classNum++}.jpg)`
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
    const {title,image,text,trailer,description,length,icon,actor,poster}=targetMovie
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
                    <div class="movieImg" style="background-image:url(${poster})"></div>
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
                                        <div>Regular seats</div>
                                    </div>
                                    <div class="priceBox">
                                        <div>Price: $ <span class="price">15</span></div>
                                    </div>
                                    <div class="selectWrapper">
                                        <select id="people" name="peopleNumber">
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
                                </div>
                                <div class="seatColumn">
                                    <div class="seatGradeBox">
                                        <div class="gradeBox yellow"></div>
                                        <div>Premium seats</div>
                                    </div>
                                    <div class="priceBox">
                                        <div>Price: $ <span class="price">25</span></div>
                                    </div>
                                    <button id="searchSeat" class="yellowBorderBtn">
                                        <span class="material-icons i-seat">
                                            airline_seat_recline_normal
                                            </span>
                                            Find available seats
                                    </button>
                                </div>
                                <div class="seatColumn lastPriceBox">
                                    <div class="seatGradeBox">
                                        <div class="gradeBox red"></div>
                                        <div>Unavailable seats</div>
                                    </div>
                                    <div class="priceBox">
                                        <div>Price: $ <span class="price">0</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="checkOutContainer">
                    <div class="formContainer">
                        <div class="inputWrapper">
                            <input id="name" class="textInput" type="text">
                            <span class="placeholder">Full Name</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="cardBox">
                            <p>Accepted Cards</p>
                            <div class="cardContainer">
                                <div class="card visa"></div>
                                <div class="card master"></div>
                                <div class="card express"></div>
                            </div>
                        </div>
                        <div class="inputWrapper">
                            <input id="email" class="textInput" type="text">
                            <span class="placeholder">Email</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="inputWrapper">
                            <input id="name_on_card" class="textInput"t type="text">
                            <span class="placeholder">Name on card</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="inputWrapper">
                            <input id="address" class="textInput" type="text">
                            <span class="placeholder">Address</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="inputWrapper">
                            <input id="phoneNumber" class="textInput" type="text" maxlength="14">
                            <span class="placeholder">Phone number</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="inputWrapper">
                            <input id="city" class="textInput" type="text">
                            <span class="placeholder">City</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="inputWrapper">
                            <input id="cardNumber" class="textInput" type="text" maxlength ="19">
                            <span class="placeholder">Credit card number</span>
                            <span class="topLine"></span>
                            <span class="rightLine"></span>
                            <span class="bottomLine"></span>
                            <span class="leftLine"></span>
                        </div>
                        <div class="multiInputWrapper">
                            <div class="splitContainer">
                                <div class="selectWrapper province">
                                    <p>Province</p>
                                    <select id="province" name="province">
                                        <option value="Alberta">Alberta</option>
                                        <option value="British Columbia">British Columbia</option>
                                        <option value="Manitoba">Manitoba</option>
                                        <option value="New Brunswick">New Brunswick</option>
                                        <option value="Newfoundland">Newfoundland</option>
                                        <option value="Northwest Territories">Northwest Territories</option>
                                        <option value="Nova Scotia">Nova Scotia</option>
                                        <option value="Nunavut">Nunavut</option>
                                        <option value="Ontario">Ontario</option>
                                        <option value="Prince Edward Island">Prince Edward Island</option>
                                        <option value="Quebec">Quebec</option>
                                        <option value="Saskatchewan">Saskatchewan</option>
                                        <option value="Yukon">Yukon</option>
                                    </select>
                                </div>
                                <div class="inputWrapper zipCode">
                                    <input id="zipCode" class="textInput" type="text" maxlength ="7">
                                    <span class="placeholder">Post code</span>
                                    <span class="topLine"></span>
                                    <span class="rightLine"></span>
                                    <span class="bottomLine"></span>
                                    <span class="leftLine"></span>
                                </div>
                            </div>
                            <div class="splitContainer">
                                <div class="selectWrapper">
                                    <p>Exp year</p>
                                    <select id="expDate" name="expiredDate">
                                    </select>
                                </div>
                                <div class="inputWrapper cvv">
                                    <input id="cvv" class="textInput" type="text" maxlength="4">
                                    <span class="placeholder">CVV</span>
                                    <span class="topLine"></span>
                                    <span class="rightLine"></span>
                                    <span class="bottomLine"></span>
                                    <span class="leftLine"></span>
                                </div>
                            </div>
                        </div>
                        <div class="btnBox">
                            <button class="yellowBorderBtn submitBtn">Submit</button>
                        </div>
                    </div>
                    <div class="confirmContainer">
                        <div class="coveredLayer">
                            Please fill the form out and submit it
                            <div class="loader">
                              <svg class="circular-loader"viewBox="25 25 50 50" >
                                <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#f96400" stroke-width="2" />
                              </svg>
                            </div>
                            </div>

                        <div class="subTitle">
                            <span class="material-icons i-receipt">
                                receipt_long
                            </span>
                            <span>Confirmation</span>
                        </div>
                        <p>* Please check the movie reservation carefully before checking out.</p>

                        <div class="confirmBox">
                            <div class="confirmContentBox">
                                <span>Movie Title : </span><span class="confirmText confirmTitle">Spider Man</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Date : </span><span class="confirmText confirmDate">10. 16. 2021</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Movie Time : </span><span class="confirmText confirmTime">13 : 30</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Seat : </span><span class="confirmText confirmSeat">A-13, A-10</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Name : </span><span class="confirmText confirmName">Jeongpil</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Email : </span><span class="confirmText confirmEmail">cjp@gmail.com</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Address : </span><span class="confirmText confirmAddress">Abc Ave 12</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>City : </span><span class="confirmText confirmCity">Kelowna</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Province : </span><span class="confirmText confirmProvince">Britich Columbia</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Post code : </span><span class="confirmText confirmZipCode">V1Y 2R3</span>
                            </div>
                            <div class="confirmContentBox">
                                <span>Payment : </span><span class="confirmText confirmPayment">Credit card</span>
                            </div>
                        </div>
                        <div class="totalMoney">Sub total <span class="ticketMoney"></span>$ + PST <span class="pst">10%</span> + GST <span class="gst">5%</span><br> Total invoice : $ <span class="totalInvoice"></span></div>
                    </div>
                </div>
                <div class="processingButtonBox">
                    <a href="#" class="orangeBtn ticketBtn" data-ticket ="${title}"><span class="material-icons">
                        credit_card
                    </span>Buy tickets</a>

                    <a href="#" class="grayBtn" data-trailer ="${title}"><span class="material-icons">
                        videocam
                    </span> Play trailer</a>
                    <button class="backBtn whiteBorderBtn">Back</button>
                    <button class="nextBtn yellowBorderBtn" disabled >Next</button>
                    <button class="checkOutBtn yellowBorderBtn" disabled >Check out</button>
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
    ticketing('movie')
    processingBooking()
    selectOption()
    selectPeople()
    inputTransition()
    checkFormValidation()
    displayExp()
    deleteValue()
}

function displayExp(){
    const input = document.querySelector('#expDate')
    let year = new Date().getFullYear()
    let index = 0
    
    for(let i=0;i<10; i++){
        const option = document.createElement('option')
        const finalYear = year+index
        option.innerHTML = `${finalYear}`
        option.value=finalYear
        input.appendChild(option)
        index++
    }
}

let activeRemoveAlert
function checkFormValidation(){
    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const nameOnCard = document.querySelector('#name_on_card')
    const address = document.querySelector('#address')
    const phoneNumber = document.querySelector('#phoneNumber')
    const city = document.querySelector('#city')
    const cardNumber = document.querySelector('#cardNumber')
    const zipCode = document.querySelector('#zipCode')
    const cvv = document.querySelector('#cvv')
    const textInputs = document.querySelectorAll('.textInput')
    const submitBtn = document.querySelector('.submitBtn')

    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const zipCodeRegex = /^[a-z]{1}[0-9]{1}[a-z]{1}\s?[0-9]{1}[a-z]{1}[0-9]{1}$/i
    const cvvRegex = /^[0-9]{3,4}$/
    
    let phoneValidation
    let cardValidation
    
    
    submitBtn.addEventListener('click',()=>{
        const inputAlerts = document.querySelectorAll('.inputAlert')
        if(inputAlerts.length === 0){
            
            let activeGather = true
            textInputs.forEach(input=>{
                const inputWrapper = input.parentElement
                const alertBox = document.createElement('div')

                const emailValidation = emailRegex.test(email.value)
                const zipValidation = zipCodeRegex.test(zipCode.value)
                const cvvValidation = cvvRegex.test(cvv.value)
    
                if(input.value ===''){
                    alertBox.innerHTML = `
                    <span>Empty</span>
                    `
                    alertBox.classList.add('inputAlert')
                    inputWrapper.appendChild(alertBox)
                    input.classList.add('redLine')
                    activeGather=false
                }
                if(email.value !=="" && emailValidation === false && input.getAttribute("id") === 'email'){
                    alertBox.innerHTML = `
                    <span>Wrong Format</span>
                    `
                    alertBox.classList.add('inputAlert')
                    inputWrapper.appendChild(alertBox)
                    input.classList.add('redLine')
                    activeGather=false
                }
                if(phoneNumber.value !=="" && phoneValidation() === false && input.getAttribute("id")==="phoneNumber"){
                    alertBox.innerHTML = `
                    <span>Wrong Format</span>
                    `
                    alertBox.classList.add('inputAlert')
                    inputWrapper.appendChild(alertBox)
                    input.classList.add('redLine')
                    activeGather=false
                }
                if(cardNumber.value !=="" && cardValidation() === false && input.getAttribute("id")==="cardNumber"){
                    alertBox.innerHTML = `
                    <span>Wrong Format</span>
                    `
                    alertBox.classList.add('inputAlert')
                    inputWrapper.appendChild(alertBox)
                    input.classList.add('redLine')
                    activeGather=false
                }
                if(zipCode.value !=="" && zipValidation === false && input.getAttribute("id") === "zipCode"){
                    alertBox.innerHTML = `
                    <span>Wrong Format</span>
                    `
                    alertBox.classList.add('inputAlert')
                    inputWrapper.appendChild(alertBox)
                    input.classList.add('redLine')
                    activeGather=false
                }
                if(cvv.value !=="" && cvvValidation === false && input.getAttribute("id")==="cvv"){
                    alertBox.innerHTML = `
                    <span>Wrong Format</span>
                    `
                    alertBox.classList.add('inputAlert')
                    inputWrapper.appendChild(alertBox)
                    input.classList.add('redLine')
                    activeGather=false
                }
            })
            
            confirmInfo(activeGather)
        }
        
        removeAlert()
       
    })

    phoneNumber.onkeyup=(e)=>{
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if(phoneRegex.test(phoneNumber.value)){
            let finalNumber = phoneNumber.value.replace(phoneRegex, "($1) $2-$3")
            phoneNumber.value = finalNumber
            phoneValidation = () =>{
                return true
            }
        }else{
            phoneValidation = ()=>{
                return false
            }
        }
    }

    cardNumber.onkeyup=(e)=>{
        const numberRegex =/^([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{4})$/
        if(numberRegex.test(e.target.value)){
            let finalNumber = e.target.value.replace(numberRegex, "$1-$2-$3-$4")
            e.target.value = finalNumber
            cardValidation = ()=>{
                return true
            }
        }else{
            cardValidation = ()=>{
                return false
            }
        }
    }
    
}

function confirmInfo(action){
    if(action === true){
        const name = document.querySelector('#name').value
        const email = document.querySelector('#email').value
        const nameOnCard = document.querySelector('#name_on_card').value
        const address = document.querySelector('#address').value
        const phoneNumber = document.querySelector('#phoneNumber').value
        const city = document.querySelector('#city').value
        const cardNumber = document.querySelector('#cardNumber').value
        const zipCode = document.querySelector('#zipCode').value
        const cvv = document.querySelector('#cvv').value
        const province = document.querySelector('#province').value
        const expYear = document.querySelector('#expDate').value

        const coveredLayer = document.querySelector('.coveredLayer')
        const loader = document.querySelector('.loader')

        const confirmTitle = document.querySelector('.confirmTitle')
        const confirmDate = document.querySelector('.confirmDate')
        const confirmTime = document.querySelector('.confirmTime')
        const confirmEmail = document.querySelector('.confirmEmail')
        const confirmAddress = document.querySelector('.confirmAddress')
        const confirmCity = document.querySelector('.confirmCity')
        const confirmProvince = document.querySelector('.confirmProvince')
        const confirmZipCode = document.querySelector('.confirmZipCode')
        const confirmPayment = document.querySelector('.confirmPayment')
        const confirmSeat = document.querySelector('.confirmSeat')
        const confirmInvoice = document.querySelector('.totalInvoice')
        const confirmMoney = document.querySelector('.ticketMoney')
        const totalMoney = ((gatheredInfo.price)*(15/100)) + gatheredInfo.price

        loader.classList.add('activeLoader')
        setTimeout(()=>{
            loader.classList.remove('activeLoader')
            coveredLayer.style.display='none'
        },2000)
        document.querySelector('.checkOutBtn').disabled = false

        gatheredInfo.name = name
        gatheredInfo.email = email
        gatheredInfo.nameOnCard = nameOnCard
        gatheredInfo.address = address
        gatheredInfo.phoneNumber = phoneNumber
        gatheredInfo.city = city
        gatheredInfo.cardNumber = cardNumber
        gatheredInfo.zipCode = zipCode
        gatheredInfo.cvv = cvv
        gatheredInfo.province = province
        gatheredInfo.expYear = expYear

        
        confirmTitle.textContent = gatheredInfo.title
        confirmDate.textContent = gatheredInfo.date
        confirmTime.textContent = gatheredInfo.time
        confirmEmail.textContent = gatheredInfo.email
        confirmAddress.textContent = gatheredInfo.address
        confirmCity.textContent = gatheredInfo.city
        confirmProvince.textContent = gatheredInfo.province
        confirmZipCode.textContent = gatheredInfo.zipCode
        confirmSeat.textContent = gatheredInfo.seat
        confirmMoney.textContent = gatheredInfo.price
        confirmInvoice.textContent = totalMoney.toFixed(2)



        const texts = document.querySelectorAll('.confirmText')
        texts.forEach(text=>{
            const category = text.previousElementSibling
            const categoryWidth = category.offsetWidth
            text.style.width = `calc(100% - ${categoryWidth+5}px)`
        })
        
    }
    
}

function deleteValue(){
    inputs = document.querySelectorAll('.textInput')
    inputs.forEach((input)=>{
        input.addEventListener('keyup',()=>{
            const parent = input.parentElement
            const closeBtn = document.createElement('span')
            const target = parent.querySelector('.removeBtn')
            if(input.value !=="" && target === null){
                closeBtn.innerHTML =`
                <span class="material-icons">
                    cancel
                </span>`
                closeBtn.classList.add('removeBtn')
                parent.appendChild(closeBtn)
                closeBtn.addEventListener('click',()=>{
                    input.value=""
                    const removeBtn = parent.querySelector('.removeBtn')
                    parent.removeChild(removeBtn)
                    const placeHolder = parent.querySelector('.placeholder')
                    placeHolder.classList.remove('activeInput')
                })
            }
            if(input.value ===""){
                const removeBtn = parent.querySelector('.removeBtn')
                parent.removeChild(removeBtn)
            }
        })
    })
}

function removeAlert(){
   const alertBoxes = document.querySelectorAll('.inputAlert')
   alertBoxes.forEach((box) =>{
       const input = box.parentElement.querySelector('.textInput')
       const wrapper = box.parentElement
  
       input.addEventListener('focusin',()=>{
           if(input.classList.contains('redLine')){
               const target = wrapper.querySelector('.inputAlert')
               input.classList.remove('redLine')
               wrapper.removeChild(target)
            }
    })
   })
    
}

function inputTransition(){
    const inputs = document.querySelectorAll('.textInput')
    inputs.forEach((input)=>{
        input.addEventListener('focusin',()=>{
            input.nextElementSibling.classList.add('activeInput')
        })
        input.addEventListener('focusout',()=>{
            if(input.value === ''){
                input.nextElementSibling.classList.remove('activeInput')
            }
        })
    })
}

let peopleNumber
function selectPeople(){
    peopleNumber = undefined
    peopleDropBox = document.querySelector('#people')
    peopleOptions = document.querySelectorAll('#people .optionPeople')
    peopleDropBox.addEventListener('change',()=>{
        document.querySelector('.modalContainer .nextBtn').disabled = true
        return peopleNumber = peopleDropBox.value
    })
}





const changeBtn = (processStatus)=>{
    const backBtn = document.querySelector('.modalContainer .backBtn')
    const nextBtn = document.querySelector('.modalContainer .nextBtn')
    const ticketBtn = document.querySelector('.modalContainer .ticketBtn')
    const trailerBtn = document.querySelector('.modalContainer .grayBtn')
    const checkOutBtn = document.querySelector('.modalContainer .checkOutBtn')
    if(processStatus ==='movie'){
        backBtn.classList.add('displayNone')
        nextBtn.classList.add('displayNone')
        ticketBtn.classList.remove('displayNone')
        trailerBtn.classList.remove('displayNone')
        checkOutBtn.classList.add('displayNone')
    }else if(processStatus === 'select_time_seat'){
        ticketBtn.classList.add('displayNone')
        trailerBtn.classList.add('displayNone')
        checkOutBtn.classList.add('displayNone')
        backBtn.classList.remove('displayNone')
        nextBtn.classList.remove('displayNone')
    }else if(processStatus === 'check_out'){
        checkOutBtn.classList.remove('displayNone')
        nextBtn.classList.add('displayNone')
        functionalBtn(checkOutBtn)
    }
}

function functionalBtn(element){
    element.addEventListener('click',()=>{
        const target = document.querySelector('.subModal')
        if(target === null){
            const subModal = document.createElement('div')
            subModal.innerHTML =`
                <div class="succeedAlert">
                    <p>successfully booked. Please check your email.</p>
                    <div>
                        <button class="orangeBorderBtn closeModalBtn">Confirm</button>
                    </div>
                </div>
            `
            subModal.classList.add('subModal')
            const parent = document.querySelector('.modalContainer')
            parent.appendChild(subModal)
            setTimeout(()=>{
                subModal.classList.add('activeModal')

            },20)
        }
    })
}

const ticketing=(status)=>{
    let takingProcessBack =false
    let processStatus = status
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
        takingProcessBack = true
        if(processStatus ==='select_time_seat'){
            processStatus = 'movie'
            activeNavi(processStatus,takingProcessBack)
        }else if(processStatus ==='check_out'){
            processStatus = 'select_time_seat'
            activeNavi(processStatus,takingProcessBack)
            document.querySelector('.checkOutBtn').disabled = true
            document.querySelector('.coveredLayer').style.display = 'flex'
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
    if(status ==='select_time_seat' && backup === true){
        console.log('test')
        statusDots.forEach((dot)=>{
            dot.classList.remove('status')
        })
        for(let i=0;i<5; i++){
            setTimeout(()=>{
                statusDots[i].classList.add('status')
            },timing)
            timing+=50
        }
    }
    if(status ==='check_out' && backup === false){
        statusDots.forEach((dot)=>{
            setTimeout(()=>{
                dot.classList.add('status')
            },timing)
            timing+=50
        })
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
        if(status==='check_out'){
            if(dot.classList.contains('checkout')){
                dot.classList.add('blink')
            }
        }
    })
}

function changeInfo(status, backup){
    const movieInfo = document.querySelector('.movieInfoBox')
    const bookingBox = document.querySelector('.bookingBox')
    const checkOutSection = document.querySelector('.checkOutContainer')
    const infoContainer = document.querySelector('.infoContainer')
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
    if(status === 'select_time_seat' && backup === true){
        checkOutSection.classList.remove('activeShow')
        setTimeout(()=>{
            checkOutSection.classList.remove('showCheckOut')
        },300)
        setTimeout(()=>{
            infoContainer.classList.remove('displayNone')
        },300)
        setTimeout(()=>{
            infoContainer.classList.remove('activeProcess')
        },320)
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
    let index = -1
    const bookingMonth = document.querySelector('.currentMonth')
    const bookingDate = document.querySelectorAll('.date')
    const bookingDay = document.querySelectorAll('.day')

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const months =[1,2,3,4,5,6,7,8,9,10,11,12]
    bookingMonth.innerText = months[currentMonth] + '. ' + currentYear 
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
            
            if(currentHour < 10){
                return '0' + currentHour.toString() + currentMin.toString()
            }else{
                return (currentHour.toString() + currentMin.toString())
            }
        }
        const btnText = btn.innerText
        const onlyMovieTime = btnText.replace(':','')
        const movieTime = onlyMovieTime.replace(/ /g,'')
        const today = document.getElementsByClassName('date')[0]
        if(movieTime < currentTime() && today.classList.contains('select')){
            btn.classList.add('unavailableTime')
        }else if(movieTime >= currentTime() || !today.classList.contains('select')){
            btn.classList.remove('unavailableTime')
        }

        const seats = document.querySelectorAll('.timeBoxContainer .seat')
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
            document.querySelector('.modalContainer .nextBtn').disabled =true
            if(!e.target.classList.contains('unavailableTime')){
                movieTimeBtn.forEach((btn)=>{
                    btn.classList.remove('activeOption')
                })
                if(!e.target.classList.contains('soldOut')){
                    e.target.classList.add('activeOption')
                    const availablePeople =parseInt(e.target.nextElementSibling.textContent)
                    const options = document.querySelectorAll('.optionPeople')
                    options.forEach((option)=>{
                        if(availablePeople <= 10 && option.value > availablePeople){
                            option.disabled = true
                        }else{
                            option.disabled = false
                        }
                        if(peopleNumber > availablePeople){
                            if(Number(option.value) === availablePeople){
                                option.selected = true
                                createAlert('.seatContainer', `You can select up to ${availablePeople} People`,'fingerUp')
                                peopleNumber = availablePeople
                            }
                        }
                    })
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
            document.querySelector('.processingButtonBox .nextBtn').disabled = true
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
                    <span class="material-icons i-close">
                        close
                    </span>
                    <div class="screen">
                        Screen
                    </div>
                    ${totalLine}
                    <hr>
                    <div class="displayContainer">
                        <div class="displayNumber">10</div>
                        <div class="displayBtnContainer">
                            <button class="grayBtn deleteAllBtn">
                                <span class="material-icons">
                                    delete_outline
                                </span>
                                Clear All
                            </button>
                            <button class="yellowBtn seatSelectBtn" disabled>
                                <span class="material-icons">
                                    done
                                    </span>
                                Select
                            </button>
                        </div>
                    </div>
                    <div class="seatGradeBox">
                        <div class="gradeBox"></div>
                        <div class="seatText">Regular seats</div>
                        <div class="gradeBox yellow"></div>
                        <div class="seatText">Premium seats</div>
                        <div class="gradeBox red"></div>
                        <div class="seatText">Unavailable seats</div>
                    </div>
                </div>
            `
            modal.classList.add('seatMapModal')
            modal.style.display='flex'
            parentElement.appendChild(modal)
            setTimeout(()=>{
                modal.classList.add('activeModal')
            },20)
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
    
}

function timingSlide(target){
    let timing = 0
    const targets = document.querySelectorAll(target)
    targets.forEach((target)=>{
        setTimeout(()=>{
            target.classList.add('slideDown')
        },(timing+=100))
    })
}
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
    displaySeatNumber(peopleNumber)
}

function displaySeatNumber(displayNumber){
    const seatDisplay = document.querySelector('.displayNumber')
    seatDisplay.textContent = displayNumber
}

function selectingSeat(){
    const seats = document.querySelectorAll('.seatMapModal .seat')
    seats.forEach((seat)=>{
        if(!seat.classList.contains('unavailableSeat')){
            seat.addEventListener('click',()=>{
                const selectedSeats = document.querySelectorAll('.selected')
                seat.classList.toggle('selected')
                displaySeatBtn(seat)
                if(selectedSeats.length+1 > peopleNumber){
                    seat.classList.remove('selected')
                }
            })
        }
    })
}

function displaySeatBtn(target){
    const displayContainer = document.querySelector('.displayContainer')
    const divBtn = document.createElement('div')
    setTimeout(()=>{

        const seatData = target.dataset.seat
        if(target.classList.contains('selected')){
            divBtn.innerHTML =`
            <span class="seatData">${seatData}</span>
            <span class="material-icons i-delete">
                highlight_off
            </span>
            `
            divBtn.classList.add('seatInfo')
            if(target.classList.contains('premiumSeat')){
                divBtn.classList.add('yellowBtn')
            }
            setTimeout(()=>{
                divBtn.classList.add('showSeatInfo')
            },20)
            displayContainer.appendChild(divBtn)
            deleteBtn(displayContainer)
        }else{
            const seatInfoBtns = document.querySelectorAll('.seatInfo')
            seatInfoBtns.forEach((btn)=>{
                if(btn.children[0].textContent === seatData){
                    btn.classList.remove('showSeatInfo')
                    setTimeout(()=>{
                        displayContainer.removeChild(btn)
                    },300)

                }
            })
        }
    },20)
    displayCount(displayContainer)
    
}

function deleteBtn(parentElement){
    const deleteBtns = document.querySelectorAll('.displayContainer .i-delete')
    const clearAllBtn = document.querySelector('.deleteAllBtn')
    const displayBtns = document.querySelectorAll('.displayContainer .seatInfo')
    deleteBtns.forEach((btn)=>{
        btn.addEventListener('click',()=>{
            const displaySeatCode = btn.previousElementSibling.textContent
            const wholeBtn = btn.parentElement
            const seatBtns = document.querySelectorAll('.seatMapContainer .seat')
            seatBtns.forEach((seatBtn)=>{
                const seatBtnsCode = seatBtn.dataset.seat
                if(seatBtnsCode === displaySeatCode){
                    seatBtn.classList.remove('selected')
                }
            })
            wholeBtn.classList.remove('showSeatInfo')
            setTimeout(()=>{
                parentElement.removeChild(wholeBtn)
            },180)
            displayCount(parentElement)
        })
        clearAllBtn.addEventListener('click',()=>{
            const seats = document.querySelectorAll('.seatMapContainer .seat')
            seats.forEach((seat)=>{
                if(seat.classList.contains('selected')){
                    seat.click()
                }
            })
        })
    })
}


function displayCount(){
    const buttonsNumber = []
    const targetText =  document.querySelector('.displayNumber')
    let count =peopleNumber
    const buttons = document.querySelectorAll('.seatMapContainer .seat')
    let btnCounter
    
    buttons.forEach((btn)=>{
        if(btn.classList.contains('selected')){
            buttonsNumber.push(btn)
            btnCounter = buttonsNumber.length
        }
        targetText.textContent = count - btnCounter
        if(targetText.textContent === '-1'){
            targetText.textContent = 0
        }else if(targetText.textContent === 'NaN'){
            targetText.textContent = count
        }
    })
    let counter = targetText.textContent
    changeBtnStatus(counter)
}

function changeBtnStatus(number){
    const selectBtn = document.querySelector('.displayBtnContainer .seatSelectBtn')
    if(number !=='0'){
        selectBtn.disabled = true
    }else if(number === '0'){
        activeClickBtn(selectBtn)
    }
}

function activeClickBtn(target){
    let activeNextBtn = false
    target.disabled = false
    target.addEventListener('click',()=>{
        document.querySelector('.seatMapModal').click()
        activeNextBtn = true
        clickNext(activeNextBtn)
    })
    clickNext(activeNextBtn)
}


function clickNext(action){
    const nextBtn = document.querySelector('.modalContainer .nextBtn')
    const optionSection = document.querySelector('.infoContainer')
    const checkoutSection = document.querySelector('.checkOutContainer')
    if(action === true){
        nextBtn.disabled = false
        nextBtn.addEventListener('click',()=>{
            optionSection.classList.add('activeProcess')
            activeNavi('check_out',false)
            ticketing('check_out')
            
            setTimeout(()=>{
                optionSection.classList.add('displayNone')
                checkoutSection.classList.add('showCheckout')
            },300)
            setTimeout(()=>{
                checkoutSection.classList.add('activeShow')
            },320)
        })
        collectInfo()
        
    }else{
        nextBtn.disabled = true

    }
}

let gatheredInfo
function collectInfo(){
    let bookingInfo
    const movieMonth = document.querySelector('.bookingDateContainer .currentMonth').textContent
    const movieDate = document.querySelector('.dayBox .date.select').textContent
    const movieDay = document.querySelector('.dateBox .day.select').textContent
    const selectedSeats = document.querySelectorAll('.seat.selected')
    
    const movieTitle = document.querySelector('.modal .contentBox .movieTitle').textContent
    const movieTime = document.querySelector('.timeBtn.activeOption').textContent
    const movieFullDate = `${movieDate}. ${movieMonth}`
    const seatNum = []
    const seatPrice =[]
    let totalPrice
    selectedSeats.forEach(seat=>{
        const seatCode = seat.dataset.seat
        seatNum.push(seatCode)
        if(seat.classList.contains('selected')){
            if(seat.classList.contains('premiumSeat')){
                const premiumPrice = 25
                seatPrice.push(premiumPrice)
            }else{
                const normalPrice = 15
                seatPrice.push(normalPrice)
            }
                totalPrice = seatPrice.reduce((total,price)=>total+price)
                document.querySelector('.lastPriceBox .priceBox .price').textContent = ` ${totalPrice}`
        }
    })
    
    function GatheringMovieInfo(title,date,time,seat,price){
        this.title = title
        this.date = date
        this.time=time
        this.seat = seat
        this.price = price
    }
    gatheredInfo = new GatheringMovieInfo(movieTitle,movieFullDate,movieTime,seatNum,totalPrice)
}

// for test
// document.getElementsByClassName('orangeBtn')[0].click()








// https://xd.adobe.com/view/c5275501-8693-4b52-9135-69d10bdff06a-9074/