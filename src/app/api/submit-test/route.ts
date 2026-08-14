import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log('--- CANDIDATE TEST SUBMISSION ---');
    console.log('Candidate Info:', data.candidateInfo);
    console.log(`Total Score: ${typeof data.totalPercentage === 'number' ? data.totalPercentage.toFixed(0) : data.totalPercentage}%`);
    console.log('Domain Scores:', data.domainScores);
    console.log('Dominant Trait:', data.dominantTrait);
    console.log('---------------------------------');

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    const payload = {
      ...data,
      submittedAt: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    };

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          redirect: 'follow',
        });

        if (response.ok) {
          console.log('[Google Sheet] Successfully forwarded submission to Google Sheet.');
        } else {
          console.warn(`[Google Sheet] Webhook responded with status: ${response.status}`);
        }
      } catch (webhookError) {
        console.error('[Google Sheet Error] Failed to send to Google Sheet webhook:', webhookError);
      }
    } else {
      console.warn('[Google Sheet] GOOGLE_SHEET_WEBHOOK_URL is not configured in .env.local. Logged to console only.');
    }

    return NextResponse.json({ success: true, message: 'Test submitted successfully' });
  } catch (error) {
    console.error('Error processing test submission:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
