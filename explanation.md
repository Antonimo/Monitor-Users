# Steps

1. reviewed the task and formulated a general workflow
2. researched and have choosen technologies and methodology
3. setup development environment
4. created new project and built the prototype while testing the results
5. reviewed and uploaded the project to github


# Technology

1. Node.js - JavaScript runtime for server side (Backend)
	
	* Spares all the trouble involved with forming separate threads and instead uses a single thread, that is, the event loop that takes care of all the asynchronous I/O operations.
	* Works on a non-blocking I/O model that makes it clean and usable, ideal for the data-intensive real-time applications that have to perform in varied environments.
	* Allows developers to write JavaScript for both the server and client thus making it convenient to transport data between the server and the client to co-ordinate the working simultaneously.
	* Is an open-source technology, it gives an edge with a shared repository of dynamic tools and modules. The amount of modules that are more than 60000 in the Node Package Manager (NPM) has risen with a significant growth and is beating the RoR (Ruby on Rails) platform.


2. MongoDB - Database
	
	* Flexible Data Model. Unlike relational databases, NoSQL databases easily store and combine any type of data, both structured and unstructured. You can also dynamically update the schema to evolve with changing requirements and without any interruption or downtime to your application.
	* Elastic Scalability. NoSQL databases scale out on low cost, commodity hardware, allowing for almost unlimited growth.
	* High Performance. NoSQL databases are built for great performance, measured in terms of both throughput and latency.

3. Express - web framework for Handling HTTP requests and routing

	* In Node.js, the built-in http module is very low-level - creating a complex web application is very time-consuming. This is the reason why we usually pick a framework to work with for our projects.
	* Express JS is a great choice for applications that handle a lot of requests and notifications from users.

4. socket.io - enables real-time bidirectional event-based communication

	* One of the task requirements is that the Calls to server should be hidden from network overview. While I'm still looking for a way to accomplish this, the best I can do is hide sequential calls to server with having only one, always active connection to the server, with the technology of web sockets.

