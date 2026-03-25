import { Question, GeneratedContent, Language } from '../types';

export const QUESTIONS_DATA: Record<Language, Question[]> = {
  romanian: [
    {
      id: 'q1',
      text: "🎭 CARE E SIMȚĂMÂNTUL DE BAZĂ pe care vrei să-l simtă spectatorul?",
      options: [
        { id: 'A', text: "SURPRINDERE ABSURDĂ - 'Ce naiba tocmai am văzut?'" },
        { id: 'B', text: "NOSTALGIE CALDĂ - 'Aaa, îmi amintește de...'" },
        { id: 'C', text: "CURIOSITATE ARSĂ - 'Trebuie să aflu ce se întâmplă!'" },
        { id: 'D', text: "BUCURIE PURĂ - 'Vreau să share-ui asta cu toată lumea!'" },
        { id: 'E', text: "MELANCOLIE FRUMOASĂ - 'Ce profund și emoționant...'" }
      ]
    },
    {
      id: 'q2',
      text: "⚡ CE RITM ARE POVESTEA ta în interior?",
      options: [
        { id: 'A', text: "EXPLOZIE → pauză → twist final (like a thriller)" },
        { id: 'B', text: "Creștere lentă → climax puternic → rezoluție calmă" },
        { id: 'C', text: "Constant, hipnotic, ca un beat de muzică" },
        { id: 'D', text: "Haotic, frenetic, schimbări bruște de direcție" },
        { id: 'E', text: "Ca un val: vine, se retrage, vine mai puternic" }
      ]
    },
    {
      id: 'q3',
      text: "🌌 ÎN CE UNIVERS trăiește povestea ta?",
      options: [
        { id: 'A', text: "REALITATEA NOASTRĂ, dar cu un element magic ascuns" },
        { id: 'B', text: "LUME PARALELĂ cu reguli fizice diferite" },
        { id: 'C', text: "MEMORIE COLECTIVĂ (un loc care există doar în amintiri)" },
        { id: 'D', text: "INTERIORUL MINȚII (pădure de gânduri, ocean de emoții)" },
        { id: 'E', text: "FUTURUL APROPIAT cu tehnologie pe care o simțim că vine" }
      ]
    },
    {
      id: 'q4',
      text: "👁️ CUM NE CONECTĂM cu personajul tău?",
      options: [
        { id: 'A', text: "VEDEM LUMEA PRIN OCHII LUI (first-person POV)" },
        { id: 'B', text: "SUNTEM O PRESENȚĂ INVIZIBILĂ care-l urmărește" },
        { id: 'C', text: "INTERACȚIONĂM DIRECT CU EL (el știe că suntem acolo)" },
        { id: 'D', text: "VEDEM REFLEXIA LUI ÎN ALȚI OAMENI" },
        { id: 'E', text: "SIMȚIM CE SIMTE EL, CHIAR DACĂ NU-L VEDEM" }
      ]
    },
    {
      id: 'q5',
      text: "🌀 CE SE TRANSFORMĂ până la final?",
      options: [
        { id: 'A', text: "PERSONAJUL (el/ea devine cineva/ceva nou)" },
        { id: 'B', text: "PERCEPȚIA NOASTRĂ (întelegem altfel ce am văzut)" },
        { id: 'C', text: "REALITATEA DIN SCENĂ (lumea se schimbă fizic)" },
        { id: 'D', text: "RELAȚIA DINTRE PERSONAJE (din străini devin...?)" },
        { id: 'E', text: "SIMȚĂMÂNTUL NOSTRU (trecem de la X la Y emoțional)" }
      ]
    }
  ],
  english: [
    {
      id: 'q1',
      text: "🎭 WHAT'S THE CORE FEELING you want the viewer to experience?",
      options: [
        { id: 'A', text: "ABSURD SURPRISE - 'What the hell did I just see?'" },
        { id: 'B', text: "WARM NOSTALGIA - 'Aah, this reminds me of...'" },
        { id: 'C', text: "BURNING CURIOSITY - 'I need to know what happens next!'" },
        { id: 'D', text: "PURE JOY - 'I want to share this with everyone!'" },
        { id: 'E', text: "BEAUTIFUL MELANCHOLY - 'So deep and emotional...'" }
      ]
    },
    {
      id: 'q2',
      text: "⚡ WHAT RHYTHM DOES YOUR STORY have inside?",
      options: [
        { id: 'A', text: "EXPLOSION → pause → final twist (like a thriller)" },
        { id: 'B', text: "Slow build → powerful climax → calm resolution" },
        { id: 'C', text: "Constant, hypnotic, like a music beat" },
        { id: 'D', text: "Chaotic, frenetic, sudden direction changes" },
        { id: 'E', text: "Like a wave: comes, retreats, comes stronger" }
      ]
    },
    {
      id: 'q3',
      text: "🌌 IN WHAT UNIVERSE does your story live?",
      options: [
        { id: 'A', text: "OUR REALITY, but with one hidden magical element" },
        { id: 'B', text: "PARALLEL WORLD with different physical rules" },
        { id: 'C', text: "COLLECTIVE MEMORY (a place that exists only in memories)" },
        { id: 'D', text: "INSIDE THE MIND (forest of thoughts, ocean of emotions)" },
        { id: 'E', text: "NEAR FUTURE with technology we feel is coming" }
      ]
    },
    {
      id: 'q4',
      text: "👁️ HOW DO WE CONNECT with your character?",
      options: [
        { id: 'A', text: "WE SEE THE WORLD THROUGH HIS EYES (first-person POV)" },
        { id: 'B', text: "WE'RE AN INVISIBLE PRESENCE following him" },
        { id: 'C', text: "WE INTERACT DIRECTLY WITH HIM (he knows we're there)" },
        { id: 'D', text: "WE SEE HIS REFLECTION IN OTHER PEOPLE" },
        { id: 'E', text: "WE FEEL WHAT HE FEELS, EVEN IF WE DON'T SEE HIM" }
      ]
    },
    {
      id: 'q5',
      text: "🌀 WHAT TRANSFORMS by the end?",
      options: [
        { id: 'A', text: "THE CHARACTER (he/she becomes someone/something new)" },
        { id: 'B', text: "OUR PERCEPTION (we understand differently what we saw)" },
        { id: 'C', text: "THE SCENE'S REALITY (the world changes physically)" },
        { id: 'D', text: "RELATIONSHIP BETWEEN CHARACTERS (from strangers to...?)" },
        { id: 'E', text: "OUR FEELING (we go from X to Y emotionally)" }
      ]
    }
  ]
};

export const generateCineGenPrompts = (answers: Record<string, string>, character: string, lang: Language): GeneratedContent => {
  // Mock logic to simulate the "AI Alchemist"
  // In a real app, this would call an LLM (Gemini, GPT) to synthesize the answers.
  
  const isSurprise = answers['q1'] === 'A';
  const isNostalgia = answers['q1'] === 'B';
  const characterDesc = character.length > 0 ? character : "A mysterious protagonist";

  let imagePrompt = `CINEMATIC STILL FRAME - ${characterDesc}. `;
  let videoPrompt = `CINEMATIC SEQUENCE CONTINUATION from previous frame. `;
  let tone = "Neutral";
  
  if (isSurprise) {
    imagePrompt += "High contrast lighting, surreal atmosphere, floating elements, 8k resolution, photorealistic.";
    videoPrompt += "The scene defies gravity. Objects start floating. The character reacts with shock. Fast paced crash zoom.";
    tone = "Energetic, Unexpected";
  } else if (isNostalgia) {
    imagePrompt += "Warm golden hour lighting, film grain, soft focus, detailed textures, 8k resolution.";
    videoPrompt += "Slow motion movement. A gentle breeze moves the hair. The camera pans slowly revealing a memory. Emotional build up.";
    tone = "Warm, Soothing";
  } else {
    imagePrompt += "Dramatic studio lighting, sharp focus, vibrant colors, 4k detail.";
    videoPrompt += "Dynamic camera orbit. The environment shifts colors. The character steps forward confidently.";
    tone = "Confident, Bold";
  }

  // Add specific details based on other questions (simplified for demo)
  if (answers['q3'] === 'E') {
    imagePrompt += " Cyberpunk aesthetics, neon lights, futuristic interface overlays.";
  }

  return {
    imagePrompt,
    videoPrompt,
    voiceGuidance: {
      recommendedVoice: lang === 'romanian' ? "Voice_Ioana" : "Voice_Sarah",
      tonality: tone,
      cues: ["Start slow", "Pause for effect at 0:05", "End with a whisper"]
    },
    storyArc: "The journey from ordinary to extraordinary through a lens of deep emotion."
  };
};