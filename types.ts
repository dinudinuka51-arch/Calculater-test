export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GeminiSearchResult {
  text: string;
  sources: GroundingChunk[];
}