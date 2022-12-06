// Script para sorteio de amigos secretos por Nicolas Barbieri Sousa.

// Para usá-lo: 
// 1. Preencha as credenciais de e-mail (SecureToken e From).
// 2. Preencha o vetor emails com os nomes dos contatos. 
// 3. Preencha o vetor nomes com os nomes que iriam nos papéis.
// 4. Execute o código abrindo a página principal (index.html).

// Obs.: para que ninguém tire o próprio nome garanta que a ordem dos nomes corresponde com a ordem dos endereços de e-mail.

const map = new Map();

// E-mail     quux, corge, grault, garply, waldo, fred, plugh, xyzzy, nacho, and thud
let emails = ['foo@bar.com', 'baz@quz.br', 'quux@corge.uk', 'grault@garply.es', 'fred@plugh.fr'];

// Quem é o amigo secreto? (nome do anfitrião deve ser incluído aqui)
let nomes = ['Foo', 'Baz', 'Quux', 'Quux', 'Grault', 'Fred'];

for (var i = 0; i < emails.length; i++)
{
    map.set(emails[i], nomes[i]);
}

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

shuffle(emails);
shuffle(nomes);

for (var i = 0; i < emails.length; i++)
{
    while (nomes[0] == map.get(emails[i])) // Impedir que se tirem
        shuffle(nomes);

    sendEmail(emails[i], nomes[0]); // Digitar e enviar mensagem
    nomes.splice(0, 1); // Retirar nome da lista
}

function sendEmail(email, name) {
  let body = "Seu amigo secreto: " + name + ".";

  Email.send({
    SecureToken: "YOURSECURETOKEN",
    To : email,
    From : "YOUREMAIL",
    Subject : "Seu amigo secreto!",
    Body : body
    }).then(
    console.log("Enviado com sucesso.")
  );
}
