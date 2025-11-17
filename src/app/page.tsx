"use client";

import { JournalCards } from "@/components/journal-card/journal-cards";
import Spinner from "@/components/spinner/spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import "./page.scss";
import { BASE_URL, DEFAULT_PAGE_SIZE } from "@/constants/constants";
import PaginationButton from "@/components/journal-card/pagination/pagination";
import useDebounce from "@/hook/usedebounce";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const debouncedSearchValue = useDebounce(searchString, 700);
  const getJournals = () => {
    setLoading(true);
    axios
      .get(BASE_URL + "/acceptedpapers", {
        params:
          debouncedSearchValue.trim() != ""
            ? { papertitle: debouncedSearchValue }
            : {
                _limit: DEFAULT_PAGE_SIZE,
                _start: page * DEFAULT_PAGE_SIZE,
              },
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getJournals();
  }, [page, debouncedSearchValue]);

  return (
    <div className="main-page">
      <div className="main-page-header">
        <div className="page-title">Journal List</div>
        <input
          className="search-bar"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search by Paper Title...."
        />
      </div>
      <div className={`listing-section ${loading ? "loading" : ""}`}>
        {loading ? (
          <Spinner size="l" />
        ) : (
          data?.map((item: any, index: number) => (
            <JournalCards
              cardData={{
                paperTitle: item?.papertitle,
                thumbNail: {
                  src:
                    item?.journal?.journalimage?.formats?.thumbnail?.url ?? "",
                  width:
                    item?.journal?.journalimage?.formats?.thumbnail?.width ??
                    127,
                  height:
                    item?.journal?.journalimage?.formats?.thumbnail?.height ??
                    156,
                },
                author: item?.coauthors,
                publisher: item?.publisher?.publishername,
                journal: item?.journal?.title,
              }}
              key={index}
            />
          ))
        )}
      </div>
      <div className="page-footer">
        {debouncedSearchValue.trim() == "" && (
          <PaginationButton
            page={page}
            totalPages={Math.ceil(100 / DEFAULT_PAGE_SIZE)} //fixed Total has /count was responding 403
            onPageChange={(page: number) => {
              setPage(page);
            }}
          />
        )}
      </div>
    </div>
  );
}
