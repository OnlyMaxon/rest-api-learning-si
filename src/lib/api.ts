import type { User, ApiRequest, ApiResponse, HttpMethod } from './types'

const API_DELAY = 500

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, API_DELAY))

export class RestApiSimulator {
  private getUsers: () => Promise<User[]>
  private setUsers: (users: User[]) => void

  constructor(getUsers: () => Promise<User[]>, setUsers: (users: User[]) => void) {
    this.getUsers = getUsers
    this.setUsers = setUsers
  }

  async request<T>(method: HttpMethod, endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    await simulateDelay()

    const timestamp = Date.now()
    const headers = {
      'Content-Type': 'application/json',
      'X-Powered-By': 'REST API Simulator',
    }

    try {
      if (method === 'GET' && endpoint === '/api/users') {
        const users = await this.getUsers()
        return {
          status: 200,
          statusText: 'OK',
          headers,
          body: users as T,
          timestamp,
        }
      }

      if (method === 'GET' && endpoint.startsWith('/api/users/')) {
        const id = endpoint.split('/').pop()
        const users = await this.getUsers()
        const user = users.find(u => u.id === id)
        
        if (!user) {
          return {
            status: 404,
            statusText: 'Not Found',
            headers,
            body: { error: 'User not found' } as T,
            timestamp,
          }
        }

        return {
          status: 200,
          statusText: 'OK',
          headers,
          body: user as T,
          timestamp,
        }
      }

      if (method === 'POST' && endpoint === '/api/users') {
        const users = await this.getUsers()
        const newUser = body as User
        
        if (!newUser.name || !newUser.email) {
          return {
            status: 400,
            statusText: 'Bad Request',
            headers,
            body: { error: 'Name and email are required' } as T,
            timestamp,
          }
        }

        const userWithId = {
          ...newUser,
          id: Date.now().toString(),
        }
        
        this.setUsers([...users, userWithId])
        
        return {
          status: 201,
          statusText: 'Created',
          headers: {
            ...headers,
            'Location': `/api/users/${userWithId.id}`,
          },
          body: userWithId as T,
          timestamp,
        }
      }

      if (method === 'PUT' && endpoint.startsWith('/api/users/')) {
        const id = endpoint.split('/').pop()
        const users = await this.getUsers()
        const index = users.findIndex(u => u.id === id)
        
        if (index === -1) {
          return {
            status: 404,
            statusText: 'Not Found',
            headers,
            body: { error: 'User not found' } as T,
            timestamp,
          }
        }

        const updatedUser = { ...body as User, id: id! }
        const newUsers = [...users]
        newUsers[index] = updatedUser
        this.setUsers(newUsers)

        return {
          status: 200,
          statusText: 'OK',
          headers,
          body: updatedUser as T,
          timestamp,
        }
      }

      if (method === 'DELETE' && endpoint.startsWith('/api/users/')) {
        const id = endpoint.split('/').pop()
        const users = await this.getUsers()
        const userExists = users.some(u => u.id === id)
        
        if (!userExists) {
          return {
            status: 404,
            statusText: 'Not Found',
            headers,
            body: { error: 'User not found' } as T,
            timestamp,
          }
        }

        this.setUsers(users.filter(u => u.id !== id))

        return {
          status: 204,
          statusText: 'No Content',
          headers,
          body: null as T,
          timestamp,
        }
      }

      return {
        status: 404,
        statusText: 'Not Found',
        headers,
        body: { error: 'Endpoint not found' } as T,
        timestamp,
      }
    } catch (error) {
      return {
        status: 500,
        statusText: 'Internal Server Error',
        headers,
        body: { error: 'An error occurred' } as T,
        timestamp,
      }
    }
  }
}
