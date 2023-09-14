// save innerwidth , changes on animation (chrome, IE)
var savedInnerWidth = window.innerWidth;

// scrolling disabled
function disableScroll() {
    scrollTop = 0;
    scrollLeft = 0;
    window.scrollTo(scrollLeft, scrollTop);
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () {};
}

// portal code
var portalOptions = document.querySelectorAll(".blurtext");
for (let portal of portalOptions) {
    portal.addEventListener("click", function (evt) {
        // fade out portal page
        var portal = document.querySelector(".portal");
        var opac = 1;
        clearInterval(id);
        id = setInterval(portalFade, 1);
        function portalFade() {
            if (opac < 0.1) {
                portal.classList.add("hidden");
                clearInterval(id);
            } else {
                portal.style.opacity = opac;
                opac -= 0.03;
            }
        }

        // enable scrolling
        enableScroll();

        let target = evt.target;

        if (target.localName == "p") {
            target = evt.target.parentElement;
        }

        if (target.id == "portalconstructionmode") {
            render("constructionmode", true);
        } else {
            render("solarmode", true);
            // change logo
            document.getElementById("logo").src = "assets/solarlogotrans.png";
            // update chooser
            let solarsidechooser = document.getElementById("solarmode");
            let constrsidechooser = document.getElementById("constructionmode");
            solarsidechooser.classList.add("chooser-dark");
            solarsidechooser.classList.remove("chooser-trans");
            constrsidechooser.classList.add("chooser-trans");
            constrsidechooser.classList.remove("chooser-dark");
        }
    });
}

// chooser
var id = null;

var logos = document.querySelectorAll(".chooser-item");
for (let logo of logos) {
    logo.addEventListener("click", function (evt) {
        let t = evt.target;
        if (evt.target.localName == "img") {
            t = evt.target.parentElement;
        }

        if (t.id == "constructionmode") {
            document.getElementById("logo").src =
                "assets/constructionlogotrans.png";

            t.classList.remove("chooser-trans");
            t.classList.add("chooser-dark");
            document
                .getElementById("solarmode")
                .classList.remove("chooser-dark");
            document.getElementById("solarmode").classList.add("chooser-trans");

            render("constructionmode", false);
        } else {
            document.getElementById("logo").src = "assets/solarlogotrans.png";

            t.classList.remove("chooser-trans");
            t.classList.add("chooser-dark");
            document
                .getElementById("constructionmode")
                .classList.remove("chooser-dark");
            document
                .getElementById("constructionmode")
                .classList.add("chooser-trans");

            render("solarmode", false);
        }
    });
}

function render(mode, isfirst) {
    var tagline = document.getElementById("tagline");
    var herobtn1 = document.getElementById("herobtn1");
    var herobtn2 = document.getElementById("herobtn2");
    var calcnavitem = document.getElementById("calcnavitem");
    var whynavitem = document.getElementById("whynavitem");
    var nav = document.querySelector(".nav");

    var faqpage = document.getElementById("faq");
    var testimonialpage = document.getElementById("testimonial");

    var calcpage = document.getElementById("calc");

    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var phoneField = document.getElementById("phone");
    var messageField = document.getElementById("message");
    var submitBtn = document.getElementById("sendbtn");
    var infoSplash = document.querySelector(".info-splash");
    var contactInfoImg = document.querySelector(".contact-info");

    var footerImg = document.getElementById("footerimage");

    if (mode == "constructionmode") {
        animateHero(mode, isfirst);

        tagline.innerHTML =
            "Rightway Construction is a Western Cape based company specialising in buliding and renovating<br/>your dream into reality through quality workmanship and professional project management";
        herobtn1.innerHTML = "<p>Now with solar</p>";
        herobtn1.attributes["onclick"].value =
            "document.querySelector('#solarmode').click()";
        // herobtn1.style.backgroundColor = "rgba(0, 52, 84, 0.45)";
        herobtn1.style.backgroundColor = "rgba(0, 52, 84, 0.8)";
        herobtn1.style.borderColor = "rgb(0,52,84)";
        herobtn2.style.backgroundColor = "rgb(0,52,84)";
        herobtn2.style.borderColor = "rgb(0, 52, 84)";
        calcnavitem.innerHTML = "Testimonials";
        calcnavitem.href = "#dreams";
        whynavitem.innerHTML = "Why Rightway";
        whynavitem.href = "#testimonial";

        faqpage.classList.add("hidden");
        testimonialpage.classList.remove("hidden");

        calcpage.classList.add("hidden");

        nameField.style.borderColor = "rgb(0, 52, 84)";
        nameField.style.backgroundImage = "url(assets/userDark.png)";
        emailField.style.borderColor = "rgb(0,52,84)";
        emailField.style.backgroundImage = "url(assets/emailDark.png)";
        phoneField.style.borderColor = "rgb(0,52,84)";
        phoneField.style.backgroundImage = "url(assets/callDark.png)";
        messageField.style.borderColor = "rgb(0,52,84)";
        submitBtn.style.backgroundColor = "rgb(0,52,84)";
        infoSplash.style.backgroundColor = "rgb(0,52,84)";
        contactInfoImg.style.backgroundImage =
            "url(assets/contactpageconstruction.jpg)";
        contactInfoImg.style.backgroundPosition = "right top";

        footerImg.src = "assets/constructionlogoblue.png";
    } else {
        animateHero(mode, isfirst);

        tagline.innerHTML =
            "Rightway Solar is a leading solar energy company that specialises in providing renewable<br/>energy solutions to residential, commercial, and industrial clients";
        herobtn1.innerHTML = "<p>Calculate Savings</p>";
        herobtn1.attributes["onclick"].value = "location.href='#calc'";
        herobtn1.style.backgroundColor = "rgba(40, 100, 255, 0.45)";
        herobtn1.style.borderColor = "rgb(40, 100, 255)";
        herobtn2.style.backgroundColor = "rgb(40, 100, 255)";
        herobtn2.style.borderColor = "rgb(40, 100, 255)";
        calcnavitem.innerHTML = "Solar Calulator";
        calcnavitem.href = "#calc";
        whynavitem.innerHTML = "Why Solar";
        whynavitem.href = "#faq";

        faqpage.classList.remove("hidden");
        testimonialpage.classList.add("hidden");

        calcpage.classList.remove("hidden");

        nameField.style.borderColor = "rgb(40, 100, 255)";
        nameField.style.backgroundImage = "url(assets/userBlue.png)";
        emailField.style.borderColor = "rgb(40,100,255)";
        emailField.style.backgroundImage = "url(assets/emailBlue.png)";
        phoneField.style.borderColor = "rgb(40,100,255)";
        phoneField.style.backgroundImage = "url(assets/callBlue.png)";
        messageField.style.borderColor = "rgb(40,100,255)";
        submitBtn.style.backgroundColor = "rgb(40, 100, 255)";
        infoSplash.style.backgroundColor = "rgb(40, 100, 255)";
        contactInfoImg.style.backgroundImage =
            "url(assets/contactpagesolar.jpg)";
        contactInfoImg.style.backgroundPosition = "center top";

        footerImg.src = "assets/solarlogoblue.png";
    }
}

function animateHero(mode, isfirst) {
    var landingpage = document.getElementById("landing");
    var herohead = document.querySelector(".hero h1");

    if (isfirst) {
        if (mode == "constructionmode") {
            landingpage.style.backgroundImage =
                "url('assets/constrherobg.jpg')";
            herohead.innerHTML = "CONSTRUCTION";
            console.log("INNERWIDTH: " + savedInnerWidth);
            if (savedInnerWidth > 600) {
                herohead.style.fontSize = "130px";
            }
        } else {
            landingpage.style.backgroundImage = "url('assets/herobg.jpg')";
            herohead.innerHTML = "SOLAR POWER";
            if (savedInnerWidth > 600) {
                herohead.style.fontSize = "140px";
            }
        }
        return;
    }

    if (mode == "constructionmode") {
        // animate away
        var pos = 0;
        clearInterval(id);
        id = setInterval(solaraway, 1);
        function solaraway() {
            if (pos == -200) {
                // change
                landingpage.style.backgroundImage =
                    "url('assets/constrherobg.jpg')";
                herohead.innerHTML = "CONSTRUCTION";
                if (savedInnerWidth > 600) {
                    console.log("KYKIWTF " + savedInnerWidth);
                    herohead.style.fontSize = "130px";
                }

                clearInterval(id);

                // animate in
                pos = 200;
                id = setInterval(constrin, 1);
                function constrin() {
                    if (pos == 0) {
                        clearInterval(id);
                    } else {
                        pos = pos - 4;
                        herohead.style.marginRight = pos + "vw";
                    }
                }
            } else {
                pos = pos - 4;
                herohead.style.marginRight = pos + "vw";
            }
        }
    } else {
        // animate away
        var pos = 0;
        clearInterval(id);
        id = setInterval(constraway, 1);
        function constraway() {
            if (pos == -200) {
                landingpage.style.backgroundImage = "url('assets/herobg.jpg')";
                herohead.innerHTML = "SOLAR POWER";
                if (savedInnerWidth > 600) {
                    herohead.style.fontSize = "140px";
                }
                clearInterval(id);

                // animate in
                pos = 200;
                id = setInterval(solarin, 1);
                function solarin() {
                    if (pos == 0) {
                        clearInterval(id);
                    } else {
                        pos = pos - 4;
                        herohead.style.marginLeft = pos + "vw";
                    }
                }
            } else {
                pos = pos - 4;
                herohead.style.marginLeft = pos + "vw";
            }
        }
    }
}

// render("constructionmode", true);
disableScroll();
