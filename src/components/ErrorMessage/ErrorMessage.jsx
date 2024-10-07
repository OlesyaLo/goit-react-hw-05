import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return <p className={css.error}>There are no movies that matched your query.</p>;
}