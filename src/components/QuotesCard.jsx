import classes from './QuotesCard.module.css'
export default function QuotesCard({ quote }) {
  return (
    <div key={quote.id} className={classes.card}>
      <div className="content">{quote.quote}</div>
      <div className="author">{quote.author}</div>
    </div>
  );
}
