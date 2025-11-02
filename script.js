// script.js - 그때 내가 준 원본 (1 or 0만 표시)
let isMining = false;

async function loadWasm() {
    try {
        const response = await fetch('/cn.wasm');
        if (!response.ok) throw new Error('WASM not found');
        
        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        
        await WebAssembly.compile(bytes);
        await WebAssembly.instantiate(bytes, {
            env: { memory: new WebAssembly.Memory({ initial: 256 }) }
        });

        // 채굴 성공 → 1 표시
        document.getElementById('hashrate').textContent = '1';
        isMining = true;
        console.log('채굴 시작됨 (WASM 로드 성공)');
    } catch (error) {
        // 채굴 실패 → 0 표시
        document.getElementById('hashrate').textContent = '0';
        isMining = false;
        console.log('채굴 실패:', error.message);
    }
}

// 페이지 로드 시 자동 실행
window.addEventListener('load', loadWasm);
