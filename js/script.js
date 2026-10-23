'use strict';
const burger = document.querySelector('#burger');
const nav = document.querySelector('#nav');
function closeMenu() {
    nav?.classList.remove('active');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Открыть меню');
}
burger?.addEventListener('click', () => {
    const expanded = nav.classList.toggle('active');
    burger.setAttribute('aria-expanded', String(expanded));
    burger.setAttribute('aria-label', expanded ? 'Закрыть меню' : 'Открыть меню');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', closeMenu));
const modal = document.querySelector('#meetingModal');
let previousFocus;
const form = document.querySelector('#meetingForm');
function openModal(event) {
    event.preventDefault();
    previousFocus = document.activeElement;
    closeMenu();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.querySelector('#meetingStatus').textContent = '';
    document.querySelector('#meetingName').focus();
}
function closeModal() {
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    previousFocus?.focus();
}
document.querySelectorAll('#openMeetingModal, [data-open-meeting]').forEach(button => button.addEventListener('click', openModal));
document.querySelector('#closeMeetingModal').addEventListener('click', closeModal);
document.querySelector('.meeting-modal__overlay').addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeModal(); closeMenu(); }
    if (event.key !== 'Tab' || !modal.classList.contains('active')) return;
    const items = Array.from(modal.querySelectorAll('button, input, a[href]')).filter(item => !item.disabled);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
form.addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#meetingStatus').textContent = 'Форма проверена. Это демонстрация: заявка не отправлена, данные не сохранены.';
    form.reset();
});
const subscribeForm = document.querySelector('.subscribe-box__form');
subscribeForm.addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#subscribeStatus').textContent = 'Форма проверена. Подписка не оформлена, адрес не сохранён.';
    subscribeForm.reset();
});
