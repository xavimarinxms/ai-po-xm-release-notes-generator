export type Audience = 'endUser' | 'technical' | 'executive';

export interface ReleaseInput {
  productName: string;
  version: string;
  releaseDate: string;
  changes: string; // free-form list of features/fixes
  context?: string; // optional: target audience info, product context
}

export interface AudienceNotes {
  title: string;
  intro: string;
  sections: { heading: string; items: string[] }[];
  closing?: string;
}

export interface GeneratedNotes {
  endUser: AudienceNotes;
  technical: AudienceNotes;
  executive: AudienceNotes;
}
