let jap = [["あ", "い", "う", "え", "お"],
["か", "き", "く", "け", "こ"],
["さ", "し", "す", "せ", "そ"],
["た", "ち", "つ", "て", "と"],
["な", "に", "ぬ", "ね", "の"],
["は", "ひ", "ふ", "へ", "ほ"],
["ま", "み", "む", "め", "も"],
["や", "ゆ", "よ"],
["ら", "り", "る", "れ", "ろ"],
["わ", "を", "ん"]
];
let rus = [["А", "И", "У", "Э", "О"],
["КА", "КИ", "КУ", "КЭ", "КО"],
["СА", "СИ", "СУ", "СЭ", "СО"],
["ТА", "ТИ", "ЦУ", "ТЭ", "ТО"],
["НА", "НИ", "НУ", "НЭ", "НО"],
["ХА", "ХИ", "ФУ", "ХЭ", "ХО"],
["МА", "МИ", "МУ", "МЭ", "МО"],
["Я", "Ю", "Ё"],
["РА", "РИ", "РУ", "РЭ", "РО"],
["ВА", "ВО", "Н"]
];

let kanaBox = document.querySelector('.kana-box');
let nextButton = document.querySelector('.right');
let checkBoxes = document.querySelectorAll('.check-box__checkbox');
let errorBox = document.querySelector('.error-message');
let playButton = document.querySelector('.play');
let pauseButton = document.querySelector('.stop');
let timeScale = document.querySelector('.time');
let timeShown = document.querySelector('.time-value');
let trainingModeInput = document.querySelector('.training-mode');

let symbol = "あ";
let symbolRus = "А";
let rndRow;
let rndPos;
let symbolPrev;
let timer;
let time = 5000;
let trainingMode = 'japru';


let k = 0;

let allowedRows = [];

function SetTrainingMode() {
    if (trainingModeInput.value == 1) {
        trainingMode = 'japru';
    }else{
        trainingMode = 'rujap';
    }
    console.log(trainingMode);
}

trainingModeInput.addEventListener('change',(e)=>{
    SetTrainingMode();
})

function getAllowedRows() {
    allowedRows = [];
    checkBoxes.forEach((item, index) => {
        if (item.checked) allowedRows.push(index);
    });
    console.log(allowedRows);
};

checkBoxes.forEach((item) => {
    if (item.checked) getAllowedRows();
    item.addEventListener('change', getAllowedRows);
});

function randomSymbol() {
    rndRow = allowedRows[Math.floor(Math.random() * allowedRows.length)];
    while (symbolPrev == rndPos) {
        if (rndRow == 7 || rndRow == 9) {
            rndPos = Math.floor(Math.random() * 3);
        } else {
            rndPos = Math.floor(Math.random() * 5);
        }
    }
    symbol = jap[rndRow][rndPos];
    symbolRus = rus[rndRow][rndPos];
    console.log(symbol, symbolRus);
    symbolPrev = rndPos;
};

function error() {
    if (allowedRows.length == 0) {
        errorBox.innerHTML = 'Выбери хотя бы один ряд'
        errorBox.classList.add('isError');
        setTimeout(() => {
            errorBox.classList.remove('isError');
        }, 3000);
    }
}

function newSymbol() {
    randomSymbol();
    if (trainingMode == 'japru') {
        kanaBox.innerHTML = symbol;
        k = 0;
    } else {
        kanaBox.innerHTML = symbolRus;
        k = 1;
    }
    
    
}

kanaBox.addEventListener("click", (e) => {
    if (k == 1) {
        kanaBox.innerHTML = symbol;
        k = 0;
    } else if (k == 0) {
        kanaBox.innerHTML = symbolRus;
        k = 1;
    }
    kanaBox.classList.toggle('rotate');
    setTimeout(() => {
        kanaBox.classList.toggle('rotate');
    }, 100);
});

nextButton.addEventListener('click', (e) => {
    if (allowedRows.length == 0) {
        error();
        return;
    }
    newSymbol();
});

playButton.addEventListener('click', (e) => {
    if (playButton.classList.contains('active')) return;
    timer = setInterval(() => {
        if (allowedRows.length == 0) {
            error();
            return;
        }
        newSymbol();
    }, time);
    playButton.classList.add('active');
})
pauseButton.addEventListener('click', (e) => {
    clearInterval(timer);
    playButton.classList.remove('active');
})

timeScale.addEventListener('change', (e)=>{
    time = timeScale.value*1000;
    timeShown.innerHTML = `${timeScale.value} секунд`;
    clearInterval(timer);
    playButton.classList.remove('active');
    
});