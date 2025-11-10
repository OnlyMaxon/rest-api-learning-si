import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Code } from '@phosphor-icons/react'
import type { ApiRequest } from '@/lib/types'

interface ApiRequestPanelProps {
  request: ApiRequest
}

const methodColors = {
  GET: 'bg-blue-500',
  POST: 'bg-green-500',
  PUT: 'bg-yellow-500',
  DELETE: 'bg-red-500',
}

export function ApiRequestPanel({ request }: ApiRequestPanelProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Code size={24} className="text-primary" weight="duotone" />
        <h3 className="text-lg font-semibold">Request</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Method</label>
          <div className="mt-1">
            <Badge className={`${methodColors[request.method]} text-white`}>
              {request.method}
            </Badge>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Endpoint</label>
          <code className="block mt-1 p-3 bg-muted rounded-md text-sm">
            {request.endpoint}
          </code>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Headers</label>
          <ScrollArea className="mt-1 max-h-32">
            <pre className="p-3 bg-muted rounded-md text-xs">
              {JSON.stringify(request.headers, null, 2)}
            </pre>
          </ScrollArea>
        </div>

        {request.body !== undefined && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Body</label>
            <ScrollArea className="mt-1 max-h-48">
              <pre className="p-3 bg-muted rounded-md text-xs">
                {typeof request.body === 'string' 
                  ? request.body 
                  : JSON.stringify(request.body, null, 2)}
              </pre>
            </ScrollArea>
          </div>
        )}
      </div>
    </Card>
  )
}
