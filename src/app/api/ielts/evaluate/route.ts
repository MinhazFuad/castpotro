import { NextResponse } from 'next/server';

interface EvaluationPayload {
  module?: 'speaking' | 'writing';
  type?: 'speaking' | 'writing';
  taskType?: string;
  transcript?: string;
  responses?: Record<string, string>;
  speakingTimeSeconds?: number;
  wordCount?: number;
  content?: string;
  candidateName?: string;
}

export async function POST(request: Request) {
  try {
    const body: EvaluationPayload = await request.json();
    
    // Extract full text from either content, transcript, or responses dictionary
    let text = (body.content || body.transcript || '').trim();
    if (!text && body.responses) {
      text = Object.values(body.responses).join(' ').trim();
    }

    const wordList = text.split(/\s+/).filter(w => w.length > 0);
    const totalWords = wordList.length;

    // Advanced Academic & Coherence markers
    const academicWords = [
      'furthermore', 'moreover', 'consequently', 'therefore', 'nevertheless',
      'specifically', 'significant', 'demonstrate', 'perspective', 'fundamental',
      'substantial', 'transformative', 'pedagogical', 'acquisition', 'inherent',
      'predominantly', 'crucial', 'imperative', 'nuanced', 'resilience',
      'milestone', 'perseverance', 'accomplishment', 'effectively', 'subsequently'
    ];

    const lowerText = text.toLowerCase();
    let academicHits = 0;
    academicWords.forEach(word => {
      if (lowerText.includes(word)) academicHits++;
    });

    const uniqueWords = new Set(wordList.map(w => w.toLowerCase())).size;
    const lexicalDiversity = totalWords > 0 ? (uniqueWords / totalWords) : 0;

    const moduleType = body.module || body.type || 'speaking';

    let overallBand = 6.5;
    let feedback = '';
    let fluency = 6.5;
    let lexical = 6.5;
    let grammar = 6.0;
    let pronunciation = 6.5;

    if (moduleType === 'speaking') {
      if (totalWords < 20) {
        fluency = 4.5;
        lexical = 4.5;
        grammar = 5.0;
        pronunciation = 5.0;
        overallBand = 4.5;
        feedback = "Your spoken responses were brief. Practice extending your ideas with concrete examples, personal experiences, and descriptive adjectives.";
      } else if (totalWords < 60) {
        fluency = 5.5;
        lexical = 5.5;
        grammar = 5.5;
        pronunciation = 6.0;
        overallBand = 5.5;
        feedback = "Good foundation! You conveyed your ideas clearly. To reach higher bands, use more transition connectors (e.g. 'on the other hand', 'specifically') and richer vocabulary.";
      } else if (totalWords < 160) {
        fluency = 6.5 + (academicHits >= 1 ? 0.5 : 0);
        lexical = 6.5 + (lexicalDiversity > 0.55 ? 0.5 : 0);
        grammar = 6.5;
        pronunciation = 7.0;
        overallBand = Math.min(8.0, (fluency + lexical + grammar + pronunciation) / 4);
        feedback = "Solid performance! You demonstrated steady conversational fluency, clear structure, and good topic coverage. Integrating more idiomatic expressions will push you to Band 8.0+.";
      } else {
        fluency = 7.5;
        lexical = 7.5;
        grammar = 7.0 + (academicHits >= 3 ? 0.5 : 0);
        pronunciation = 7.5;
        overallBand = 7.5 + (academicHits >= 3 ? 0.5 : 0);
        overallBand = Math.min(8.5, overallBand);
        feedback = "Outstanding response! You demonstrated natural pacing, extensive vocabulary range, and coherent elaboration across all prompt questions.";
      }
    } else {
      // Writing module
      const minRequired = body.taskType === 'Task 2' ? 250 : 150;
      if (totalWords < minRequired * 0.6) {
        overallBand = 5.0;
        fluency = 5.0;
        lexical = 5.0;
        grammar = 5.0;
        feedback = `Under length penalty: You wrote ${totalWords} words (minimum required: ${minRequired}). Elaborate more on each paragraph point.`;
      } else if (totalWords < minRequired) {
        overallBand = 6.0;
        fluency = 6.0;
        lexical = 6.0;
        grammar = 6.0;
        feedback = `You are close to the target word count (${totalWords}/${minRequired} words). Develop your supporting arguments with additional evidence.`;
      } else {
        overallBand = 7.5;
        fluency = 7.5;
        lexical = 7.5;
        grammar = 7.0;
        feedback = "Well structured essay with clear paragraphing, coherent transitions, and good lexical resource. Continue practicing complex sentence structures.";
      }
    }

    const roundedBand = Number((Math.round(overallBand * 2) / 2).toFixed(1));

    return NextResponse.json({
      success: true,
      band: roundedBand,
      overallBand: roundedBand,
      fluencyCoherence: Number(fluency.toFixed(1)),
      lexicalResource: Number(lexical.toFixed(1)),
      grammaticalRange: Number(grammar.toFixed(1)),
      pronunciation: Number(pronunciation.toFixed(1)),
      subScores: {
        'Fluency & Coherence': Number(fluency.toFixed(1)),
        'Lexical Resource': Number(lexical.toFixed(1)),
        'Grammatical Range': Number(grammar.toFixed(1)),
        'Pronunciation & Pace': Number(pronunciation.toFixed(1))
      },
      wordCount: totalWords,
      lexicalDiversity: `${Math.round(lexicalDiversity * 100)}%`,
      academicKeywordsUsed: academicHits,
      feedback
    });
  } catch (err: any) {
    console.error('IELTS evaluation error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
