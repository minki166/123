// script.js - Netlify 전용 (게임 안 사라짐 + admin 키)
const CANONICAL_URL = 'https://korea-scripter.netlify.app'; // ← 네 도메인으로 변경!
const STORAGE_KEY = 'games_' + btoa(CANONICAL_URL);
const CORRECT_KEY = atob('NDEwMQ=='); // 4101

// URL 정규화
if (location.href !== CANONICAL_URL && location.href.includes('netlify.app')) {
    location.replace(CANONICAL_URL);
}

// localStorage 저장/로드
function getGames() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveGames(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// 게임 등록
function saveGame() {
    const name = document.getElementById('gameName').value.trim();
    const desc = document.getElementById('gameDesc').value.trim();
    const script = document.getElementById('gameScript').value.trim();
    if (!name || !desc || !script || !clipboardImg) return alert('모든 항목 입력하세요.');
    
    const game = { name, desc, script, img: clipboardImg, timestamp: Date.now() };
    const list = getGames();
    list.push(game);
    saveGames(list);
    alert('게임 등록됨!');
    renderGames();
    hideAddForm();
    resetForm();
}

// 게임 렌더링
function renderGames() {
    const list = getGames();
    const container = document.getElementById('gameList');
    container.innerHTML = '';
    list.forEach(g => {
        const div = document.createElement('div');
        div.className = 'gameCard';
        div.innerHTML = `<img src="${g.img}" alt="${g.name}"><p>${g.name}</p>`;
        div.onclick = () => showModal(g);
        container.appendChild(div);
    });
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
    renderGames();
    // ... 나머지 admin 키, 채굴 등 그대로
});
