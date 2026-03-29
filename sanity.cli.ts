/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = "47h2dt9x"    
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ 
  api: { projectId, dataset },
  deployment: {
    appId: 'w272516ck35tmw6p3ethaq06',
  },
 })   
