import Image from "next/image";
import "./journal-cards.scss";
import { BASE_URL } from "@/constants/constants";

type JournalCardsProps = {
  cardData: {
    paperTitle: string;
    thumbNail: {
      src?: string;
      width?: number;
      height?: number;
    };
    author: string;
    publisher: string;
    journal: string;
  };
};

export const JournalCards = (props: JournalCardsProps) => {
  return (
    <div className="journal-card">
      <img
        src={
          props.cardData.thumbNail?.src
            ? `${BASE_URL + props.cardData.thumbNail?.src}`
            : "./book.svg"
        }
        alt={""}
        className="card-img"
        width={props.cardData.thumbNail?.width}
        height={props.cardData.thumbNail.height}
      />
      <div className="paper-description">
        <div className="paper-description-item">
          <span className="subtitle">Paper Title:</span>
          <span>{props.cardData.paperTitle}</span>
        </div>

        <div className="paper-description-item">
          <span className="subtitle">Author:</span>
          <span>{props.cardData.author}</span>
        </div>
        <div className="paper-description-item">
          <span className="subtitle">Publisher:</span>
          <span>{props.cardData.publisher}</span>
        </div>
        <div className="paper-description-item">
          <span className="subtitle">Journal:</span>
          <span>{props.cardData.journal}</span>
        </div>
        <button className="see-more-btn">See more</button>
      </div>
    </div>
  );
};
