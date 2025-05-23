export interface AuthError {
  type: 'AuthError' | 'AccessDenied' | 'Verification' | 'Configuration'
  message: string
  code?: string
}

export interface GoogleProfile {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name?: string
  given_name?: string
  hd?: string
  iat: number
  iss: string
  jti?: string
  name: string
  nbf?: number
  picture: string
  sub: string
}

export interface AuthResponse {
  success: boolean
  error?: AuthError
  user?: {
    id: string
    email: string
    name: string
    image?: string
  }
}