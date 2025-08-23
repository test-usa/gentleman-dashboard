// helper.ts


export const RefundType = {
  FULL: "FULL",
  PARTIAL: "PARTIAL",
  EXPERIENCE_ONLY: "EXPERIENCE_ONLY",
} as const;

export type RefundTypeType = (typeof RefundType)[keyof typeof RefundType];

export function translateText(text: string): string {
  if (!text) return text;

  const translations: Record<string, string> = {
    approved: "Approuvé",
    pending: "En attente",
    complete: "Terminé",
    rejected: "Rejeté",


    [RefundType.FULL.toLowerCase()]: "Complet",
    [RefundType.PARTIAL.toLowerCase()]: "Partiel",
    [RefundType.EXPERIENCE_ONLY.toLowerCase()]: "Expérience seulement",
    "the driver was assigned but never arrived at th": "Le chauffeur a été assigné mais n'est jamais arrivé à la destination",
    "fire evacuation plan": "Plan d'évacuation incendie",
    "medical emergency protocol": "Protocole d'urgence médicale",
    "missing person protocol": "Protocole personne disparue",
    "aggressive behaviour management": "Gestion des comportements agressifs",
    "infection control protocol": "Protocole de contrôle des infections",
    "disaster preparedness plan": "Plan de préparation aux catastrophes",
    refund: "Remboursement",
    "utilisateur inconnu": "Utilisateur inconnu",
  };

  return translations[text.toLowerCase()] || text;
}
