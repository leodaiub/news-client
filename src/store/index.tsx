/* eslint-disable no-unused-vars */
import { create } from "zustand";

interface CampaignsState {
  dateRange: [Date, Date] | [undefined, undefined];
  search?: string;
  categories?: string[];
  sources?: string[];
  page: number;
  updateSearch: (filters: CampaignsState["search"]) => void;
  updateDateRange: (currency: CampaignsState["dateRange"]) => void;
  updateCategories: (categories: CampaignsState["categories"]) => void;
  updateSources: (sources: CampaignsState["sources"]) => void;
  updatePage: (page: CampaignsState["page"]) => void;
}

export const useStore = create<CampaignsState>()((set) => ({
  dateRange: [undefined, undefined],
  search: "",
  categories: [],
  sources: [],
  page: 1,
  updateSearch: (search: CampaignsState["search"]) => set(() => ({ search })),
  updateSources: (sources: CampaignsState["sources"]) =>
    set(() => ({ sources })),
  updateCategories: (categories: CampaignsState["categories"]) =>
    set(() => ({ categories })),
  updatePage: (page: CampaignsState["page"]) => set(() => ({ page })),
  updateDateRange: (dateRange: CampaignsState["dateRange"]) =>
    set(() => ({ dateRange })),
}));
