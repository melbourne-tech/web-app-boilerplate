import { registerGlobalMiddleware } from '@tanstack/react-start'
import {
  databaseClientMiddleware,
  supabaseClientMiddleware,
} from './middleware'

registerGlobalMiddleware({
  middleware: [databaseClientMiddleware, supabaseClientMiddleware],
})
