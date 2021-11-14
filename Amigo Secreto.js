// Script para sorteio de amigos secretos por Nicolas Barbieri Sousa.

// Para usá-lo: 
// 1. Modifique as constantes das posições dos botões na tela.
// 2. Preencha o vetor send_from com os nomes dos contatos. 
// 3. Preencha o vetor send_to com os nomes que iriam nos papéis.
// 4. Cole o código no console do navegador e posicione o mouse no botão do menu drop-down.

// Obs.: para que ninguém tire o próprio nome garanta que os nomes nos vetores são iguais aos nomes dos contatos.


// Posições dos botões do menu drop-down, "Apagar" e "Apagar apenas para mim" para uma tela de 2560x1080p (barra de tarefas à esquerda e Firefox maximizado)
const drop_down_x_pos = 1830,
    drop_down_y_pos = 880,
    delete_button_x_pos = 1920,
    delete_button_y_pos = 840,
    deleteForMe_x_pos = 1270,
    deleteForMe_y_pos = 480;

// Coeficiente do tempo que o script espera a página atualizar (modifique de acordo com sua máquina/velocidade de conexão com a internet)
const deltaTime = 1;

// Para quem enviar?
let send_from = ['Foo', 'Bar', 'Baz', 'Quz'];

// Quem é o amigo secreto? (nome do anfitrião deve ser incluído aqui)
let send_to = ['Foo', 'Bar', 'Baz', 'Quz', 'Corge'];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

shuffle(send_from);
shuffle(send_to);

// Cópia do vetor de contatos para apagar as mensagens após o envio
let sent = [...send_from];

function simulateMouseEvents(element, eventName)
{
	var mouseEvent = document.createEvent('MouseEvents');
	mouseEvent.initEvent(eventName, true, true);
	element.dispatchEvent(mouseEvent);
}

var eventFire = (MyElement, ElementType) => {
    var MyEvent = document.createEvent("MouseEvents");
    MyEvent.initMouseEvent
    (ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    MyElement.dispatchEvent(MyEvent);
};

function send(name)
{
    messageBox = document.querySelectorAll("[contenteditable='true']")[1];

    message = "Esta\xa0é\xa0uma\xa0mensagem\xa0de\xa0teste.\xa0Este\xa0é\xa0um\xa0nome:\xa0" + name;

    event = document.createEvent("UIEvents");
    messageBox.innerHTML = message.replace(/ /gm, ''); // Test it
    event.initUIEvent("input", true, true, window, 1);
    messageBox.dispatchEvent(event);

    eventFire(document.querySelector('span[data-icon="send"]'), 'click');
}

for (var i = 0; i < send_from.length; i++) {
    simulateMouseEvents(document.querySelector('[title="' + send_from[i] + '"]'), 'mousedown'); // Selecionar o contato
    while (send_to[0] == send_from[i]) // Impedir que se tirem
        shuffle(send_to);

    send(send_to[0]); // Digitar e enviar mensagem
    send_to.splice(0, 1); // Retirar nome da lista
}

// Deletar as mensagens para o anfitrião:
let aux = 0;
setTimeout((a) => {
    for (var i = 0; i < sent.length; i++) {
        setTimeout(deleteMessage(i, aux), aux);
        aux += 800 * deltaTime;
    }
}, 1000 * deltaTime);

function deleteMessage(i, aux) {
    setTimeout((select) => {
        simulateMouseEvents(document.querySelector('[title="' + sent[i] + '"]'), 'mousedown'); // Selecionar o contato
    }, aux * deltaTime);
    setTimeout((dropdown) => {
        document.elementFromPoint(drop_down_x_pos, drop_down_y_pos).click(); // Clicar no drop-down 
    }, aux + 200 * deltaTime);
    setTimeout((dltMsg) => {
        document.elementFromPoint(delete_button_x_pos, delete_button_y_pos).click(); // Clicar em Apagar
        document.elementFromPoint(deleteForMe_x_pos, deleteForMe_y_pos).click(); // Clicar em Apagar para mim
    }, aux + 400 * deltaTime);
}

console.log("Anfitrião, seu amigo secreto é: " + send_to[0]);