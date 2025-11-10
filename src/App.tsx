import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Plus, ArrowRight, BookOpen } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { UserCard } from '@/components/UserCard'
import { UserForm } from '@/components/UserForm'
import { ApiRequestPanel } from '@/components/ApiRequestPanel'
import { ApiResponsePanel } from '@/components/ApiResponsePanel'
import { RestApiSimulator } from '@/lib/api'
import type { User, ApiRequest, ApiResponse, HttpMethod } from '@/lib/types'

function App() {
  const [users, setUsers] = useKV<User[]>('users', [])
  const [currentRequest, setCurrentRequest] = useState<ApiRequest | null>(null)
  const [currentResponse, setCurrentResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>()

  const api = new RestApiSimulator(
    async () => users || [],
    (newUsers) => setUsers(newUsers)
  )

  const makeRequest = async (method: HttpMethod, endpoint: string, body?: unknown) => {
    const request: ApiRequest = {
      method,
      endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body,
    }

    setCurrentRequest(request)
    setCurrentResponse(null)
    setIsLoading(true)

    try {
      const response = await api.request(method, endpoint, body)
      setCurrentResponse(response)
      
      if (response.status >= 200 && response.status < 300) {
        toast.success(`${method} request successful`)
      } else if (response.status >= 400) {
        toast.error(`${method} request failed: ${response.statusText}`)
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetUsers = () => {
    makeRequest('GET', '/api/users')
  }

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    makeRequest('POST', '/api/users', userData)
    setShowUserForm(false)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setShowUserForm(true)
  }

  const handleUpdateUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      makeRequest('PUT', `/api/users/${editingUser.id}`, userData)
      setShowUserForm(false)
      setEditingUser(undefined)
    }
  }

  const handleDeleteUser = (id: string) => {
    makeRequest('DELETE', `/api/users/${id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <BookOpen size={32} className="text-accent" weight="duotone" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">REST API Learning Platform</h1>
              <p className="text-muted-foreground mt-1">
                Understand how frontend communicates with backend through REST API
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="examples">API Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Users</h2>
                <p className="text-muted-foreground mt-1">
                  Perform CRUD operations and see the API calls in real-time
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleGetUsers} disabled={isLoading}>
                  <ArrowRight size={18} className="mr-2" />
                  GET Users
                </Button>
                <Button onClick={() => {
                  setEditingUser(undefined)
                  setShowUserForm(true)
                }} disabled={isLoading}>
                  <Plus size={18} className="mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">User List</h3>
                {!users || users.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      No users yet. Click "Add User" to create one!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map(user => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API Communication</h3>
                {!currentRequest && !currentResponse ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Perform an action to see the API request and response
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentRequest && <ApiRequestPanel request={currentRequest} />}
                    {isLoading && (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                      </div>
                    )}
                    {currentResponse && !isLoading && <ApiResponsePanel response={currentResponse} />}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">HTTP Methods Explained</h2>
              <p className="text-muted-foreground mt-1">
                Learn about different HTTP methods and their purposes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded">GET</div>
                  <h3 className="font-semibold">Retrieve Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used to fetch data from the server. It's safe and idempotent - calling it multiple times 
                  produces the same result without changing server state.
                </p>
                <code className="block text-xs bg-muted p-3 rounded">
                  GET /api/users - Fetch all users<br />
                  GET /api/users/123 - Fetch user with ID 123
                </code>
              </div>

              <div className="p-6 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded">POST</div>
                  <h3 className="font-semibold">Create Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used to create new resources on the server. Sends data in the request body. 
                  Each call creates a new resource.
                </p>
                <code className="block text-xs bg-muted p-3 rounded">
                  POST /api/users<br />
                  Body: {JSON.stringify({ name: 'John', email: 'john@example.com' }, null, 2)}
                </code>
              </div>

              <div className="p-6 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded">PUT</div>
                  <h3 className="font-semibold">Update Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used to update existing resources. Replaces the entire resource with new data. 
                  Idempotent - multiple identical requests have the same effect.
                </p>
                <code className="block text-xs bg-muted p-3 rounded">
                  PUT /api/users/123<br />
                  Body: {JSON.stringify({ name: 'Jane', email: 'jane@example.com' }, null, 2)}
                </code>
              </div>

              <div className="p-6 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">DELETE</div>
                  <h3 className="font-semibold">Remove Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Used to delete resources from the server. Idempotent - deleting the same resource 
                  multiple times has the same effect as deleting it once.
                </p>
                <code className="block text-xs bg-muted p-3 rounded">
                  DELETE /api/users/123 - Delete user with ID 123
                </code>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Status Codes</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded inline-block mb-2">
                    2xx Success
                  </div>
                  <p className="text-sm text-muted-foreground">
                    200 OK - Request succeeded<br />
                    201 Created - New resource created<br />
                    204 No Content - Success, no body
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded inline-block mb-2">
                    4xx Client Error
                  </div>
                  <p className="text-sm text-muted-foreground">
                    400 Bad Request - Invalid data<br />
                    404 Not Found - Resource doesn't exist<br />
                    401 Unauthorized - Authentication required
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="px-3 py-1 bg-destructive text-destructive-foreground text-sm font-medium rounded inline-block mb-2">
                    5xx Server Error
                  </div>
                  <p className="text-sm text-muted-foreground">
                    500 Internal Server Error<br />
                    502 Bad Gateway<br />
                    503 Service Unavailable
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <UserForm
        open={showUserForm}
        onOpenChange={(open) => {
          setShowUserForm(open)
          if (!open) setEditingUser(undefined)
        }}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
        initialData={editingUser}
        isLoading={isLoading}
      />
    </div>
  )
}

export default App