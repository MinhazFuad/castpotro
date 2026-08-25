import { NextResponse } from 'next/server';

interface EvaluationPayload {
  module: 'speaking' | 'writing';
  taskType?: string;
  transcript?: string;
  speakingTimeSeconds?: number;
  wordCount?: number;
  content?: string;
}

export async function POST(request: Request) {
  try {
    const body: EvaluationPayload = await request.json();
    const text = (body.content || body.transcript || '').trim();
    const wordList = text.split(/\s+/).filter(w => w.length > 0);
    const totalWords = wordList.length;

    // Advanced Academic & Coherence markers
    const academicWords = [
      'furthermore', 'moreover', 'consequently', 'therefore', 'nevertheless',
      'specifically', 'significant', 'demonstrate', 'perspective', 'fundamental',
      'substantial', 'transformative', 'pedagogical', 'acquisition', 'inherent',
      'predominantly', 'crucial', 'imperative', 'nuanced', 'resilience'
    ];

    const lowerText = text.toLowerCase();
    let academicHits = 0;
    academicWords.forEach(word => {
      if (lowerText.includes(word)) academicHits++;
    });

    const uniqueWords = new Set(wordList.map(w => w.toLowerCase())).size;
    const lexicalDiversity = totalWords > 0 ? (uniqueWords / totalWords) : 0;

    let overallBand = 6.0;
    let feedback = '';
    let subScores: Record<string, number> = {};

    if (body.module === 'speaking') {
      // Speaking evaluation
      let fluency = 6.0;
      let lexical = 6.0;
      let grammar = 6.0;
      let pronunciation = 6.5;

      if (totalWords < 25) {
        fluency = 4.5;
        lexical = 4.5;
        grammar = 5.0;
        overallBand = 4.5;
        feedback = "Your spoken response was very brief. Aim to expand with concrete examples, personal anecdotes, and detailed explanations.";
      } else if (totalWords < 60) {
        fluency = 5.5;
        lexical = 5.5;
        grammar = 5.5;
        overallBand = 5.5;
        feedback = "Good start! You expressed basic points, but try incorporating more connective phrases (e.g. 'on the other hand', 'specifically') and richer vocabulary.";
      } else if (totalWords < 140) {
        fluency = 6.5 + (academicHits > 1 ? 0.5 : 0);
        lexical = 6.5 + (lexicalDiversity > 0.6 ? 0.5 : 0);
        grammar = 6.5;
        overallBand = Math.min(8.0, (fluency + lexical + grammar + pronunciation) / 4);
        feedback = "Solid performance! You spoke with sustained fluency and clear logical structure. To reach Band 8.0+, use more idiomatic phrases and varied sentence structures.";
      } else {
        fluency = 7.5;
        lexical = 7.5;
        grammar = 7.5;
        pronunciation = 7.5;
        overallBand = 7.5 + (academicHits >= 3 ? 0.5 : 0);
        overallBand = Math.min(8.5, overallBand);
        feedback = "Outstanding response! You demonstrated natural pacing, extensive vocabulary range, and coherent elaboration across all prompt questions.";
      }

      subScores = {
        'Fluency & Coherence': Number(fluency.toFixed(1)),
        'Lexical Resource': Number(lexical.toFixed(1)),
        'Grammatical Range': Number(grammar.toFixed(1)),
        'Pronunciation & Pace': Number(pronunciation.toFixed(1))
      };
    } else {
      // Writing evaluation
      const minRequired = body.taskType === 'Task 2' ? 250 : 150;
      let taskResponse = 6.0;
      let coherence = 6.0;
      let lexical = 6.0;
      let grammar = 6.0;

      if (totalWords < minRequired * 0.6) {
        taskResponse = 4.5;
        coherence = 5.0;
        overallBand = 5.0;
        feedback = `Under length penalty: You wrote ${totalWords} words (minimum required: ${minRequired}). Elaborate more on each paragraph point.`;
      } else if (totalWords < minRequired) {
        taskResponse = 5.5;
        coherence = 6.0;
        lexical = 6.0;
        grammar = 6.0;
        overallBand = 6.0;
        feedback = `You are close to the target word count (${totalWords}/${minRequired} words). Develop your supporting arguments with additional evidence.`;
      } else {
        taskResponse = 7.0 + (totalWords >= minRequired + 30 ? 0.5 : 0);
        coherence = 6.5 + (academicHits >= 3 ? 0.5 : 0);
        lexical = 6.5 + (lexicalDiversity > 0.55 ? 0.5 : 0);
        grammar = 7.0;
        overallBand = Math.min(8.5, (taskResponse + coherence + lexical + grammar) / 4);
        feedback = "Well structured essay with clear paragraphing, coherent transitions, and good lexical resource. Continue practicing complex sentence structures.";
      }

      subScores = {
        'Task Response': Number(taskResponse.toFixed(1)),
        'Coherence & Cohesion': Number(coherence.toFixed(1)),
        'Lexical Resource': Number(lexical.toFixed(1)),
        'Grammatical Accuracy': Number(grammar.toFixed(1))
      };
    }

    return NextResponse.json({
      success: true,
      overallBand: Number(overallBand.toFixed(1)),
      subScores,
      wordCount: totalWords,
      lexicalDiversity: Number((lexicalDiversity * 100).toFixed(0)),
      academicKeywordsUsed: academicHits,
      feedback
    });
  } catch (err: any) {
    console.error('IELTS evaluation error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
