#  How to Run the Project Locally

  

1.  Clone the repository.	
	>  git clone <https://github.com/muhammed-elsherif/property-matching-system>
2.  Install dependencies using 
	>`npm install`.

3.  Set up a MongoDB database.

	-  Install MongoDB: Follow the [official MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/) for your operating system.
	
	-  Start MongoDB: Run mongod to start the MongoDB server.
	
	-  Create a database: Use the MongoDB shell or a GUI tool like MongoDB Compass to create a new database for the project.
	
	4.  Run the application using `npm run start`.

5.  Run tests:

	-  Ensure that line 22 in `src/index.js is` commented out to prevent the application from starting before running tests.
	
	-  Run tests: Execute npm test to run the test suite.
	
	-  Interpret results: Review the test results to ensure that all tests pass successfully.

6.  Include a sample MongoDB backup file:
	-  Ensure that line 18 in `src/index.js is` not commented to load user samples.


  
  

#  Assumptions and Decisions:

  

-  Users are authenticated via JWT tokens.

-  Passwords are hashed using bcrypt.

-  Performance considerations include efficient matching logic and pagination.
