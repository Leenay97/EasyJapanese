let firstVerb = ["いく", "はなす", "いう", "まつ", "しぬ", "とぶ", "いそぐ", "およぐ", "のむ", "まねく", "さそう", "もつ", "まなぶ"];
let secondVerb = ["たべる", "なげる", "にげる", "おきる", "おしえる", "かける", "たりる", "わすれる", "あらわれる", "のべる", "ねる", "いれる", "わける"];
let thirdVerb = ["べんきょうする", "さんかする", "グーグルする", "しゅっせくする", "せつりつする", "かんしゃする", "けっせきする", "にゅうがくする", "そくしんする", "うんどうする", "うんてんする", "けんきゅうする", "そつぎょうする"];
let verbContainer = document.querySelector('.verb-container');
let answer = document.querySelector('.answer');
let rnd;
let conj;
let currVerb;
let changingMora;
let changedMora;
let rightAnswer;

function nextVerb() {
    conj =  Math.floor(Math.random()*3);

    if (conj == 0) {
        rnd = Math.floor(Math.random()*firstVerb.length);
      currVerb = firstVerb[rnd];  
    } else if (conj == 1) {
        rnd = Math.floor(Math.random()*secondVerb.length);
        currVerb = secondVerb[rnd];
    } else if (conj == 2) {
        rnd = Math.floor(Math.random()*secondVerb.length);
        currVerb = thirdVerb[rnd];
    }
    
    verbContainer.innerHTML = currVerb;
    answer.classList.remove('right');
    answer.value = "";
}
function checkAnswer() {
    if (conj == 0) {
    changingMora = currVerb.slice(-1);
    if (changingMora == 'ぶ') changedMora = 'ば';
    if (changingMora == 'う') changedMora = 'わ';
    if (changingMora == 'く') changedMora = 'か';
    if (changingMora == 'す') changedMora = 'さ';
    if (changingMora == 'つ') changedMora = 'た';
    if (changingMora == 'ぬ') changedMora = 'な';
    if (changingMora == 'ぐ') changedMora = 'が';
    if (changingMora == 'む') changedMora = 'ま';
    if (changingMora == 'る') changedMora = 'る';

    rightAnswer = `${currVerb.slice(0, -1)+changedMora}れる`;
    } else if (conj == 1) {
        rightAnswer = `${currVerb.slice(0, -1)}られる`;
    } else if (conj == 2) {
        rightAnswer = `${currVerb.slice(0, -2)}される`;
    }
    if (answer.value == rightAnswer) {
        answer.classList.add('right');
        answer.classList.remove('wrong');
        setTimeout(()=>{
            nextVerb();
            answer.classList.add('wrong');
            answer.reset();
        }, 1000);
    } else {
        answer.classList.remove('right');
    }

}

answer.addEventListener('input', (e)=>{
    checkAnswer();
    console.log('1');

});

nextVerb();