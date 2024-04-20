import express from 'express'
import initiateApp from './src/initiate-app.js'

const app = express()

initiateApp(app,express)