import { Client } from 'pg'

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
}

export class Database {
  private client: Client
  private static instance: Database

  constructor(config: DatabaseConfig) {
    this.client = new Client({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
    })
  }

  static getInstance(config?: DatabaseConfig): Database {
    if (!Database.instance && config) {
      Database.instance = new Database(config)
    }
    return Database.instance
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect()
      console.log('✅ Connected to PostgreSQL database')
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      throw error
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.end()
      console.log('📴 Disconnected from PostgreSQL database')
    } catch (error) {
      console.error('❌ Database disconnection failed:', error)
    }
  }

  async query(text: string, params?: any[]): Promise<any> {
    try {
      const result = await this.client.query(text, params)
      return result.rows
    } catch (error) {
      console.error('❌ Database query failed:', error)
      throw error
    }
  }

  async queryOne(text: string, params?: any[]): Promise<any> {
    const result = await this.query(text, params)
    return result[0] || null
  }

  getClient(): Client {
    return this.client
  }
}

// Helper function to get database config from environment variables
export function getDatabaseConfig(): DatabaseConfig {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'openhealth',
    user: process.env.DB_USER || 'openhealth_user',
    password: process.env.DB_PASSWORD || 'openhealth_password',
  }
}