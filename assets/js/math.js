
(function () {
    var parameter = {
        maxNumber : 50,  // add and minus max number
        multiplication : 10,
        division : 10
    }
    var main = document.getElementById("j-main");
    var stopTime;   

    // send question custorm give us answer
    parameter.total = prompt('Please enter total question?','');

    // censor answer whether number or isn't default 100 total
    if ( !(parameter.total && parseInt(parameter.total)) ) {
        // default total
        parameter.total = 100;
    } else {
        parameter.total = parseInt(parameter.total);
    }

    // math computation
    function mathNumber(x, y) {
        this.oneNumber = parseInt(x);
        this.twoNumber = parseInt(y);
    }

    mathNumber.prototype.add = function () {
        return this.oneNumber + this.twoNumber;
    };
    mathNumber.prototype.minus = function () {
        return this.oneNumber - this.twoNumber;
    };
    mathNumber.prototype.division = function () {
        return this.oneNumber / this.twoNumber;
    };
    mathNumber.prototype.multiplication = function () {
        return this.oneNumber * this.twoNumber;
    };
    

    (function () {
        let wrap = document.getElementById("j-computation");
        let span = wrap.getElementsByTagName('span');

        for (let x = 0; x < span.length; x++) {
            span[x].onclick = function () {

                // get sysbom's number
                let serialNumber = this.getAttribute("data-computation");

                // get class z-current
                for (let y = 0; y < span.length; y++) {
                    span[y].classList.remove("z-current");
                }
                this.classList.add("z-current");
                parameter.symbol = serialNumber;
                main.innerHTML = '';
                getTopic();
                stopComputation();
                timeComputation();
            }
        }
    }());

    function getRandomSymbol() {
        let symbol = parseInt(parameter.symbol) ? parseInt(parameter.symbol) : Math.ceil(Math.random() * 2);

        switch (symbol) {
            case 1:
            return '+';
            case 2:
            return '-';
            case 3:
            return '×';
            case 4:
            return '÷';
        }
    }

    // censor number
    function censorNumber() {
        let objValue = this.value;
        let objValue2 = objValue.replace(/[^-]\D/ig, '');
        this.value = objValue2
    }

    // censor answer whether proper
    function isAnswer() {
        var input = document.getElementsByName('number');
        
        for (let x = 0; x < input.length; x++) {
            let li = input[x].parentElement;
            let span = li.getElementsByTagName('span');
            let [number1, number2, symbol] = [
                span[0].innerHTML,
                span[2].innerHTML,
                span[1].innerHTML
            ];
            let math = new mathNumber(number1, number2);

            if (input[x].value == '' || input[x].value == null) {
                continue;
            } else {
                switch (symbol) {
                    case '+':
                        if (parseInt(input[x].value) === math.add()) {
                            li.classList.add("z-right");
                        } else {
                            li.classList.add("z-error");
                        }
                    break;
                
                    case '-':
                        if (parseInt(input[x].value) === math.minus()) {
                            li.classList.add("z-right");
                        } else {
                            li.classList.add("z-error");
                        }
                    break;

                    case '×':
                        if (parseInt(input[x].value) === math.multiplication()) {
                            li.classList.add("z-right");
                        } else {
                            li.classList.add("z-error");
                        }
                    break;

                    case '÷':
                        if (parseInt(input[x].value) === Math.round(math.division())) {
                            li.classList.add("z-right");
                        } else {
                            li.classList.add("z-error");
                        }
                    break;
                }
            }
        }
    }
    
    // get hundred topic
    function getTopic() {
        var frag = document.createDocumentFragment();

        // a hundred topic
        for(let x = 0; x < parameter.total; x++){

            // get li
            let li = document.createElement('li');
            li.className = "col-6 col-md-4 col-lg-3";
            
            // get span number
            let span = document.createElement('span');
            span.innerHTML = Math.ceil(Math.random() * parameter.maxNumber);
            li.appendChild(span);

            // get span symbol
            let span2 = document.createElement('span');
            span2.innerHTML = getRandomSymbol();
            li.appendChild(span2);

            // get span2 number2
            let span3 = document.createElement('span');
            switch (getRandomSymbol()) {
                case '×':
                    span3.innerHTML = Math.ceil(Math.random() * parameter.multiplication);
                    break;
                
                case '÷':
                    span3.innerHTML = Math.ceil(Math.random() * parameter.division);
                    break;

                default:
                    span3.innerHTML = Math.ceil(Math.random() * parameter.maxNumber);
                    break;
            }
            li.appendChild(span3);

            // get span4
            let span4 = document.createElement('span');
            span4.innerHTML = '=';
            li.appendChild(span4);
            
            // get input 
            let input = document.createElement('input');
            input.name = 'number';
            input.placeholder = '?'
            input.type = 'text';
            li.appendChild(input);
            
            // append span1~4 input
            frag.appendChild(li);
        }

        // get topic
        main.appendChild(frag);
        
        // input censor code press enter jump next topic
        var input = main.getElementsByTagName('input');
        for (let x = 0; x < input.length; x++) {
            input[x].onkeyup = censorNumber;
            input[x].onkeydown = function (event) {
                event = event ? event : window.event;
                let code = event.which || event.keyCode;

                if (code === 13) {
                    this.blur();
                    this.parentElement.nextElementSibling.lastElementChild.focus();
                }
            }
        }
        input[0].focus();
    }
    getTopic();

    
    
    // time Computation
    function timeComputation() {
        var timewrap = document.getElementById("j-time");
        var span = timewrap.getElementsByTagName('span');
        let [min, second] = [span[0], span[1]];
        let [m, s] = [0, 0];
        stopTime = setInterval(beats, 1000);
        
        function beats() {
            s++;
            if (s === 60) {
                m += 1;
                s = 0;
            }

            min.innerHTML = m;
            second.innerHTML = s;
        }
    }
    timeComputation();
    function stopComputation() {
        clearInterval(stopTime);
    }

    var done = document.getElementById("j-done");
    done.onclick = function () {
        stopComputation();
        isAnswer();
        getMistake();
    }

    // get mistake total 
    function getMistake() {
        let li = main.getElementsByTagName('li');
        let mistakeWrap = document.getElementById("j-mistake");
        let span = mistakeWrap.getElementsByTagName('span')[0];
        let mistakeTotal = 0;

        for (let x = 0; x < li.length; x++) {
            let liAttr = li[x].classList.contains('z-error');
            
            if (liAttr) {
                mistakeTotal++;
            }
        }

        span.innerHTML = mistakeTotal;
    }
}());