import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { ReleaseInput } from '@/types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const AUDIENCE_GUIDE = {
  endUser: {
    name: 'End Users (finance managers, accountants, non-technical)',
    tone: 'Friendly, benefit-focused, zero jargon. Lead with what changed for them and why it matters. Never mention API, webhooks, or technical implementation. Focus on time saved, errors avoided, and new capabilities.',
    titlePrefix: "What's new in",
  },
  technical: {
    name: 'Technical / Engineering teams integrating via API',
    tone: 'Precise, detailed, developer-focused. Include breaking changes prominently, deprecation timelines, migration steps, new endpoints, schema changes. Use technical terminology accurately.',
    titlePrefix: 'Technical changelog —',
  },
  executive: {
    name: 'Executives and business stakeholders',
    tone: 'Strategic, outcome-focused, concise. Frame every change as business impact: revenue, cost, risk reduction, or competitive advantage. Avoid technical and operational details. Max 150 words total.',
    titlePrefix: 'Release summary —',
  },
};

async function generateForAudience(input: ReleaseInput, audience: keyof typeof AUDIENCE_GUIDE) {
  const guide = AUDIENCE_GUIDE[audience];
  const prompt = `You are writing release notes for: ${guide.name}

Tone: ${guide.tone}

Product: ${input.productName} ${input.version} — ${input.releaseDate}
${input.context ? `Context: ${input.context}` : ''}

Changes shipped:
${input.changes}

Return ONLY valid JSON, no markdown:
{
  "title": "${guide.titlePrefix} ${input.productName} ${input.version}",
  "intro": "One sentence framing the release for this audience.",
  "sections": [
    {
      "heading": "Section name (2-4 sections total)",
      "items": ["Bullet item 1", "Bullet item 2"]
    }
  ],
  "closing": "Optional closing sentence (omit for executive)"
}`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    max_tokens: 800,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = completion.choices[0].message.content ?? '{}';
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}

export async function POST(req: NextRequest) {
  const input: ReleaseInput = await req.json();
  try {
    const [endUser, technical, executive] = await Promise.all([
      generateForAudience(input, 'endUser'),
      generateForAudience(input, 'technical'),
      generateForAudience(input, 'executive'),
    ]);
    return NextResponse.json({ endUser, technical, executive });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate notes' }, { status: 500 });
  }
}
