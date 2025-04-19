let index = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".inner-slide").length;
const dots = document.querySelectorAll(".dots li");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const sliderContainer = document.querySelector(".slider-container");      //chọn phần tử có class là slider-container đầu tiên trên trang
let id;

function update(){
    slides.style.transform = `translateX(-${index * 100}%)`;

    // kiểm tra xem dot hiện tại có cùng chỉ số với slide đang hiển thị không.
    // Nếu có → dot đó là dot của slide hiện tại → thêm class "active".
    // Nếu không → dot đó không thuộc slide hiện tại → gỡ class "active".
    dots.forEach((x, i) => {
        x.classList.toggle("active", i === index);
    });
}

function move(step) {
    index += step;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    update();
}

function moveSlide(){
    clearInterval(id);                           //phải xóa id cũ nếu không sẽ bị lỗi ảnh
    id = setInterval(() => move(1), 5000);       // giữ id của interval trước đó
}

next.addEventListener("click", () => {
    move(1);
    moveSlide();
});

prev.addEventListener("click", () => {
    move(-1);
    moveSlide();
});

function slidePosition(n) {
    index = n;
    update();
    moveSlide();
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => slidePosition(i));
});

sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(id);
});
sliderContainer.addEventListener("mouseleave", () => {
    moveSlide();
});

moveSlide();


const countDownDate = new Date();
countDownDate.setMinutes(countDownDate.getMinutes() + 20);

const x = setInterval(function(){
    const timenow = new Date().getTime();
    const res = countDownDate - timenow;

    const hours = Math.floor((res % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));         // làm tròn số xuống    
    const minutes = Math.floor((res % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((res % (1000 * 60)) / 1000);

    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}, 1000)

// chat-box 
const chatBox = document.getElementById("chatBox");
const messengerBtn = document.getElementById("messengerBtn");
const closeBox = document.getElementById("closeBox");



messengerBtn.addEventListener('click', function(e){
    e.preventDefault();
    chatBox.classList.add("active");
});
closeBox.addEventListener('click', function(){
    chatBox.classList.remove("active");
});

const chatBox2 = document.getElementById("chatBox2");
const closeBox2 = document.getElementById("closeBox2");
const chatBot = document.getElementById("chatBot");
const messagingInput = document.getElementById("messagingInput");
const messagingContent = document.getElementById("messagingContent");
const sendMessaging = document.getElementById("sendMessaging");

chatBot.addEventListener('click', function(){
    chatBox.classList.remove("active");
    chatBox2.classList.add("active");
});
closeBox2.addEventListener('click', function(){
    chatBox2.classList.remove("active");
});

sendMessaging.addEventListener('click', function(){
    const result = messagingInput.value.trim();
    if(result){
        const user = document.createElement("div");
        user.classList.add("message", "sent");
        user.textContent = result;
        messagingContent.appendChild(user);
        messagingInput.value = " ";
        messagingContent.scrollTop = messagingContent.scrollHeight;

        setTimeout(() =>{
            const reply = document.createElement("div");
            reply.classList.add("message", "received");
            reply.textContent = "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ trả lời tin nhắn bạn sớm nhất có thể!";
            messagingContent.appendChild(reply);
            messagingContent.scrollTop = messagingContent.scrollHeight;
        }, 1000)
    }
});
messagingInput.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        sendMessaging.click();
    }
});
// End chat box