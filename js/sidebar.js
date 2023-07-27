const sidebarToggle = document.querySelector("#sidebar-toggle"),
line1 = document.querySelector('#line-1'),
line2 = document.querySelector('#line-2'),
sidebar = document.querySelector('#sidebar');

sidebarToggle.addEventListener('click', () => {
    ['active', 'absolute', 'centering'].map(singleClass => line1.classList.toggle(singleClass));
    ['active', 'absolute', 'centering'].map(singleClass => line2.classList.toggle(singleClass));
    sidebar.classList.toggle('hidden');
})

function openSubmenu (container) {
    container.querySelector('.submenu').classList.toggle('hidden');
}