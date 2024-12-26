window.onload = async function () {
  await loadHeader();
}

async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    try {
        const response = await fetch('header.html');
        const headerHTML = await response.text();
        headerPlaceholder.innerHTML = headerHTML;
    } catch (error) {
        console.error('헤더 로드 오류:', error);
    }
}

export { loadHeader };