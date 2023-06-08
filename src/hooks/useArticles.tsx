import { useStore } from "@/store";
import { Article, Source } from "@/types";
import useSWR from "swr";
import queryString from "querystring";
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useArticles = () => {
  const pathname = usePathname();
  const router = useRouter();
  const query: any = useSearchParams();

  const [categories, sources, search, page, dateRange] = useStore((state) => [
    state.categories,
    state.sources,
    state.search,
    state.page,
    state.dateRange,
  ]);

  const handleSearch = useCallback(() => {
    const categoriesQuery = categories?.join(",");
    const sourcesQuery = sources?.join(",");
    const dateRangeQuery = `&start_date=${
      dateRange[0]?.toISOString() || ""
    }&endDate=${dateRange[1]?.toISOString() || ""}`;

    if (pathname === "/")
      router.push(
        pathname +
          "?" +
          queryString.stringify({
            search,
            page,
            sources: sourcesQuery,
            categories: categoriesQuery,
          }) +
          dateRangeQuery
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, sources, search, page, dateRange]);

  const { data: sourcesList = [] } = useSWR<Source[]>("/api/news/sources");

  const { data: articles = [], isLoading } = useSWR<Article[]>(
    "/api/news/feed?" + query.toString()
  );

  const categoriesList = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return {
    articles: articles.filter(
      (article) => (article.image || article.urlToImage) && article.author
    ),
    handleSearch,
    sourcesList,
    categoriesList,
    isLoading,
  };
};

export default useArticles;
