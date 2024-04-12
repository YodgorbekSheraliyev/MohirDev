const wrapper = document.querySelector('.wrapper')



wrapper.addEventListener('click', (e) => {
    const comment = e.target
    const card = comment.parentElement.parentElement
    const commentForm =card.childNodes[7]
    // const commentForm = card
    comment.addEventListener('click', () => {
        console.log(commentForm.childNodes[1].style.display = 'block');
        // commentForm.childNodes[0].styles.display = 'block'
    })
    // console.log('element');
})