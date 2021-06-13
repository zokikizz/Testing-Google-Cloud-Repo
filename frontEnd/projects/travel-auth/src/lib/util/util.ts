export interface JsonWebTokenObject {
  exp: number | Date;
  jti: string;
  token_type: string;
  user_id: number;
}


export function parseJwt(token: string): JsonWebTokenObject {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

