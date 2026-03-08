import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabase";

export type SummaryStatus = "good" | "warning" | "danger";

export interface SummaryItem {
  type: "revenue" | "churn" | "payment" | "neutral";
  message: string;
}

export interface DailySummary {
  id: string;
  user_id: string;
  date: string;
  headline: string;
  summary_text: string;
  items: SummaryItem[];
  status: SummaryStatus;
  push_sent: boolean;
  push_sent_at: string | null;
  generated_at: string;
  created_at: string;
}

export const summariesApi = createApi({
  reducerPath: "summariesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Summaries"],
  endpoints: (builder) => ({
    getTodaysSummary: builder.query<DailySummary | null, void>({
      queryFn: async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            return { error: { message: "Not authenticated" } };
          }

          const today = new Date().toISOString().split("T")[0];

          const { data, error } = await supabase
            .from("daily_summaries")
            .select("*")
            .eq("user_id", user.id)
            .eq("date", today)
            .single();

          if (error) {
            if (error.code === "PGRST116") {
              return { data: null };
            }
            return { error: { message: error.message } };
          }

          return { data };
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Failed to fetch today's summary",
            },
          };
        }
      },
      providesTags: ["Summaries"],
    }),

    getRecentSummaries: builder.query<DailySummary[], number>({
      queryFn: async (days = 7) => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            return { error: { message: "Not authenticated" } };
          }

          const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];

          const { data, error } = await supabase
            .from("daily_summaries")
            .select("*")
            .eq("user_id", user.id)
            .gte("date", startDate)
            .order("date", { ascending: false });

          if (error) {
            return { error: { message: error.message } };
          }

          return { data: data || [] };
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Failed to fetch summaries",
            },
          };
        }
      },
      providesTags: ["Summaries"],
    }),

    getSummaryByDate: builder.query<DailySummary | null, string>({
      queryFn: async (date) => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            return { error: { message: "Not authenticated" } };
          }

          const { data, error } = await supabase
            .from("daily_summaries")
            .select("*")
            .eq("user_id", user.id)
            .eq("date", date)
            .single();

          if (error) {
            if (error.code === "PGRST116") {
              return { data: null };
            }
            return { error: { message: error.message } };
          }

          return { data };
        } catch (error) {
          return {
            error: {
              message: error instanceof Error ? error.message : "Failed to fetch summary",
            },
          };
        }
      },
      providesTags: ["Summaries"],
    }),
  }),
});

export const {
  useGetTodaysSummaryQuery,
  useGetRecentSummariesQuery,
  useGetSummaryByDateQuery,
} = summariesApi;
