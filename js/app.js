window.addEventListener('load', function () {
    const refs = {
        countUser: document.querySelector('.count-user'),
        countComp: document.querySelector('.count-comp'),
        userField: document.querySelector('.user-field'),
        compField: document.querySelector('.comp-field'),
        result: document.querySelector('.result'),
        sound: document.querySelector('.sound'),
        play: document.querySelector('.play'),
        fields: document.querySelectorAll('.field')
    }

    const count = {
        userStep: 0,
        compStep: 0,
        countU: 0,
        countC: 0,
        blocked: false
    }

    function choiceUser(e) {
        if (count.blocked) {
            return
        }
        if (e.target.classList.contains('field')) {
            count.userStep = e.target.dataset.field
            refs.fields.forEach(field => field.classList.remove('active', 'error'))
            e.target.classList.add('active')
            choiceComp()
        }
    }

    function choiceComp() {
        count.blocked = true
        const randomNumber = Math.floor(Math.random() * 3)
        refs.compField.classList.add('blink')
        const compFields = refs.compField.querySelectorAll('.field')
        setTimeout(() => {
            refs.compField.classList.remove('blink')
            count.compStep = compFields[randomNumber].dataset.field
            compFields[randomNumber].classList.add('active')
            winner()
        }, 2000)

    }

    function winner() {
        count.blocked = false
        const combination = count.userStep + count.compStep
        switch (combination) {
            case 'rr':
            case 'ss':
            case 'pp':
                refs.result.innerText = 'Ничья!'
                refs.sound.setAttribute('src', 'audio/draw.mp3')
                refs.sound.play()
                break;
            
            case 'rs':
            case 'sp':
            case 'pr':
                refs.result.innerText = 'Победили Вы!'
                refs.sound.setAttribute('src', 'audio/win.mp3')
                refs.sound.play()
                count.countU += 1
                refs.countUser.innerText = count.countU
                refs.compField.querySelector(`[data-field=${count.compStep}]`).classList.add('error')
                break;
            
            case 'sr':
            case 'ps':
            case 'rp':
                refs.result.innerText = 'Победили компьютер!'
                refs.sound.setAttribute('src', 'audio/loss.mp3')
                refs.sound.play()
                count.countC += 1
                refs.countComp.innerText = count.countC
                refs.userField.querySelector(`[data-field=${count.userStep}]`).classList.add('error')
                break;
        
            default:
                break;
        }
    }

    function playGame() {
        count.countU = count.countC = 0
        refs.result.innerText = 'Сделайте выбор'
        refs.countUser.innerText = '0'
        refs.countComp.innerText = '0'
        refs.fields.forEach(field => field.classList.remove('active', 'error'))
    }

    refs.play.addEventListener('click', playGame)
    refs.userField.addEventListener('click', choiceUser)
})