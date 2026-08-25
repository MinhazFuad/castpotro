import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const formData = await request.formData();
    const audioFile = formData.get('file') as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    if (apiKey) {
      // Connect to Hugging Face Whisper API
      try {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/openai/whisper-large-v3',
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/octet-stream'
            },
            method: 'POST',
            body: audioFile,
          }
        );

        if (response.ok) {
          const result = await response.json();
          return NextResponse.json({ text: result.text || '' });
        }
      } catch (hfErr) {
        console.warn('Hugging Face transcription fallback triggered:', hfErr);
      }
    }

    return NextResponse.json({
      text: "Audio sample received. (Client-side Speech Recognition is active as primary transcriber)."
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
