Docker https://www.youtube.com/watch?v=3c-iBn73dDE&t=852s
---------------------------------------------------------------------------------

WHAT IS A CONTAINER?

Install Docker on system. 
Same command to download and run docker containers.

##############################
Pre-Docker Dev Cycle:
Dev (Jar + env + db) -> Operations Team (set up environment) 
Config on server Needed. Textual guide of dev.
Prbolems: dependency conflicts and misunderstandings of instructions.
##############################

##############################
POST Docker Dev Cycle:
Dev + Ops work together to package app in a container (Config+jar + dependencies)
No env config needed on server - just install docker runtime (one time effort).
##############################

##############################
What is a container?
Layer of images - mostly Linux Based because small size. (alpine:3.1).
Application on top of base. Config images in between base and app. 
##############################


dockerhub for public image repo.



COMMANDS:

docker run image_name(:version)?
docker ps


########################### IN TERMINAL ##############################
# Downloads postgres version 9.6 if not already downloaded, thens starts.
docker run postgres:9.6 
# List running container processes - will show postgres 9.6
docker ps
# Downloads postgres version 10.10 if not already downloaded, then starts.
docker run postgres:10.10
# List running container processes - will show postgres 9.6 and 10.10
docker ps
########################### IN TERMINAL ##############################


Two containers of different versions can run simultaneously without conflict.

Image != Container

Image is the packaged environment + program.
Container is a running image. 



-------------------------------------------------------------------------------

Difference Between Docker and VM

OS has two layers: 
	Layer 2) Application
^	Layer 1) OS Kernal
|	(Hardware)
---------------------------

Docker has Application Layer
VM has Application layer and OS Kernal

Docker is Smaller than VM
Docker is Faster than VM

VM can run any OS on top of any OS
Docker can't. 

Docker Toolbox abstracts Kernal to be able to run different docker images. 

---------------------------------------------------------------------------------

INSTALL DOCKER:

Differs based on OS, and Version of OS. 

Docker Toolbox: FOR OLDER MAC AND WINDOWS.

CE (community edition) and EE (enterprise edition).

Start with CE - just fine. 

PREREQUISITES:
Mac+Windows: OS and Hardware criterea
Mac - check to see if versions supports docker
Windows - natively runs on Windows 10+
If computer doesn't meet requirements, download Docker Toolbox to bridge OS and Docker.


##################Install For Mac################
Included In Install
	- Docker Engine
	- Docker CLI client
	- Docker Compose
	- Docker Machine
	- Kitematic

Download Stable Version.
Click DMG, Drag .app to Applications.
Start Docker from Applications.
Docker will be shown near powerbar - check status by clicking. 
Can stop or quit from button.
Problems if running docker on multiple accounts on mac. 
	- Quit before switching.
#################################################


###############Install for Windows##############
1) Check "before you install" section on dockerhub to ensure compatible.
2) Make sure virtualization is enabled
	- task manager, click CPU tab, check status of Virtualization.
Download windows from stable channel
Follow instilation wizard
Search/run docker (it doesn't start automatically after install)
#################################################


###############Install for Linux################
Different Distributions of Linux have different install steps.
Different Versions of the same Distribution of Linux have different install steps. 

General Steps for Linux:
Look up requirements for distribution/version.
1st Option - set up repository and download from repo.
	* 2 main steps
		- Set up Stable repository
		- Install using command line commands
2nd Option - install manually (Not Recommended - lots of steps and is complicated)
3rd Option - just for testing (Not Recommended) - download and run automated scripts.
(Do first option)
#################################################


####################Docker Toolbox################
MAC:
Install correct package for Mac
Should See Docker Quickstart Terminal a.fter installing

WINDOWS:
Check Windows allows Virtualization - must be enabled.
Google how to find virtualization status for your windows version.
Must be x64 OS.

ToolBox releases, download .exe
go through install wizard
look for Docker QuickStart to verify

docker run hello world to verify
#################################################

-----------------------------------------------------------------------------------

OVERVIEW & BASIC COMMANDS: 

######################################
Difference between Container + Image


Version and Tag



Docker Basic Commands:

docker pull
docker run
docker start
docker stop
docker ps
docker exec -it
docker logs
docker images
######################################




Container is Running Environment for Image.
	* File System (Virtual FileSystem - not the same as host file system)
	* ENV variables/configs
	* Application Image (postgres, redis, mongo...)
	* Port Binded: talk to application running inside container (port 5000)



See Difference Between Image and Container in action:
dockerhub -> has images

IN TERMINAL:
# download latest redis image
pull redis

# view locally stored images
docker images

#SO FAR we've only worked with images...
#To run redis, must create a container that connects to the redis application.

# start redis container in attatched mode
docker run redis

# view running containers in another terminal window
docker ps

#In redis terminal window ctrl+c stops the container from running.
# start redis in detatched mode, will output id of conainer.
docker run -d redis

# restart container (app crashed or error happened in the container)
docker stop `id of container`
docker start `same id`

# show all containers running or not running (if you stopped a container)
docker ps -a

# pull image and start container at the same time:
docker run redis:4.0

# we can have latest redis version, and 4.0 version running simulatneously.
# show both running:
docker ps

# Both are running on same port. HOW!?

#############################################################

CONTAINER PORT VS HOST PORT: 

HOST          port 5000           port 3000         port 3001
				|                    |                 |
				V                    V                 V
Containers 	  port 5000           port 3000         port 3000



Will have conflicts if attempting to open same port twice on 
Host, but not with containers. 

Host maps unique port to container's port to avoid conflict.


some-app://localhost:3001 -> Host will connect to the appropriate app

##############################################################


#run two redis containers with different ports 
# docker run -p`HOST:CONTAINER`
docker run -p6000:6379 -d redis

# view what we ran
docker ps
# shows PORTS 0.0.0.0:6000->6379/tcp

# must run other container with different mapping, or will get error. 

docker run -p60001:6379 -d redis:4.0


56:37/2:46:14

--------------------------------------------------------------------------------

Debugging Containers:
docker logs
docker exec -it

##########################
What we've seen so far:

# run image(specific version) in detatched mode, bind host port to container port
docker run -d -pHOST_PORT:CONTAINER_PORT redis:4.0

# view all containers (running and not running)
docker ps -a

# view list of images
docker images
##########################


###############################
LOGS:

# show docker logs
docker logs (container_name)?

# stop container
docker stop `container_id`

# Run redis version 4.0 in detatched mode, bind host port, set custom name
docker run -d -p6001:6379 --name redis-older redis:4.0

# Run redis latest version in detatched mode, bind host port, set custom name
docker run -d -p6000:6379 --name redis-latest redis
################################


###############################
TERMINAL OF CONTAINER:
# get interactive terminal for specific container to operate within the container's OS. 
docker exec -it `container_id` /bin/bash
root@`container_id`:/data# ls
root@`container_id`:/data# pwd
/data
root@`container_id`:/data# cd /
root@`container_id`:/data# ls
bin boot data dev etc home lib lib64 media mnt opt proc root run sbin srv usr var

#exit terminal when inside of interactive terminal 
exit
###############################


###############################
RUN VS START:

docker run - start a new container
docker start is to start a stopped contatiner
###############################

--------------------------------------------------------------------------------

Workflow with Docker:
##############################
* Development
* Continuous Integeration/Delivery
* Deployment
##############################


SCENARIO: 
developing JavaScript app using MongoDB

Download MongoDB image from Docker Hub
And are developing.

Wrote first version of App, and want to test.

Submit javascript to Git repo
Triggers Jenkins Build (CI) to 
	1) Build JS App
	2) Create Docker Image with App
	3) Push docker image to private Docker repository

Development server pulls docker image from private repo
Then pulls MongoDB container from Docker Hub that your container depends on
Your container will talk with the MongoDb container.

--------------------------------------------------------------------------------


Demo Project (Developing with Containers):

JS and Nodejs application

##############################
Docker in Software Development
FrontEnd HTML5 + JS
BackEnd NodeJS
localhost:3000/my-app

Docker Container of MongoDB database
MongoExpress UI container
localhost:8081/db/my-db
##############################

1:10:08/2:46:14

# Back ENd Node JS server.js#
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('profile-picture', function (req, res){
	var img = fs.readFileSync('profile-1.jpg');
	res.writeHead(200, {'Content-Type': 'img/jpg' });
	res.end(img, 'binary');
});

app.listen(3000, function (){
	console.log("app listening on port 3000!");
});


# FRONT END index.html#
<html>
<script>
	function editProfile() {
		document.querySelector('.container').style.display = 'none'
		document.querySelector('.container-edit').style.display = 'block'

		const name = document.querySelector('#name').textContent
		document.querySelector('#input-name').value = name

		const email = document.querySelector('#email').textContent
		document.querySelector('#input-email').value = email

		const interests = document.querySelector('#interests').textContent
		document.querySelector('#input-interests').value = interests
	}

	function saveProfile() {
		document.querySelector('#name').textContent = document.querySelector('#input-name').value
		document.querySelector('#email').textContent = document.querySelector('#input-email').value
		document.querySelector('#interests').textContent = document.querySelector('#input-interests').value

		document.querySelector('.container').style.display = 'block'
		document.querySelector('.container-edit').style.display = 'none'
	}
</script>
<style>

</style>

<body> 
	<div class='container'>
		<h1 id='header'>User Profile</h1>
		<img src='profile-picture'>
		Name: <h3 id='name'>Anna Smith</h3>
		<hr />
		Email: <h3 id='email'>anna.smith@example.com</h3>
		<hr />
		<button class='button' onclick="editProfile()">Edit Profile</button>
	</div>
	<div class='container-edit'>
		<h1 id='header'>User Profile</h1>
		<img src='profile-picture'>
		Name: <input id='input-name' type='text' />
		<hr />
		Email: <input id='input-email' type='email'>
		<hr />
		Interests: <input id='input-interests' type='email'>
		<hr />
		<button class='button' onclick="saveProfile()">Save Profile</button>
	</div>
</body>
</html>

1:11:47/2:46:14

##############################


###########################
Go to hub.docker.com
find mongodb image
find mongo express

In Terminal:
docker pull mongo
docker pull mongo-express
###########################

Need to run both mongo and mongo-express and connect to app. 


############################
Docker Network:

# List docker networks
docker network ls

# create our mongo-network
docker network create mongo-network
############################

############################
Run mongo db container with config settings:

Look at docker hub info for image to get config info.
Defualt Port for mongoDB 27017


docker run -d \ 							# run in detached mode
-p27017:27017 \ 							# bind host and client ports
-e MONGO_INITDB_ROOT_USERNAME=admin \ 		# set environment variable: root username 
-e MONGO_INITDB_ROOT_PASSWORD=password \	# set environment variable: root password
--name mongodb \ 							# set container name 
--net mongo-network \ 						# set network (we had already created)
mongo 										# image to start

docker logs `container_id`					# show logs for container we just started
############################


############################
Run mongo-express with config settings:

docker run -d \									# run in detatched mode
-p 8081:8081 \									# bind host and client ports
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \ 		# set environment variable: admin username
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \	# set environment variable: admin password
--net mongo-network \							# set network (we had already created)
--name mongo-express \							# set container name
-e ME_CONFIG_MONGODB_SERVER=mongodb \			# set environment variable: server container name
mongo-express									# image to start

docker logs `container_id`						# show logs for container we just started
############################


Connect to MongoDB at localhost:8081/ in browser.
Create user-account db, with table called users with id, username, password, email 


At this point mongo db and mongo-express containers are running.
Now we want to connect our javascript application to our database. 

Demo Project (Developing with Containers):

JS and Nodejs application

##############################
Docker in Software Development
FrontEnd HTML5 + JS
BackEnd NodeJS
localhost:3000/my-app

Docker Container of MongoDB database
MongoExpress UI container
localhost:8081/db/my-db
##############################


At this point we have mongo db and mongo-express running connected with mongo-network.
We need to connect our Javascript application to our DB. Here's the updated code:


##########################################################################################
# Back ENd Node JS server.js#
var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').mongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/get-profile', function (req,res){
	var response = res;

	// username and password should not be clear text, but this is a demo.
	MongoClient.connect('mongodb://admin:password@localhost:27017', function (err, client){
		if(err) throw err;

		var db = client.db('user-account');
		var query = { userid: 1};
		db.collection('users').findOne(query, function (err,result){
			if (err) throw err;
			client.close();
			response.send(result);
		});
	});
});

app.post('/update-profile', function (req, res){
	var userObj = req.body;
	var response = res;

	console.log('connecting to the db...');

	MongoClient.connect('mongodb://admin:password@localhost:27017', function (err, client){
		if (err) throw err;

		var db = client.db('user-account');
		userObj['userid'] = 1   // is there a missing ;? 
		var query = { userid: 1};
		var newValues = { $set: userObj };

		console.log('successfully connected to the user-account db');

		db.collection('users').updateOne(query, newValues, {upsert: true}, function (err, res) {
			if (err) throw err;
			console.log('successfully updated or inserted');
			client.close();
			response.send(userObj);
		});
	});
});

app.get('profile-picture', function (req, res){
	var img = fs.readFileSync('profile-1.jpg');
	res.writeHead(200, {'Content-Type': 'img/jpg' });
	res.end(img, 'binary');
});

app.listen(3000, function (){
	console.log("app listening on port 3000!");
});


# FRONT END index.html#
<html>
<script>
	function editProfile() {
		document.querySelector('.container').style.display = 'none'
		document.querySelector('.container-edit').style.display = 'block'

		const name = document.querySelector('#name').textContent
		document.querySelector('#input-name').value = name

		const email = document.querySelector('#email').textContent
		document.querySelector('#input-email').value = email

		const interests = document.querySelector('#interests').textContent
		document.querySelector('#input-interests').value = interests
	}

	function saveProfile() {
		document.querySelector('#name').textContent = document.querySelector('#input-name').value
		document.querySelector('#email').textContent = document.querySelector('#input-email').value
		document.querySelector('#interests').textContent = document.querySelector('#input-interests').value

		document.querySelector('.container').style.display = 'block'
		document.querySelector('.container-edit').style.display = 'none'
	}
</script>
<style>

</style>

<body> 
	<div class='container'>
		<h1 id='header'>User Profile</h1>
		<img src='profile-picture'>
		Name: <h3 id='name'>Anna Smith</h3>
		<hr />
		Email: <h3 id='email'>anna.smith@example.com</h3>
		<hr />
		<button class='button' onclick="editProfile()">Edit Profile</button>
	</div>
	<div class='container-edit'>
		<h1 id='header'>User Profile</h1>
		<img src='profile-picture'>
		Name: <input id='input-name' type='text' />
		<hr />
		Email: <input id='input-email' type='email'>
		<hr />
		Interests: <input id='input-interests' type='email'>
		<hr />
		<button class='button' onclick="saveProfile()">Save Profile</button>
	</div>
</body>
</html>

1:29:20/2:46:14
##########################################################################################


Now, at localhost:3000 we can click the button on our website to update our user-account 
which will create an entry in our MongoDB.

To verify that we got an update, we can check the logs in terminal:

# view last entries to mongo db log
docker logs `mongo_db_id` | tail

or 

# follow mongo db log to prevent having to check often. 
docker logs `mongo_db_id` | tail -f



--------------------------------------------------------------------------------------------


########################### Summary ################################

SO FAR WE HAVE: 

## create docker network
docker network create mongo-network

## start mongodb
docker run -d \ 
-p 27017:27017 \
-e MONGO-INITDB_ROOT_USERNAME=admin \
-e MONGO-INITDB_ROOT_PASSWORD=password \
--net mongo-network \ 
--name mongodb \
mongodb

## start mongo-express
docker run -d \ 
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--net mongo-network \
--name mongo-express \
mongo-express

########################### Summary ################################


--------------------------------------------------------------------------------------------

Docker Compose (docker automation)

################################################################
THE FOLLOWING DOCKER RUN COMMAND IS STORED IN A DOCKER COMPOSE FILE

docker run -d \
--name mongodb \ 
-p 27017:27017 \
-e MONGO-INITDB_ROOT_USERNAME=admin \
-e MONGO-INITDB_ROOT_PASSWORD=password \
--net mongo-network \
mongo




mongo-docker-compose.yaml

version: '3'						# version is always present
services:							# services is always present
	mongodb:  						# container name
		image: mongo 				# image name
		ports:						
			-27017:27017			# port-mapping
		environment:				# set environment vars
			-MONGO..._USERNAME=admin
			...



ADD THE FOLLOWING DOCKER RUN COMMAND TO OUR ABOVE DOCKER COMPOSE FILE

docker run -d \ 
--name mongo-express \
-p 8080:8080 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \ 
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_SERVER_CONFIG_MONGODB_SERVER=mongodb \
--net mongo-network \
mongo-express


updated mongo-docker-compose.yaml

version '3'
services:
	mongodb:
		image: mongo
		...
	mongo-express:
		image: mongo-express
		ports:
			-8080:8080
		environment:
			-ME_CONFIG_MONGODB_A.....
			...


NETWORK ISN'T CONTAINED IN DOCKER-COMPOSE.
DOCKER-COMPOSE CREATES A NETWORK.

################################################################


#################
file-structure for demo-project:
folder:examples
folder:images
index.html
mongo.yaml
folder:node_modules
package-lock.json
package.json
folder:resources
server.js
###################


##################################
Here's a proper docker-compose file.
INDENTATION MATTERS!

mongo.yaml:

version: '3'
services:
	mongodb:
		image: mongo
		ports:
		 - 27017:27017
		environment:
		 - MONGO_INITDB_ROOT_USERNAME=admin
		 - MONGO_INITDB_ROOT_PASSWORD=password
	mongo-express:
		image: mongo-express:
		ports:
		 - 8080:8081
		environment:
		 - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
		 - ME_CONFIG_MONGODB_ADMINPASSWORD=password
		 - ME_CONFIG_MONGODB_SERVER=mongodb

##################################


#############################################
Here's how we user Docker Compose:

# Before we start, let's check to make sure no containers are running:
docker ps

# docker compose takes a file as an argument, and what we want to do with it. (up starts)
docker-compose -f mongo.yaml up

# Output should show creating a network "myapp_default", followed by names of containers:
# myapp_mongodb_1, and myapp_mongo-express1
# logs for both containers are output together. 

# We can configure "waiting-logic" in docker compose for containers that depend on other
# containers running - to avoid "connection-refused" errors when starting up.

#In browser, go to localhost:8080 to check our mongo-express container.
#Create user table again.

#When you restart a container, all data is lost. This is inconvenient when working with Databases.
#Volumes make it possible to add persistency between container restarts - we'll touch on this later.

#In browser go to localhost:3000 to start out JS application.
#Modify username. click button. See in logs how entry occurred in our DB.

#Now let's shut down our containers. 
# this shuts down all containers defined in the mongo.yaml file, and also turns off their network.
docker-compose -f mongo.yaml down
--------------------------------------------------------------------------------------------


SCENARIO: have created app feature, have tested, and are ready to deploy.

We must package our docker file in a docker image to be deployed.

Docker Hub (mongoDB) -> local + JS -> Git -> Jenkins (CI) package JS+image into image -> docker repo.




WHAT IS A DOCKERFILE?

JS -> docker image
Copy artifact(jar,war,bundle.js) directly in the image, and then configure it.

User Docker File blueprint for building Docker Images. 

#############################
Docker File Structure.

FROM node 						# A ready "node" image we can base our image from. 
								# node will be installed in our image.

ENV MONGO_DB_USERNAME=admin \	# It's better to set environment vars in docker compose,
 	MONGO_DB_PWD=password 		# So you can change the compose file if something goes wrong,
 								# instead of re-writing the image.

RUN mkdir -p /home/app  		# Can run any unix command with RUN and will apply in container
								# These commands don't affect host environment.

COPY . /home/app 				# Copy executes on HOST machine! Copy host files into image.
								# different from `RUN cp . /home/app`

CMD["node", "server.js"]		# CMD in every docker file, provides entrypoint linux command
								# this translates to `node server.js` inside of container.
								# This is possible because we base our image off of node image
								# that has node already installed.
#############################
  
        
Dockerfile					# this is the name of the Dockerfile - must always be "Dockerfile"                  
#############################
FROM node:13-alpine			 	# install node image, version 13-alpine.

ENV MONGO_DB_USERNAME=admin \	
 	MONGO_DB_PWD=password 

RUN mkdir -p /home/app 

COPY . /home/app

CMD["node", "server.js"]
#############################


# How to use a Docker File?
#               name:tag   location (our project directory)
docker build -t my-app:1.0 .

# See what we just did, output will show the docker image we just created with our Dockerfile
docker images

# run the container: (name:tag)
docker run my-app:1.0

# We get an error, because '/server.js' cannot be found.
# Whenever you adjust the Dockerfile you must rebuild the image!!!!!!


### Alter out docker file  ###
##############################
FROM node:13-alpine			 	

ENV MONGO_DB_USERNAME=admin \	
 	MONGO_DB_PWD=password 

RUN mkdir -p /home/app 

COPY . /home/app

CMD["node", "/home/app/server.js"] # updated location for server.js
##############################

# delete image
docker rmi `image_id`

# error: docker is used by a stopped container
# find the container that is using our image
docker ps -a | grep my-app 

# delete container using our image:
docker rm `container_id`
# docker rm `docker ps -a | grep my-app | awk '{print $1}'`

# once container is deleted,we can delete image:
docker rmi `image_id`
#docker rmi `docker images | grep my-app | awk '{print $3}'`


# check to ensure image has been deleted:
docker images
# shows that our image was deleted.

# NOW WE MUST REBUILD THE DOCKER IMAGE FROM THE MODIFIED Dockerfile
docker build -t my-app:1.0
# creates image named my-app with a tag of 1.0.

# Check to see our image was created:
docker images
# shows my-app version 1.0

# NOW LET's RUN OUR APP:
docker run my-app:1.0
# output says: app listening on port 3000! (problem is fixed).

# Check to see app is running:
docker ps

# Check logs for our app:
docker logs `container_id`

# Let's interact with the container:
docker exec -it `container_id` /bin/bash
# error, bash isn't there.
# try again with shell
docker exec -it `container_id` /bin/sh
# We get a terminal session:
bin dev etc home lib media mnt opt proc root run sbin srv sys tmp usr var
/ #

# Let's check the environment variables that we had set in in our Docker File:
env
# shows MONGO_DB_USERNAME, and MONGO_DB_PWD, and more env vars...

# Let's look at the directory we had created in our Dockerfile:
ls /home/app
# shows location.

# Let's look at the files we had copied into /home/app from our Host system via Dockerfile
ls /home/app
# shows our app file-structure
# It has dockerfile, and docker compose files in there, but we don't really need those in our image

# We want to update our file structure to have a cleaner app-image.
# Let's leave our terminal session:
exit

# In our Demo-Project folder on Host System:
# Let's create an app folder that contains everything we will use in our app, 
# instead of all the project files. 
# On Host System create app folder, move all files required to start the app:
################## NEW demo-project structure ################
app/
	images/
	index.html
	node_modules/
	package-lock.json
	package.json
	server.js
Dockerfile
examples/
mongo.yaml
resources/
################## NEW demo-project structure ################


# Let's update our Dockerfile to have a cleaner file structure

########## Updated Dockerfile ############
FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
	MONGO_DB_PWD=password 

RUN mkdir -p /home/app

COPY ./app /home/app

CMD ["node", "/home/app/server.js"]
########## Updated Dockerfile ############

# Remove the container and image, then rebuild app to reflect the new file structure:
docker rm `container_id`
docker rmi `image_id`
docker build -t my-app:1:0 .

# Now let's run the updated image:
docker run -d `image_id`

# see it running:
docker ps

# open terminal in our docker image:
docker exec -it `container_id` /bin/sh

# view file structure in our app directory.
ls /home/app
# shows images index.html node_modules package-lock.json package.json server.js
# This is how it should be.

# It's important to note that in a larger project we'd want to compress our .js into an Artifact
# and then copy the artifact into the docker image, instead of copying all the files individually.
# Since this is a small demo, we just copied all the files directrly.

# Exit our container terminal session:
exit





######## REVISED COMMANDS FOR FAST REBUILD/DEPLOY ###########
docker rm `docker ps -a | grep my-app | awk '{print $1}'`
docker rmi `docker images | grep my-app | awk '{print $3}'`
docker build -t my-app:1.0 .
docker-compose -f mongo.yaml up
#############################################################

--------------------------------------------------------------------------------------------



Private Docker Images: 

############# OVERVIEW ###############
Create Private Repository on AWS ECR  # repo is called registry
Registry Options
Build & tag an image
docker login
docker push
############# OVERVIEW ###############

AWS ECR (Elastic Container Registry)
Click Create a repository
enter repository name: my-app   (name of application)
Click Create Repository

AWS creates a docker-repository PER IMAGE. Not a repo with many repos.
Go in the repository, and what you store there are the different tags (versions) of the same image.

	# Naming in Docker Registries:      registryDomain/imageName:tag
	# docker hub allows shorthand without registry domain.
	# in Docker Hub: docker pull mongo:4.2 is translated to docker pull docker.io/library/mongo:4.2
	# in AWS ECR there is no default registryDomain, so we must use the long-hand.
	# if we were trying to `docker push my-app:1.0` docker would assume you want to push to dockerhub,
	# but it's not going to work. We want to push to AWS, so we have to tag the image
	# Tag means renaming to include domain and address and specific version


##### on local host system#######
# view images
docker images


# You ave to log into private repo on local system, or tell jenkins how to log in to repo.
# You only have to log in to docker once, and then you can pull and push as much as you want while
# you're logged in.


$(aws ecr get-login --no-include-email --region eu-central-1) # docker login provided by AWS
	# Needs AWS Cli installed
	# Credentials for AWS Cli must be configured

# Build and Tag Image:
	docker build -t my-app.
	docker tag my-app:latest 66457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:latest
	# let's see result of the above:
	docker images
	# shows my-app:1.0, and 66457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:1.0
	# those are identical, but the longer-named image is compatible with AWS ECR.
 
 # push to AWS ECR
 	docker push 66457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:1.0
 	# Pushes layers of image one by one, just like pulling images.
 	# Should see image with tag in AWS ECR
##################################


--------------------------------------------------------------------------------------------


Make some changes to the app, rebuild and push a new version to AWS repo:

Perhaps we remove console logs from our code. Perhaps we change the folder name in our repo. 
Now we want to rebuild the image to reflect those changes, and push the new version to AWS ECR.

###### rebuild new version of app ######
# build new version 
docker build -t my-app:1.1
# tag new version
docker tag my-app:1.1 66457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:1.1
# view tagged image
docker images 
# shows 6457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:1.1
# push tagged image
docker push 6457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:1.1
# Only changed layers are pushed

--------------------------------------------------------------------------------------------

ON DEV SERVER

Deploy The containerized Application:

###########OVERVIEW################
Image from private repository
deploy multiple containers
deployment server
###########OVERVIEW################


(private repo) my-app --> pull locally
								^
								|
		     (docker hub) mongodb/mongoexpress


# ON DEV SERVER NEED TO LOG IN TO AWS ECR BEFORE WE RUN DOCKER COMPOSE #
docker login

# ON DEV SERVER NEED A COPY OF THE Docker-Compose:
vim mongo.yaml
# This Docker-Compose file will be used on the server to deploy all the applications/services
######### UPDATED COMPOSE #########
mongo.yaml:

version: '3'
services:
	my-app:
		image: 6457038682.dkr.ecr.eu-central-1.amazonaws.com/my-app:1.0
		ports:
		 - 3000:3000
	mongodb:
		image: mongo
		ports:
		 - 27017:27017
		environment:
		 - MONGO_INITDB_ROOT_USERNAME=admin
		 - MONGO_INITDB_ROOT_PASSWORD=password
	mongo-express:
		image: mongo-express:
		ports:
		 - 8080:8081
		environment:
		 - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
		 - ME_CONFIG_MONGODB_ADMINPASSWORD=password
		 - ME_CONFIG_MONGODB_SERVER=mongodb
######### UPDATED COMPOSE #########
:wq

# can start all 3 containers user docker compose command
docker-compose -f mongo.yaml up
# we see app started listening on port 3000, and mongodb/express have started as well. 
# So far the database is being lost every time, so we must created a collection: users
# In Browser go to localhost:3000 to see our application 

# Change the following line to point to mongodb instead of localhost:
	MongoClient.connect('mongodb://admin:password@localhost:27017', function (err, client){
									# name of container service in docker network.
									# don't even need to use port, because mongo.yaml has info. 
	MongoClient.connect('mongodb://admin:password@mongodb', function (err, client){



####################### REVIEW #######################
We developed a JavaScript Application with Docker Containers

We built them into a docker image

We pushed into a private AWS ECR repository

Then we simulated a dev server by pulling the javascript app from our private repo,  
and mongodb/mongo-express from docker hub, using docker-compose.
####################### REVIEW #######################


---------------------------------------------------------------------------------------------


PERSISTING DATA WITH VOLUMES

#############OVERVIEW###########
When do we need Docker Volumes?
What is Docker Volumes?
3 Volume Types
Docker Volumes in docker-compose file
#############OVERVIEW###########


###########WHEN?!##############
Docker Volumes allow for persistence.
A container has a virtual file system that starts fresh every time it's restarted.
We want data in our databases to persist. When our app uses databases, Volumes are required.
###############################


###########WHAT!?###############

A directory folder in the Host File System (physical) is mounted in a folder in the container's
virtual file system.

When a container writes to it's file system, it's replicated to host's analog, and vice versa.
###############################



########3 VOLUME TYPES!##########
# use docker run to define the reference between host and container file systems.

# HOST VOLUMES (-v HOST:CONTAINER)
docker run
	-v /home/mount/data:/var/lib/mysql/data


# ANONYMOUS VOLUMES (-v CONTAINER)
docker run 
	-v /var/lib/mysql/data
# for each container a folder is generated that gets mounted on host.
# /var/lib/docker/volumes/random-hash/_data 

# Named Volumes (improvement of anonymous volumes)
docker run
	-v name:/var/lib/mysql/data
# you can reference the volume by name


# you should use named volumes in a production environment
# there are advantages of allowing docker to manage the volumes
###############################



################Docker Volumes in Docker-Compose##################
#Named Volume

mongo.yaml

version: '3'

services:

	mongodb:

		image: mongo

		ports:
		 - 27017:27017

		volumes:
		 - db-data:/var/lib/mysql/data

	mongo-express:

		image: mongo-express
		...

volumes:
	db-data


# In the above example:
#	"db-data" is the reference name of the volume, could be anything you want.
# 	"/var/lib/mysql/data" is the name of the path IN THE CONTAINER.

# Then at the end, list all the volumes that you want to mount into the containers.
# On the container level, you define to where the volume is mounted.
# You can mount a reference to the same folder on the host to different containers.
	# This is helpful when the containers need to share data 
################Docker Volumes in Docker-Compose##################


---------------------------------------------------------------------------------------------



DOCKER VOLUMES IN PRACTICE:

Simple NodeJS MongoDB application:
###################################
version: '3'
services:
	# my-app:
		# image: ${docker-registry}/my-app:1.0
		# ports:
		 # -3000:3000
	mongodb:
		image: mongo
		ports:
		 - 27017:27017
		environment:
		 - MONGO_INITDB_ROOT_USERNAME=admin
		 - MONGO_INITDB_ROOT_PASSWORD=password
	mongo-express:
		image: mongo-express
		ports:
		 - 8080:8081
		environment:
		 - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
		 - ME_CONFIG_MONGODB_ADMINPASSWORD=password
		 - ME_CONFIG_MONGODB_SERVER=mongodb
###################################
# start mongodb, mongo-express
docker-compose -f mongo.yaml up

#go to localhost:8080 in browser, create my-db, and users table 

# start application
npm run start
# app listening on port 3000!

# we're going to used named volumes in the docker-compose file to persist.

UPDATED docker-compose mongo.yaml:
###################################
version: '3'
services:
	# my-app:
		# image: ${docker-registry}/my-app:1.0
		# ports:
		 # -3000:3000
	mongodb:
		image: mongo
		ports:
		 - 27017:27017
		environment:
		 - MONGO_INITDB_ROOT_USERNAME=admin
		 - MONGO_INITDB_ROOT_PASSWORD=password
		volumes:
		 - mongo-data:/data/db      # host volume name: path in container
	mongo-express:
		image: mongo-express
		ports:
		 - 8080:8081
		environment:
		 - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
		 - ME_CONFIG_MONGODB_ADMINPASSWORD=password
		 - ME_CONFIG_MONGODB_SERVER=mongodb
volumes:
	mongo-data:						# name reference to be used in container
		driver: local 				# actual storage path created by docker
									# "local" is info for docker to create on local file system. 

# default path where mongodb stores it's data in Container is in /data/db.
# The path differs for each database!

###################################

# Now that we have defined a persistent volume in our docker-compose file, let's restart 
docker-compose -f mongo.yaml down
docker-compose -f mongo.yaml up

# go back to localhost:8080 to recreate the database/table
# go to localhost:3000 to add entry to the DB
# Now when we restart docker-compose again, the database and entry should persist. 
docker-compose -f mongo.yaml down
docker-compose -f mongo.yaml up
# go back to localhost:8080 to check entry in database.


DOCKER VOLUME LOCATIONS:
###################################
WINDOWS) 	C:\ProgramData\docker\volumes
Linux)		/var/lib/docker/volumes
Mac)		/var/lib/docker/volumes


# Each volume has it's own hash

###################################

######## ON LINUX Host System#########
# on linux you could see the contents of
ls /var/lib/docker
###########################


####### IN MAC Host System#####
# if we were to go to location we wouldn't see anything on mac
ls /var/lib/docker
# mac creates linux vm and stores all the docker data in the VM
# Instead on mac:
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
# You get terminal of the VM
# Then you can check /var/lib/docker within that vm
ls /var/lib/docker/volumes
# will see list of volumes that were created, and one that was created by docker-compose
# techworldjsdockerdemoapp_mongodb_1 <- is a named volume.
# Look in the folder to see Anonymous volumes: list of unique ID's
ls /var/lib/docker/volumes/techworldjsdockerdemoapp_mongo-data/
# exit in this VM doesn't work, so we have to click: 
Ctrl + a + k
# type 
y
# now the session will be closed.

# You can see the same data inside of the container that the volume is mapped to:
# get id of container
docker ps
# get terminal for container
docker exec -it `container_id` sh
# Now we're in container's shell
ls /data/db
# leave terminal from our container
exit
###############################





Now we know the basics of Docker. Next is Container Orchestration. 

Kubernetes is the most popular tool to automate this task.
https://www.youtube.com/watch?v=X48VuDVv0do
