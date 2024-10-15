# **RESTful Routes Assignment - Detailed Analysis**

---

## **Assignment Overview**

This assignment required the creation of a RESTful API using **ExpressJS** and **MongoDB**. The API manages a list of contacts, providing full **CRUD** functionality (Create, Read, Update, Delete) along with additional features such as **pagination**, **sorting**, and **filtering**.

The API’s features are tested using an automated test suite, and this document captures the current state of the API, the tests, troubleshooting, and ongoing issues.

---

## **Current Status**

The API is now in a **partially functional** state. Significant progress has been made based on the errors identified through the automated tests. However, several issues remain, particularly regarding schema validation, pagination, and CRUD operation testing. Below is a detailed breakdown of the test outcomes, troubleshooting, and pending issues.

---

## **Test Breakdown**

### **1. Server and Basic JSON Structure**

- **Test Results:**
  - ✅ **Server is reachable on port 8080**
  - ✅ **API resource `/v1/contacts` exists and returns a 2xx status**
  - ✅ **API returns a valid JSON response**
  - ✅ **Contacts resource returns an array of objects**
  - ✅ **At least one contact is returned**

- **Troubleshooting Efforts:**
  - **No issues encountered** in this area. The basic structure of the API, including the server and routes, is functioning properly.

---

### **2. Schema Validation**

- **Test Result:**
  - ❌ **Returned contacts do not use the proper schema fields** (`id`, `fname`, `lname`, `email`, `phone`, `birthday`)

- **Error Output:**
  ```bash
  InvalidContactSchemaError: One or more contacts returned in your contacts API resource did not contain a valid contact schema.

	•	Actions Taken:
	•	Mongoose Virtuals for id: To address MongoDB’s usage of _id and the test suite’s expectation of id, I implemented a virtual id field using Mongoose’s schema virtuals.
	•	Manual Validation: I verified the fields in Postman, and the output appeared to follow the expected schema.
	•	Ongoing Issues:
	•	The test suite continues to fail despite the correct virtual id being in place. The issue may stem from how the test suite validates the schema against MongoDB’s _id.

3. Pagination

	•	Test Results:
	•	❌ Pagination does not work with default parameters
	•	❌ Pagination does not work without default parameters
	•	Error Output:

TypeError: PaginationResultCountError is not a constructor


	•	Actions Taken:
	•	Helper Implementation: The paginateContacts function was created to handle pagination logic, defaulting to 10 contacts per page.
	•	Manual Testing: Verified that pagination works in Postman with both default and custom parameters.
	•	Ongoing Issues:
	•	The test suite fails, possibly due to the presence of fewer than 10 contacts in the database, causing it to not meet the expected result count. The issue with PaginationResultCountError is handled, but the test remains unresolved.

4. Sorting

	•	Test Result:
	•	❌ Sorting by lname (ascending and descending) fails
	•	Error Output:

Expected id: 35, but received id: "67096dd4d9e4df87a18dba19".


	•	Actions Taken:
	•	Sorting Logic Implementation: Sorting logic was implemented in the sortContacts function, which handles sorting by lname or fname.
	•	ID Handling Check: MongoDB’s ObjectIDs are string-based, while the test suite expects numeric IDs.
	•	Ongoing Issues:
	•	The discrepancy between the test suite’s hardcoded numeric IDs and MongoDB string-based ObjectIDs continues to cause test failures, even though sorting functions correctly in manual tests.

5. Filtering

	•	Test Result:
	•	❌ Filtering with default parameters fails
	•	Error Output:

AxiosError: Request failed with status code 500.


	•	Actions Taken:
	•	Filter Logic: The filtering was implemented using query parameters to filter by fields like lname and birthday.
	•	Manual Testing: Filtering was verified in Postman, where it returned the correct results based on the query parameters.
	•	Ongoing Issues:
	•	The test suite fails with a 500 error, indicating that the headers or parameters may not be passed or processed correctly within the test environment.

6. CRUD Operations

	•	Test Results:
	•	❌ Create a new contact fails
	•	❌ Show a specific contact by its identifier fails
	•	❌ Update a specific contact by its identifier fails
	•	Error Output:

AxiosError: Request failed with status code 500.


	•	Actions Taken:
	•	Manual CRUD Operation Tests: Verified that all CRUD operations work in Postman, including creating, reading, updating, and deleting contacts.
	•	ID Validation: Added mongoose.Types.ObjectId.isValid(id) checks to ensure that only valid MongoDB ObjectIDs are passed to these operations.
	•	Enhanced Error Handling: Improved error messages and handling, including 400 responses for invalid IDs.
	•	Ongoing Issues:
	•	While CRUD operations pass manually, the test suite fails due to 500 errors and mismatched status codes (expected 303, but receiving 500).

Summary of Persistent Issues

1. Schema Validation

	•	Despite using virtuals to map MongoDB’s _id to id, the test suite continues to fail in validating the schema, possibly due to stricter field checks.

2. Pagination, Sorting, and Filtering

	•	Pagination, Sorting, and Filtering work correctly in manual tests but fail in the automated test suite due to discrepancies in how IDs and parameters are handled.

3. CRUD Operations

	•	While CRUD operations pass in manual tests, the test suite reports 500 errors and status code mismatches.

Next Steps

1. Investigate MongoDB ID Handling

	•	Explore the discrepancy between MongoDB-generated string IDs and the numeric IDs expected by the test suite.

2. Examine Test Environment Filtering

	•	Investigate further why filtering parameters do not function as expected within the test suite, despite working manually.

3. Review Pagination Logic

	•	Check if there are any edge cases in the pagination logic that could be causing issues in the automated tests.

4. Resolve CRUD Operation Status Code Mismatches

	•	Adjust the API’s status codes for CRUD operations to match the test suite’s expectations, particularly the mismatch between 303 and 500.

Final Thoughts

While the API functions correctly in manual tests, several issues remain within the automated testing environment, particularly around MongoDB ID handling, pagination, and CRUD operations. Aligning the API’s responses and status codes with the test suite’s expectations and further investigating ID formatting issues should help resolve the remaining test failures.


<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="https://www.youtube.com/embed/tZKMrdAhc6Y" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>