import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PencilSimple, Trash, User as UserIcon } from '@phosphor-icons/react'
import type { User } from '@/lib/types'

interface UserCardProps {
  user: User
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <UserIcon size={20} className="text-primary" weight="duotone" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base truncate">{user.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            <Badge variant="secondary" className="mt-2">
              {user.role}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(user)}
            className="h-9 w-9"
          >
            <PencilSimple size={18} className="text-primary" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(user.id)}
            className="h-9 w-9"
          >
            <Trash size={18} className="text-destructive" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
