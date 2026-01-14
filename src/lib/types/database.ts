export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          company: string | null;
          services_interested: string[];
          budget: string | null;
          timeline: string | null;
          message: string;
          how_found: string | null;
          source: string | null;
          utm_campaign: string | null;
          utm_medium: string | null;
          landing_page: string | null;
          user_agent: string | null;
          ip_country: string | null;
          status: string;
          notes: string | null;
          follow_up_date: string | null;
          estimated_value: number | null;
          archived: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email: string;
          company?: string | null;
          services_interested?: string[];
          budget?: string | null;
          timeline?: string | null;
          message: string;
          how_found?: string | null;
          source?: string | null;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          landing_page?: string | null;
          user_agent?: string | null;
          ip_country?: string | null;
          status?: string;
          notes?: string | null;
          follow_up_date?: string | null;
          estimated_value?: number | null;
          archived?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          email?: string;
          company?: string | null;
          services_interested?: string[];
          budget?: string | null;
          timeline?: string | null;
          message?: string;
          how_found?: string | null;
          source?: string | null;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          landing_page?: string | null;
          user_agent?: string | null;
          ip_country?: string | null;
          status?: string;
          notes?: string | null;
          follow_up_date?: string | null;
          estimated_value?: number | null;
          archived?: boolean;
        };
      };
      page_views: {
        Row: {
          id: string;
          created_at: string;
          page_path: string;
          session_id: string | null;
          visitor_id: string | null;
          referrer: string | null;
          user_agent: string | null;
          screen_size: string | null;
          country: string | null;
          duration_seconds: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          page_path: string;
          session_id?: string | null;
          visitor_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          screen_size?: string | null;
          country?: string | null;
          duration_seconds?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          page_path?: string;
          session_id?: string | null;
          visitor_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          screen_size?: string | null;
          country?: string | null;
          duration_seconds?: number | null;
        };
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          company: string | null;
          role: string | null;
          period: string | null;
          thumbnail_url: string | null;
          technologies: string[];
          challenge: string | null;
          solution: string | null;
          results: Json | null;
          testimonial: Json | null;
          is_public: boolean;
          is_featured: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          slug: string;
          company?: string | null;
          role?: string | null;
          period?: string | null;
          thumbnail_url?: string | null;
          technologies?: string[];
          challenge?: string | null;
          solution?: string | null;
          results?: Json | null;
          testimonial?: Json | null;
          is_public?: boolean;
          is_featured?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          slug?: string;
          company?: string | null;
          role?: string | null;
          period?: string | null;
          thumbnail_url?: string | null;
          technologies?: string[];
          challenge?: string | null;
          solution?: string | null;
          results?: Json | null;
          testimonial?: Json | null;
          is_public?: boolean;
          is_featured?: boolean;
          sort_order?: number;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          subtitle: string | null;
          description: string | null;
          icon: string | null;
          benefits: string[];
          target_audience: string | null;
          deliverables: string[];
          pricing_type: string | null;
          pricing_range: string | null;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          subtitle?: string | null;
          description?: string | null;
          icon?: string | null;
          benefits?: string[];
          target_audience?: string | null;
          deliverables?: string[];
          pricing_type?: string | null;
          pricing_range?: string | null;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          subtitle?: string | null;
          description?: string | null;
          icon?: string | null;
          benefits?: string[];
          target_audience?: string | null;
          deliverables?: string[];
          pricing_type?: string | null;
          pricing_range?: string | null;
          is_active?: boolean;
          sort_order?: number;
        };
      };
    };
  };
}

export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];

export type Project = Database['public']['Tables']['projects']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type PageView = Database['public']['Tables']['page_views']['Row'];
