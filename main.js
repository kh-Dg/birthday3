// ========== اطلاعات قابل شخصی‌سازی ==========
const birthdayData = {
    name: " ",
    age: 25,
    date: "۱۴۰۳/۰۳/۱۵",
    message: `سلام عزیز دلم! امروز روز خاصیه، روزی که تو به دنیا اومدی و دنیامون رو قشنگ‌تر کردی. 
    آرزوم اینه که همیشه خنده روی لبت باشه و هر روزت پر از شادی و عشق باشه.
    تولدت مبارک بهترین آدم زندگی من 🎂`,
    sender: "عاشق تو",
    profileImage: "./profile.jpg",
    gift: {
        text: "یک سورپرایز ویژه برای تو دارم! روی دکمه زیر کلیک کن",
        link: "https://example.com/surprise"
    }
};

// ========== المان‌ها ==========
const splashScreen = document.getElementById('splashScreen');
const splashBtn = document.getElementById('splashBtn');
const mainPage = document.getElementById('mainPage');
const audio = document.getElementById('birthdayAudio');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.querySelector('.music-icon');
const musicText = document.querySelector('.music-text');

let isPlaying = false;

// ========== اعمال اطلاعات ==========
document.getElementById('ageNumber').textContent = birthdayData.age;
document.getElementById('birthdayName').innerHTML = `🎂 تولدت مبارک ${birthdayData.name}! 🎂`;
document.getElementById('birthdayDate').textContent = birthdayData.date;
document.getElementById('senderName').innerHTML = `<span>❤️</span> ${birthdayData.sender} <span>❤️</span>`;
document.getElementById('giftText').innerHTML = birthdayData.gift.text;
document.getElementById('giftLink').href = birthdayData.gift.link;

// عکس پروفایل
const profileImg = document.getElementById('profileImage');
if (profileImg) {
    profileImg.src = birthdayData.profileImage;
    profileImg.onerror = () => {
        profileImg.src = 'https://placehold.co/400x400/f5af19/white?text=🎂';
    };
}

// ========== تایپ‌رایتر ==========
function startTypeWriter() {
    const messageElement = document.getElementById('birthdayMessage');
    const fullText = birthdayData.message;
    let index = 0;
    
    messageElement.innerHTML = '';
    
    function typeNextChar() {
        if (index < fullText.length) {
            messageElement.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(typeNextChar, 35);
        } else {
            const cursor = document.querySelector('.typing-cursor');
            if (cursor) cursor.style.display = 'none';
        }
    }
    
    typeNextChar();
}

// ========== پخش آهنگ ==========
function playMusic() {
    audio.play().catch(e => console.log("پخش آهنگ نیاز به کلیک دارد"));
    isPlaying = true;
    if (musicBtn) musicBtn.classList.add('playing');
    if (musicIcon) musicIcon.textContent = '🎵';
    if (musicText) musicText.textContent = 'در حال پخش';
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    if (musicBtn) musicBtn.classList.remove('playing');
    if (musicIcon) musicIcon.textContent = '🔊';
    if (musicText) musicText.textContent = 'پخش موزیک';
}

function toggleMusic() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// ========== ورود به صفحه اصلی ==========
splashBtn.addEventListener('click', () => {
    splashScreen.classList.add('hide');
    mainPage.classList.add('show');
    startTypeWriter();
    playMusic();
});

// دکمه موزیک
if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
}

// ========== مودال سورپرایز ==========
const giftBtn = document.getElementById('giftBtn');
const giftModal = document.getElementById('giftModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

function openModal() {
    giftModal.classList.add('show');
}

function closeModal() {
    giftModal.classList.remove('show');
}

if (giftBtn) giftBtn.addEventListener('click', openModal);
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && giftModal.classList.contains('show')) {
        closeModal();
    }
});