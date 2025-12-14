import { FC } from "react";

import "./PhishingEmailCard.css";

export interface TPhishingEmailCardProps {
  content: string;
  status: string;
  id: string;
  email: string;
}

const getStatusVariant = (status: string): string => {
  const normalizedStatus = status.toLowerCase();
  if (
    normalizedStatus.includes("success") ||
    normalizedStatus.includes("sent")
  ) {
    return "success";
  }
  if (
    normalizedStatus.includes("pending") ||
    normalizedStatus.includes("waiting")
  ) {
    return "pending";
  }
  if (
    normalizedStatus.includes("failed") ||
    normalizedStatus.includes("error")
  ) {
    return "error";
  }
  return "default";
};

export const PhishingEmailCard: FC<TPhishingEmailCardProps> = ({
  status,
  id,
  email,
  content,
}) => {
  const statusVariant = getStatusVariant(status);
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="phishing-card">
      <div className="phishing-card__header">
        <div className="phishing-card__id">
          <span className="phishing-card__label">ID</span>
          <span className="phishing-card__value">{id}</span>
        </div>
        <div
          className={`phishing-card__status phishing-card__status--${statusVariant}`}
        >
          {formattedStatus}
        </div>
      </div>

      <div className="phishing-card__body">
        <div className="phishing-card__field">
          <span className="phishing-card__label">Email</span>
          <span className="phishing-card__value phishing-card__value--email">
            {email}
          </span>
        </div>

        <div className="phishing-card__field phishing-card__field--content">
          <span className="phishing-card__label">Content</span>
          <div
            className="phishing-card__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};
