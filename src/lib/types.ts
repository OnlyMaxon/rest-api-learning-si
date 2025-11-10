export interface User {
  id: string
  name: string
  email: string
  role: string
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface ApiRequest {
  method: HttpMethod
  endpoint: string
  headers: Record<string, string>
  body?: unknown
}

export interface ApiResponse<T = unknown> {
  status: number
  statusText: string
  headers: Record<string, string>
  body: T
  timestamp: number
}

export interface ApiCall {
  request: ApiRequest
  response?: ApiResponse
  isLoading: boolean
  error?: string
}
