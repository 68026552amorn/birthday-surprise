// กำหนดวันเกิดที่ถูกต้อง (เปลี่ยนเป็นวันเกิดที่ต้องการ)
const CORRECT_BIRTHDAY = "2006-11-06"; // *** แก้ไขวันเกิดที่นี่ ***

// 🚩🚩🚩 ชื่อไฟล์รูปภาพของคุณ (ต้องตรงกับชื่อไฟล์ในโฟลเดอร์ images/) 🚩🚩🚩
const IMAGE_URLS = [
    "images/my_picture_1.jpg",
    "images//my_picture_2.jpg",
    "images/my_picture_3.jpg", 
    "images/my_picture_4.jpg",
    "images/", // ควรมีรูปภาพหลายรูปเพื่อให้เห็นการเลื่อนชัดเจน
];

// ---------------------------------------------
// ตรรกะการล็อกอิน (ใช้โค้ดเดิม)
// ---------------------------------------------
function checkBirthday() {
    const input = document.getElementById('birthdayInput');
    const message = document.getElementById('message');
    
    if (!input || !message || !input.value) {
        message.textContent = "กรุณาเลือกวันเกิด";
        return;
    }

    const selectedDate = input.value;
    
    if (selectedDate === CORRECT_BIRTHDAY) {
        localStorage.setItem('birthday_login', 'true');
        window.location.href = 'main.html';
    } else {
        message.textContent = "❌ วันเกิดไม่ถูกต้อง ลองอีกครั้งนะ!";
    }
}

// ---------------------------------------------
// ตรรกะการสร้างและเลื่อนภาพอัตโนมัติ (ใหม่)
// ---------------------------------------------

function setupScrollingImages() {
    const track = document.querySelector('.image-track');
    
    if (!track) return;

    // ต้องทำซ้ำรูปภาพอย่างน้อย 2 ชุด เพื่อให้การเลื่อนดูต่อเนื่อง
    const imageSets = [...IMAGE_URLS, ...IMAGE_URLS]; 
    
    imageSets.forEach((url, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'track-item';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `ภาพวิ่ง ${index + 1}`;
        itemDiv.appendChild(img);
        track.appendChild(itemDiv);
    });

    // ----------------------------------------------------
    // คำนวณความยาวรวมของแถบภาพและสร้าง CSS Animation
    // ----------------------------------------------------
    
    const trackWidth = 150; // ความกว้างของภาพ (จาก CSS)
    const trackMargin = 15; // ระยะห่างระหว่างภาพ (จาก CSS)
    
    // คำนวณความยาวทั้งหมดที่ต้องเลื่อน (จำนวนภาพจริง * (ความกว้าง+ระยะห่าง))
    const totalImageWidth = IMAGE_URLS.length * (trackWidth + trackMargin); 
    
    // กำหนดความกว้างของ track และ Keyframes Animation
    track.style.width = `${totalImageWidth * 2}px`; // กำหนดความกว้างของแถบภาพทั้งหมด

    // 1. สร้าง Keyframes สำหรับการเลื่อนจากขวาไปซ้าย
    const keyframesName = 'scroll-animation';
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    document.head.appendChild(styleSheet);
    
    // สั่งให้เลื่อนจากตำแหน่ง 0 ไปยังตำแหน่งที่เป็นลบของความกว้างแถบภาพเดียว
    const keyframes = `@keyframes ${keyframesName} {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${totalImageWidth}px); }
    }`;
    styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);

    // 2. สั่งให้ track ใช้ Animation ที่เพิ่งสร้าง
    const animationDuration = IMAGE_URLS.length * 2; // กำหนดความเร็ว (2 วินาทีต่อรูป)
    track.style.animation = `${keyframesName} ${animationDuration}s linear infinite`;
}


// ---------------------------------------------
// ตรวจสอบสถานะเมื่อโหลดหน้า
// ---------------------------------------------

if (window.location.pathname.endsWith('main.html')) {
    const isLoggedIn = localStorage.getItem('birthday_login');
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
    } else {
        // ถ้าล็อกอินแล้ว ให้สร้างและเริ่มภาพวิ่ง
        setupScrollingImages();
    }
}