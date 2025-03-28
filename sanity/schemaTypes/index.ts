import { type SchemaTypeDefinition } from 'sanity'
import {addShow} from './addShow'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [addShow],
}
