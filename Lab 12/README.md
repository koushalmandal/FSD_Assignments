# Campus Return — Lost & Found

Phase 2 of the Campus Lost & Found Management System assignment. The app uses Express, EJS, MongoDB, and Mongoose to manage student profiles, lost/found reports, and claims.

## Run locally

1. Install Node.js (18 or newer) and MongoDB Community Server, or use a MongoDB Atlas connection string.
2. From this project directory, install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string. Set `PORT` if you want a different port. If Node's Atlas SRV lookup fails but PowerShell `Resolve-DnsName` works, set `MONGODB_DNS_SERVERS` to the DNS server address shown under the active adapter in `ipconfig /all`.
4. Start MongoDB if using a local database, then run:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000`.

For development with automatic restarts, run `npm run dev`.

### Atlas DNS troubleshooting

If Windows `Resolve-DnsName` can resolve the Atlas SRV record but Node reports `querySrv ECONNREFUSED`, set `MONGODB_DNS_SERVERS` in your private `.env` to the DNS server under the active adapter in `ipconfig /all`. The app applies this optional override before connecting. If DNS then resolves but Mongoose reports that it cannot connect to any cluster servers, check the Atlas project's **Network Access** IP access list and allow your current public IP.

## Foundation included

- Create student profiles with unique email addresses and view them at `/students/:id`.
- Create, list, search, and view lost-item reports.
- Create, list, and view found-item reports.
- Render all students and item reports from MongoDB, including empty states.
- Validate required fields, email/contact formats, future dates, duplicate email addresses, student references, malformed IDs, and missing records.
- Show friendly 400, 404, and 500 error pages.

Phase 2 includes session-selected student identity, claims, owner-only review, duplicate prevention, and the claim-to-return workflow.

## Data relationships

- A `Student` has a MongoDB-generated `_id`; the student's name is ordinary profile data, never the database identifier.
- `LostItem.reportedBy` and `FoundItem.reportedBy` are required Mongoose ObjectId references to `Student`.
- `Claim.foundItemId` and `Claim.claimedBy` reference `FoundItem` and `Student`; a unique compound index prevents one student from claiming the same found item twice.
- One student can therefore be connected to many lost and found reports. Detail pages populate the reference to show the reporter's profile information.
- Email is normalized to lowercase and has a unique MongoDB index to prevent duplicate student profiles.

## Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Home page with MongoDB counts and recent reports |
| GET | `/students/new` | Student profile form |
| POST | `/students` | Validate and create a student profile |
| POST | `/session` | Select an existing student profile for the classroom demo |
| POST | `/logout` | Clear the current student profile session |
| GET | `/students/:id` | Student profile and that student's reports |
| GET | `/lost-items` | Dynamic lost-item list; optional `?q=` search by name, category, or location |
| GET | `/lost-items/new` | Lost-item report form |
| POST | `/lost-items` | Validate and create a lost-item report |
| GET | `/lost-items/:id` | Lost-item details |
| GET | `/found-items` | Dynamic found-item list, including an empty state |
| GET | `/found-items/new` | Found-item report form |
| POST | `/found-items` | Validate and create a found-item report |
| GET | `/found-items/:id` | Found-item details |
| POST | `/found-items/:id/claims` | Submit a pending claim |
| PATCH | `/claims/:id/status` | Reporter approves or rejects a pending claim |

HTML forms use standard `application/x-www-form-urlencoded` POST requests. Express parses each form body, validates fields and relationships on the server, saves through Mongoose, then redirects to the record detail page. `method-override` lets the review forms submit POST requests that Express handles as PATCH.

## Phase 2 demonstration outline

1. Create profile A and report a found item.
2. Create profile B or switch to B, submit a claim, and confirm it starts Pending.
3. As B, try to approve the claim and confirm the server returns 403.
4. Switch to A and approve the claim; confirm its status changes to Approved and the item becomes Returned.
5. Switch to another profile and confirm the Returned item rejects another claim. Try a duplicate claim, a short reason, invalid IDs, and missing records.

Run the database-backed checks with `npm run test:phase2`. The script creates uniquely named temporary records, exercises the claim rules, and removes its records during cleanup.

Last run: 17 of 17 Phase 2 smoke checks passed against the configured MongoDB database.

## Project structure

```text
index.js
models/Student.js
models/LostItem.js
models/FoundItem.js
models/Claim.js
views/                  EJS pages and shared partials
public/styles.css
public/phase2.css
scripts/phase2-smoke.js
.env.example
```


## Phase 2 claim rules

- A claim references an existing found item and student; new claims start Pending.
- A unique compound index on found item and claimant prevents duplicate claims.
- Only the item reporter in the server-side session can approve or reject a pending claim.
- Approval conditionally changes an Available item to Returned; remaining pending claims are rejected. Returned items reject new claims.
- HTML forms send POST requests; method-override maps review forms to PATCH /claims/:id/status.
- Demo identity switching selects an existing student profile. Use verified campus sign-in before deployment; the profile picker is not production authentication.

Phase 2 routes: POST /session, POST /logout, POST /found-items/:id/claims, and PATCH /claims/:id/status.
