Author: Hunter J. Blakely

Date: Fri, May 19, 2023

----------------------------------------------------------------

Following along with the below tutorial, taking notes, and recreating demo-project.

Docker Tutorial: https://www.youtube.com/watch?v=3c-iBn73dDE&t=852s

Read the notes and watch the video if you'd like to follow along.

----------------------------------------------------------------

#CONTENTS OF THIS REPO:

`docker_notes.txt` 
Contains video-notes + code-examples. 
There may be misstyping, so double check the code and commands.


`demo_project/` 
Stores my recreation of Anna Smith's demo Docker/NodeJS project.
If you have errors when building, there may be version conflicts. 

----------------------------------------------------------------

#Dependencies 

1) node must be installed.

2) From demo_project/app run `npm install` 
   before you build the docker image.

----------------------------------------------------------------

#Test App

From demo_project dir, run:

	a) docker build -t my-app:1.0 .

	b) docker-compose -f mongo.yaml up

In browser on your local machine open tabs for the following addresses:

	a) localhost:3000

		- This is the NodeJS application

	b) localhost:8080

		- This is mongo-express

