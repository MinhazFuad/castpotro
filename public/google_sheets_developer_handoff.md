# Google Sheets Integration - Developer Handoff

This document provides all the necessary information for the next developer to successfully implement the Google Sheets integration for the Castpotro Aptitude Test.

## 1. Data Structure

When a candidate completes a test, the frontend sends a `POST` request to `/api/submit-test`. 

The JSON payload sent to the backend looks exactly like this:
```json
{
  "candidateInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Marketing"
  },
  "totalPercentage": 85,
  "domainScores": {
    "Numerical": 3,
    "Verbal": 2,
    "Logical": 3,
    "Spatial": 2,
    "Emotional Intelligence": 3
  },
  "dominantTrait": "Action-Oriented",
  "answers": {
    "n1": 0,
    "n2": 0,
    "v1": 1
    // ... complete map of question IDs to selected option index
  },
  "total": 20
}
```

## 2. Google Cloud Setup

To allow the Next.js server to write to a Google Sheet without user interaction, you must use a **Google Service Account**.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Sheets API**.
3. Go to **Credentials** -> **Create Credentials** -> **Service Account**.
4. Create the account and generate a **JSON Key**.
5. Open the downloaded JSON file. You will need the `client_email` and the `private_key`.

## 3. Google Sheet Setup

1. Create a new Google Sheet (or upload the provided `Castpotro_Data_Template.csv`).
2. Ensure the first row contains the following headers exactly:
   `Date` | `Name` | `Email` | `Department` | `Total Score (%)` | `Numerical` | `Verbal` | `Logical` | `Spatial` | `Emotional Intelligence` | `Personality Trait`
3. Click **Share** in the top right of the Google Sheet.
4. Paste the Service Account's `client_email` into the share box and grant it **Editor** access.
5. Extract the **Google Sheet ID** from the URL (e.g., `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`).

## 4. Implementation Code

1. Install the official library: `npm install google-spreadsheet google-auth-library`
2. Add the following environment variables to your `.env` file (or Vercel):
```env
GOOGLE_SHEET_ID="your_sheet_id_here"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your_service_account_email"
GOOGLE_PRIVATE_KEY="your_private_key_with_actual_newlines"
```
3. Update `src/app/api/submit-test/route.ts` with the following implementation:

```typescript
import { NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY && GOOGLE_SHEET_ID) {
      try {
        // Authenticate with Google
        const serviceAccountAuth = new JWT({
          email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Load the document
        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo(); 
        const sheet = doc.sheetsByIndex[0];
        
        // Append the row mapping directly to the CSV headers
        await sheet.addRow({
          'Date': new Date().toLocaleString(),
          'Name': data.candidateInfo.name,
          'Email': data.candidateInfo.email,
          'Department': data.candidateInfo.department,
          'Total Score (%)': data.totalPercentage,
          'Numerical': data.domainScores.Numerical || 0,
          'Verbal': data.domainScores.Verbal || 0,
          'Logical': data.domainScores.Logical || 0,
          'Spatial': data.domainScores.Spatial || 0,
          'Emotional Intelligence': data.domainScores['Emotional Intelligence'] || 0,
          'Personality Trait': data.dominantTrait
        });
        
        console.log('Successfully saved to Google Sheets!');
      } catch (sheetError) {
        console.error('Failed to save to Google Sheets:', sheetError);
      }
    } else {
      console.warn('Google Sheets credentials missing. Logging locally only.');
      console.log('Candidate:', data.candidateInfo.name, '| Score:', data.totalPercentage);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```
