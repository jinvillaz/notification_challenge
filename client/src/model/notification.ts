import { Category } from './category'
import { Channel } from './channel'
import { User } from './user'

export interface Notification {
  _id: string
  message: string
  category: Category
  channel: Channel
  user: User
}
