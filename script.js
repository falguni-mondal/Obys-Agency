const counter = document.querySelector('.counter');
let loadingCount = 0;
const navLinkScroller = document.querySelectorAll('.link-scroller');
const navigation = document.querySelectorAll('.navigation-container .nav-option');
const navIcon = document.querySelector('.navicon');
const leftNav= document.querySelector('.left-nav')
const cursor = document.querySelector('#cursor');
const magnetTarget = document.querySelectorAll('.magnet');
const brandVideo = document.querySelector('.video-container');
const playBtn = document.querySelector('.play-pause-btn');
const tl = gsap.timeline();


function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();    
}
locomotive();

function smoothScroll(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('.main'),
        smooth: true
    });
}
smoothScroll();

function loading(){
    gsap.from('.line h1', {
        y: 100,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2
    })
    gsap.from('.line h5', {
        opacity: 0,
        delay: 0.5,
        duration: 2
    })
    
    let loading = setInterval(() => {
        if (loadingCount != 101) {
            counter.textContent = loadingCount++;
        }
        else {
            homeAnime();
            clearInterval(loading);
        }
    }, 24)
}
loading();

function homeAnime() {
    tl.to('#loader', {
        opacity: 0,
        duration: 1.2
    })
    tl.to('#loader', {
        display: 'none'
    })
    tl.from('.container', {
        y: '100vh',
        duration: 1,
        ease: "power4.inOut"
    })
    gsap.from('.title-line',{
        y: 90,
        delay: 2,
        duration: 0.8,
        stagger: 0.12
    })
    gsap.to('.say-scroll #slide1',{
        translateY: '22px',
        duration: 2.5,
        ease: CustomEase.create("custom", "M0,0 C0,0 0.064,0.175 0.097,0.252 0.106,0.273 0.158,0.38 0.167,0.394 0.173,0.405 0.201,0.449 0.23,0.469 0.38,0.566 0.567,0.487 0.732,0.556 0.764,0.57 0.777,0.573 0.785,0.583 0.843,0.648 0.85,0.658 0.861,0.681 1,1 0.914,0.795 0.923,0.816 1.045,1.101 1,1 1,1 "),
        repeat: -1
    })
    gsap.to('.header-right', {
        y: -200,
        scrollTrigger: {
            trigger: '.header-right',
            scroller: 'main',
            start: 'top: 95%',
            end: 'top: 93%',
            scrub: 3
        }
    })
}

function cursorAnimation(){
    document.addEventListener('mousemove', (e)=>{
        gsap.to(cursor,{
            x: e.clientX - 18,
            y: e.clientY - 18,
            duration: 0.0
        })
    })
    magnetTarget.forEach((elem)=>{
        elem.addEventListener('mouseenter', ()=>{
            gsap.to(cursor,{
                width: '4vw',
                height: '4vw',
                duration: 0.2
            })
        })
        elem.addEventListener('mouseleave', ()=>{
            gsap.to(cursor,{
                width: '3vw',
                height: '3vw',
                duration: 0.2
            })
        })
    })
}
cursorAnimation();

function makeMagnetic(){
    Shery.makeMagnet(".magnet",{
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
}
makeMagnetic();

function navIconFunc(){
    let toggle = 0;
    navIcon.addEventListener('click', ()=>{
        let navIconDot = navIcon.querySelectorAll(' svg rect');
        if(toggle === 0){
            navIconDot[1].setAttribute('x', '5');
            navIconDot[3].setAttribute('y', '5');
            navIconDot[5].setAttribute('y', '5');
            navIconDot[7].setAttribute('x', '5');
            gsap.to('.navigation-container',{
                top: 0,
                duration: 0.8,
                ease: 'power1.inOut'
            })
            gsap.from(navigation,{
                translateY: '88px',
                duration: 0.5,
                delay: 0.6,
                stagger: 0.1
            })
            toggle++;
        }
        else{
            navIconDot[1].setAttribute('x', '0');
            navIconDot[3].setAttribute('y', '10');
            navIconDot[5].setAttribute('y', '0');
            navIconDot[7].setAttribute('x', '10');
            gsap.to('.navigation-container',{
                top: '100vh',
                duration: 0.5,
                delay: 0.2,
                ease: 'power1.inOut'
            })
            setTimeout(()=>{
                document.querySelector('.navigation-container').style.top = '-100vh'
            }, 1000);
            toggle--;
        }
    })
}
navIconFunc();

function navigationAnimation(){
    navigation.forEach((elem)=>{
        let splitted = elem.textContent.split('');
        elem.innerHTML='';
        splitted.forEach((val)=>{
            elem.innerHTML+=`<span class="italic-font">${val}</span>`
        })
        elem.addEventListener('mouseenter',()=>{
            elem.classList.add('hovered-nav');
            navItalicConversion();
        })
        elem.addEventListener('mouseleave',()=>{
            navplainConversion();
            elem.classList.remove('hovered-nav');
        })
    })
    function navItalicConversion(){
        gsap.to('.hovered-nav .italic-font', {
            opacity: 0,
            duration: 0.15,
            stagger: 0.05
        })
        gsap.to('.hovered-nav .italic-font', {
            fontFamily: 'italic',
            color: 'transparent',
            webkitTextStroke: '1px #fff',
            opacity: 1,
            delay: 0.15,
            duration: 0.15,
            stagger: 0.05
        })
    }
    function navplainConversion(){
        gsap.to('.hovered-nav .italic-font', {
            opacity: 0,
            duration: 0.2,
            stagger: 0.05
        })
        gsap.to('.hovered-nav .italic-font', {
            fontFamily: 'plain',
            color: '#fff',
            webkitTextStroke: '0px',
            opacity: 1,
            delay: 0.2,
            duration: 0.2,
            stagger: 0.05
        })
    }
}
navigationAnimation();

navLinkScroller.forEach((elem)=>{
    elem.addEventListener('mouseenter',()=>{
        gsap.to(elem, {
            y: -37,
            duration: 0.8
        })
    })
    elem.addEventListener('mouseleave',()=>{
        gsap.to(elem, {
            y: 0,
            duration: 0.8
        })
    })
});

function videoPlay(){
    brandVideo.addEventListener('mouseenter', ()=>{
        gsap.to(cursor, {
            scale: 0,
            duration: 0.3
        })
    })
    brandVideo.addEventListener('mousemove', (e)=>{
        let strtX = (window.innerWidth * 70)/100;
        let strtY = (window.innerHeight * 20)/100
        gsap.to(playBtn,{
            x: e.clientX - strtX,
            y: e.clientY - strtY,
            duration: 0.5
        })
    })
    brandVideo.addEventListener('mouseleave', ()=>{
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3
        })
        gsap.to(playBtn,{
            top: '-15%',
            left: '60%',
            duration: 0.1
        })
    })
}
videoPlay();

function aboutSection(){
    gsap.from('#about-section .title-line',{
        translateY: 90,
        duration: 0.6,
        scrollTrigger:{
            trigger: '#about-section .title-line',
            scroller: '.main',
            start: 'top 75%',
            end: 'top 60%'
        }
    });
    gsap.from('#about-section #underline1',{
        width: 0,
        duration: 1,
        scrollTrigger:{
            trigger: '#about-section .title-line',
            scroller: '.main',
            start: 'top 75%',
            end: 'top 60%'
        }
    });
    gsap.from('#about-section .section-counter span',{
        opacity: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger:{
            trigger: '#about-section .title-line',
            scroller: '.main',
            start: 'top 75%',
            end: 'top 60%'
        }
    });
    gsap.from('#about-section .text',{
        y: 100,
        duration: 1,
        stagger: 0.15,
        scrollTrigger:{
            trigger: '#about-section .text',
            scroller: '.main',
            start: 'top 90%',
            end: 'top 80%'
        }
    });
    gsap.from('#about-section .about-img',{
        opacity: 0,
        duration: 1,
        scrollTrigger:{
            trigger: '#about-section .about-img',
            scroller: '.main',
            start: 'top 70%',
            end: 'top 60%'
            // markers: true
        }
    });
    gsap.from('#about-section #underline2',{
        width: 0,
        duration: 1,
        scrollTrigger:{
            trigger: '#about-section #underline2',
            scroller: '.main',
            start: 'top 75%',
            end: 'top 60%'
        }
    });
}
aboutSection();
