import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react'
import type { ApiResponse } from '@/lib/types'

interface ApiResponsePanelProps {
  response: ApiResponse
}

function getStatusColor(status: number) {
  if (status >= 200 && status < 300) return 'bg-secondary text-secondary-foreground'
  if (status >= 400 && status < 500) return 'bg-yellow-500 text-white'
  if (status >= 500) return 'bg-destructive text-destructive-foreground'
  return 'bg-muted text-muted-foreground'
}

function getStatusIcon(status: number) {
  if (status >= 200 && status < 300) return <CheckCircle size={24} weight="duotone" />
  if (status >= 400 && status < 500) return <Warning size={24} weight="duotone" />
  if (status >= 500) return <XCircle size={24} weight="duotone" />
  return null
}

export function ApiResponsePanel({ response }: ApiResponsePanelProps) {
  const statusColor = getStatusColor(response.status)
  const statusIcon = getStatusIcon(response.status)
  
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        {statusIcon}
        <h3 className="text-lg font-semibold">Response</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <div className="mt-1">
            <Badge className={statusColor}>
              {response.status} {response.statusText}
            </Badge>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Headers</label>
          <ScrollArea className="mt-1 max-h-32">
            <pre className="p-3 bg-muted rounded-md text-xs">
              {JSON.stringify(response.headers, null, 2)}
            </pre>
          </ScrollArea>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Body</label>
          <ScrollArea className="mt-1 max-h-48">
            <pre className="p-3 bg-muted rounded-md text-xs">
              {response.body !== null 
                ? JSON.stringify(response.body, null, 2)
                : '(empty)'}
            </pre>
          </ScrollArea>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
          <p className="mt-1 text-sm">{new Date(response.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </Card>
  )
}
