var tmi = require('tmi.js');
var fs = require('fs');
var http = require('http');

// Configuración del servidor desde donde se verán (o escucharán) los 
// videos que ponga la audiencia. Es una solución a corto plazo, luego 
// veré como hacerlo de otra manera.

const PORT=8080;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(PORT);
	console.log(`Escuchando en el puerto ${PORT}`)
});


// Configuraciones iniciales. process.env.TTOKEN equivale a la clave OAuth2 que tengo
// almacenada en una env var, para que en stream no se vea :)

var options = {
	options: {
		debug: true
	}, 
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: "Bot_Supremo",
		password: process.env.TTOKEN
	},
	channels: ["b0ssat192"]
};

var fumarContador = 0
var client = new tmi.client(options);


client.on('message', onMessageHandler);
client.on('connected', onConnectHandler);


client.connect();


function onMessageHandler(channel, tags, message, user, self) {
	if(self)
		return;
	const commandName = message.trim();
	const mod = (tags.username == "b0ssat192" || tags.mod); // Para los comandos meridianamente peligrosos :)
	

		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
		// Switch para los comandos generales. 									 //
		// Decidí usar los switches por su sencilleza, porque el código es bastante sencillo de explicar y       //
		// leer de esta forma, per sobre todo por la estética que llega a tener el código.			 //
		// A parte, no quiero ser el próximo YandereDev.							 //
		// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

	if(message.startsWith('!')) {
		switch(channel, message) { 
			case "!comandos":
				client.say(channel, 'Comandos funcionales: !d20, !moderadores, !hola, !felipe, !fueafumar, !vecesfumando, !retrasao, !autores, !discord, !github, !chao, !adios, !specs, !programas, !pedirsong (Trabajo en progreso)')
				break;
			case "!d20":
				var caras = 20;
				const num = Math.floor(Math.random() * caras) + 1
				client.say(channel, `Sacaste un ${num}... ¿será el número ganador?`)
				break;
			case "!moderadores":
				client.say(channel, 'Mis actuales moderadores son: @AVARICIA72, @sanixo_8 y @xGabrielMorales.')
				break;
			case "!hola":
				client.say(channel, `¡Bienvenido @${tags.username}! ¡Espero que te la pases de diez!`)
				break;
			case "!felipe":
				client.say(channel, '@Felipe_Ignac1o... un glande...')
				break;
			case "!vecesfumando":
				client.say(channel, `b0ssAT192 ha ido a fumar ${fumarContador} veces.`)
				break;
			case "!fueafumar":
				if(mod) {
					fumarContador++
					client.say(channel, `b0ssAT192 fue a fumar. Ha ido a fumar ${fumarContador} veces en este stream.`)
				} else {
					client.say(channel, '¡Debes ser moderador para utilizar este comando!')
				}
				break;
			case "!clearsmoke": // RECORDAR: COMANDO SOLO PARA MODS! REQUERIR TWITCH-API!
				if(mod) {
					fumarContador = 0
					client.say(channel, 'Fumadas ahora equivale a cero. ¿Será cierto...?')
				} else {
					client.say(channel, '¡Debes ser moderador para utilizar este comando!')
				}
				break;	
			case "!retrasao":
				client.say(channel, 'Eres un retrasado, b0ssAT192. ¿Lo sabes?')
				break;
			case "!autores":
				client.say(channel, 'Todos juntos creamos este bot. Nuestra comunidad dió vida a todo esto :)')
				break;
			case "!chao":
			case "!adios":
				client.say(channel,  `¡Hasta la próxima @${tags.username}, esperamos verte pronto!`)
				break;
			case "!discord":
				client.say(channel, 'Nuestro servidor de Discord es el siguiente: https://discord.gg/EkwaJsm')
				break;
			case "!github":
				client.say(channel, 'Mi Github: https://github.com/ssepi0l-pv')
				break;
			case "!specs":
				client.say(channel, 'CPU: Intel(R) Core(TM) i7-7500U CPU @ 2.70GHz, Memoria RAM: 8GB, GPU: nVidia GeForce 930MX, HDD: Intel Corp. Sunrise Point-LP AHCI 1TB ...pues eso.')
				break;
			case "!programas":
				client.say(channel, 'Los programas que uso son: OBS para los streams, GIMP para la edición, Terminator para mi emulador de terminal, VIM como mi editor de texto, y Arch Linux como mi sistema operativo.')
				break;
			default:
				client.say(channel, 'Este comando no existe. Para ver la lista de comandos, tipea !comandos y los podrás ver :)')
				break;
		}

		if(message.startsWith('!pedirsong')) {
			input = message.split(' ')[1];
			client.say(channel, 'Trabajo en progreso :)')
		}
	}
};

// setIntervals para enviar comandos cada 10-15 minutos o más.  

/*
setInterval(function(channel, tags, message) {
	client.say(channel='b0ssat192', '@b0ssAT192 recuerda: Al apagar stream, prende el servidor. ¡QUE NO SE TE OLVIDE INICIARLO!')
}, 600000);
*/

setInterval(function(channel, tags, message) {
	client.say(channel='b0ssat192', '¡Si disfrutan el contenido, apreciaría un montón que me siguieran!')
}, 900000);



function onConnectHandler(addr, port) {
	console.log(`* Conectado a ${addr}:${port}`);
}



		//case message.startsWith("!d"):
		//	var msW = message
		//	client.log(`${msW}`)
			//var numeroDado = 0
			//const dadoSeis = Math.floor(Math.random() * caraSeis) + 1
			//client.say(channel, `Sacaste un ${dadoSeis}... ¿será el seis de la suerte?`)
		//	client.log('funca pana')


	//if(commandName.startsWith(int, 3)) {
	//	process.stdout.write(commandName);		




// ` ` for vars
