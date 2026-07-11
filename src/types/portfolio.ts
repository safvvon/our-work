export interface Project {
  id: string;
  number: string; // e.g., "01", "02"
  name: string;
  category: string;
  industry: string;
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl: string;
  caseStudyUrl: string;
  mockLayoutType: 'corporate' | 'restaurant' | 'fashion' | 'gym' | 'real-estate' | 'education' | 'healthcare' | 'travel' | 'dashboard' | 'ai' | 'coffee' | 'dental' | 'construction' | 'finance' | 'interior' | 'hotel' | 'event' | 'photography' | 'automobile' | 'ecommerce';
  accentColor?: string;
}
