export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cities: {
        Row: {
          country: string
          created_at: string
          gift_count: number
          id: string
          latitude: number
          longitude: number
          name: string
          population: number
          priority_score: number
          timezone: string
          timezone_offset: number
        }
        Insert: {
          country: string
          created_at?: string
          gift_count?: number
          id?: string
          latitude: number
          longitude: number
          name: string
          population?: number
          priority_score?: number
          timezone: string
          timezone_offset?: number
        }
        Update: {
          country?: string
          created_at?: string
          gift_count?: number
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          population?: number
          priority_score?: number
          timezone?: string
          timezone_offset?: number
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          city_id: string
          completed_at: string | null
          created_at: string
          delay_reason: string | null
          gifts_delivered: number
          id: string
          scheduled_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          city_id: string
          completed_at?: string | null
          created_at?: string
          delay_reason?: string | null
          gifts_delivered?: number
          id?: string
          scheduled_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          city_id?: string
          completed_at?: string | null
          created_at?: string
          delay_reason?: string | null
          gifts_delivered?: number
          id?: string
          scheduled_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      emergencies: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_resolved: boolean
          latitude: number | null
          longitude: number | null
          resolved_at: string | null
          severity: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_resolved?: boolean
          latitude?: number | null
          longitude?: number | null
          resolved_at?: string | null
          severity: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_resolved?: boolean
          latitude?: number | null
          longitude?: number | null
          resolved_at?: string | null
          severity?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      mission_stats: {
        Row: {
          cities_visited: number
          current_status: string
          distance_traveled_km: number
          gifts_delivered: number
          id: string
          mission_end: string | null
          mission_start: string | null
          total_cities: number
          total_gifts: number
          updated_at: string
        }
        Insert: {
          cities_visited?: number
          current_status?: string
          distance_traveled_km?: number
          gifts_delivered?: number
          id?: string
          mission_end?: string | null
          mission_start?: string | null
          total_cities?: number
          total_gifts?: number
          updated_at?: string
        }
        Update: {
          cities_visited?: number
          current_status?: string
          distance_traveled_km?: number
          gifts_delivered?: number
          id?: string
          mission_end?: string | null
          mission_start?: string | null
          total_cities?: number
          total_gifts?: number
          updated_at?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          city_sequence: string[]
          created_at: string
          estimated_duration_minutes: number
          id: string
          is_active: boolean
          name: string
          total_distance_km: number
          updated_at: string
        }
        Insert: {
          city_sequence?: string[]
          created_at?: string
          estimated_duration_minutes?: number
          id?: string
          is_active?: boolean
          name?: string
          total_distance_km?: number
          updated_at?: string
        }
        Update: {
          city_sequence?: string[]
          created_at?: string
          estimated_duration_minutes?: number
          id?: string
          is_active?: boolean
          name?: string
          total_distance_km?: number
          updated_at?: string
        }
        Relationships: []
      }
      sleigh_telemetry: {
        Row: {
          altitude_meters: number
          cargo_weight_kg: number
          current_city_id: string | null
          heading_degrees: number
          id: string
          latitude: number
          longitude: number
          next_city_id: string | null
          recorded_at: string
          reindeer_fatigue_percent: number
          speed_kmh: number
        }
        Insert: {
          altitude_meters?: number
          cargo_weight_kg?: number
          current_city_id?: string | null
          heading_degrees?: number
          id?: string
          latitude: number
          longitude: number
          next_city_id?: string | null
          recorded_at?: string
          reindeer_fatigue_percent?: number
          speed_kmh?: number
        }
        Update: {
          altitude_meters?: number
          cargo_weight_kg?: number
          current_city_id?: string | null
          heading_degrees?: number
          id?: string
          latitude?: number
          longitude?: number
          next_city_id?: string | null
          recorded_at?: string
          reindeer_fatigue_percent?: number
          speed_kmh?: number
        }
        Relationships: [
          {
            foreignKeyName: "sleigh_telemetry_current_city_id_fkey"
            columns: ["current_city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sleigh_telemetry_next_city_id_fkey"
            columns: ["next_city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      weather_conditions: {
        Row: {
          city_id: string | null
          condition: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          region: string | null
          severity: number
          speed_reduction_percent: number
          visibility_km: number
          wind_speed_kmh: number
        }
        Insert: {
          city_id?: string | null
          condition: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          region?: string | null
          severity?: number
          speed_reduction_percent?: number
          visibility_km?: number
          wind_speed_kmh?: number
        }
        Update: {
          city_id?: string | null
          condition?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          region?: string | null
          severity?: number
          speed_reduction_percent?: number
          visibility_km?: number
          wind_speed_kmh?: number
        }
        Relationships: [
          {
            foreignKeyName: "weather_conditions_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
