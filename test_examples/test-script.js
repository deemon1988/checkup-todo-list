function handleMouseClick(event) {
console.log('Вы нажали на элемент:', event.target)
}

window.addEventListener('click', handleMouseClick)
window.addEventListener('click', handleMouseClick, true)
window.addEventListener('click', handleMouseClick, false)
window.addEventListener('click', handleMouseClick, {
passive: true,
capture: false
})

const abortController = new AbortController()

window.addEventListener('click', handleMouseClick, {
signal: abortController.signal
})
