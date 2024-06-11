let type;
let img;
//EVENT DELEGATION
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.button-holder').addEventListener('click', function (e) {
        if (e.target.classList.contains('buttons')) {
            type = e.target.textContent
            document.querySelector('.label-1').innerHTML = type
            console.log(type)
            console.log(e.target.id)
            filterHandler(e.target.id)


        }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#choose-image').addEventListener('click', function (e) {
        document.querySelector('#file-input').click()
    })
}
)

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#file-input').addEventListener('change', function (e) {
        const file = e.target.files[0]
        if (file) {
            const read = new FileReader()
            read.onload = function (e) {
                img = document.createElement('img')
                img.src = e.target.result;

                // img.style.minWidth = '150px';
                // img.style.minHeight = '150px';

                const imageContainer = document.querySelector('.image-holder')
                imageContainer.innerHTML = ''
                imageContainer.appendChild(img)
            }
            read.readAsDataURL(file)
        }
    })
})




function filterHandler(id) {
    const range = document.querySelector('#edit-range')
    range.value = 0
    const selectedButton = document.querySelector(`#${id}`)
    const percent = document.querySelector('.percent')

    range.addEventListener('input', () => {
        const value = range.value
        if (selectedButton.textContent === "Saturation") {
            img.style.filter = `saturate(${value}%)`
            percent.textContent = percentCalculator()
        }
        else if (selectedButton.textContent === "GrayScale") {
            img.style.filter = `grayscale(${value}%)`
            percent.textContent = percentCalculator()


        }
        else if (selectedButton.textContent === "Inversion") {
            img.style.filter = `invert(${value}%)`
            percent.textContent = percentCalculator()


        }
        else if (selectedButton.textContent === "Brightness") {
            img.style.filter = `brightness(${value}%)`
            percent.textContent = percentCalculator()


        }
    })

}

function percentCalculator() {
    const range = document.querySelector('#edit-range')
    return `${range.value}%`

}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.rotate-flip').addEventListener('click', (e) => {
        if (e.target.classList.contains('flip-rotate')) {
            rotateHandler(e.target.id)
        }
    })
})
let currentRotation = 0;
function rotateHandler(id) {
    const selectedButton = document.querySelector(`#${id}`)

    if (selectedButton.id === 'right') {
        currentRotation += 90;
    } else if (selectedButton.id === 'left') {
        currentRotation -= 90;
    } else if (selectedButton.id === 'up') {
        currentRotation = 0; // Reset to default upright position
    } else if (selectedButton.id === 'down') {
        currentRotation += 180; // Rotate 180 degrees from the current position
    }
    img.style.transform = `rotate(${currentRotation}deg)`;


}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.reset-filters').addEventListener('click', (e) => {
        document.querySelector('#edit-range').value = '0';
        document.querySelector('.percent').textContent = '0'
        img.style.filter = resetFilters()
        document.querySelector('.label-1').textContent = ''
        currentRotation = 0;
        img.style.transform = `rotate(${currentRotation}deg)`;


    })
})

function resetFilters() {
    img.style.filter = 'saturation(100%)'
    img.style.filter = 'grayscale(0%)'

    img.style.filter = 'inversion(0%)'
    img.style.filter = 'brightness(100%)'

}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#save-image').addEventListener('click', function () {
        downloadImage();
    });
});

function downloadImage() {
    if (!img) {
        alert("Please Upload the image"

        )
        return;
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')


    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.filter = img.style.filter
    ctx.rotate(currentRotation * Math.Pi / 180)

    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2, img.naturalWidth, img.naturalHeight)


    const link = document.createElement('a')
    link.download = 'edited-image.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
}