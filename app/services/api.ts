// URL de base de l'API backend. Tous les endpoints seront ajoutés après ce préfixe.
const API_BASE_URL = "http://localhost:8000/api";

// Étend les options natives de fetch pour accepter aussi un objet JS en body.
type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | null;
};

// Erreur personnalisée pour récupérer facilement le statut HTTP et la réponse API.
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Lit le JSON si possible, sinon retourne null pour éviter une erreur de parsing.
async function parseJson(response: Response) {
  return response.json().catch(() => null);
}

// Fonction générique utilisée par les features pour appeler l'API.
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  // Si le body est un objet simple, on l'enverra en JSON.
  const hasJsonBody =
    options.body !== null &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof Blob) &&
    !(options.body instanceof ArrayBuffer) &&
    !(options.body instanceof URLSearchParams);

  // Ajoute le Content-Type JSON uniquement si l'appel ne l'a pas déjà défini.
  if (hasJsonBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Transforme les objets JS en JSON, tout en gardant les body natifs de fetch.
  const requestBody: BodyInit | null | undefined = hasJsonBody
    ? JSON.stringify(options.body)
    : (options.body as BodyInit | null | undefined);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: requestBody,
  });
  const data = await parseJson(response);

  // Centralise les erreurs HTTP pour que les composants puissent les gérer proprement.
  if (!response.ok) {
    throw new ApiError("La requête API a échoué.", response.status, data);
  }

  // Le type T permet à chaque feature de préciser la forme attendue de la réponse.
  return data as T;
}
