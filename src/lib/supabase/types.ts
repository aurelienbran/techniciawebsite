export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type MaintenanceStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled'
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'critical'
export type DocumentType = 'pdf' | 'text' | 'image'
export type UserRole = 'technician' | 'supervisor' | 'admin'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: UserRole
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: UserRole
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: UserRole
          department?: string | null
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          title: string
          content: string
          type: DocumentType
          metadata: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          type: DocumentType
          metadata?: Json
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          type?: DocumentType
          metadata?: Json
          updated_at?: string
        }
      }
      maintenance_requests: {
        Row: {
          id: string
          title: string
          description: string
          equipment: string
          priority: MaintenancePriority
          status: MaintenanceStatus
          requested_by: string
          assigned_to: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          equipment: string
          priority: MaintenancePriority
          status?: MaintenanceStatus
          requested_by: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          equipment?: string
          priority?: MaintenancePriority
          status?: MaintenanceStatus
          assigned_to?: string | null
          updated_at?: string
          completed_at?: string | null
        }
      }
      request_documents: {
        Row: {
          request_id: string
          document_id: string
          created_at: string
        }
        Insert: {
          request_id: string
          document_id: string
          created_at?: string
        }
        Update: {
          request_id?: string
          document_id?: string
          created_at?: string
        }
      }
    }
  }
}