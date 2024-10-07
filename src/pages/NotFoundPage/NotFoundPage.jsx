import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p>Oops! Page was not found</p>
      <p>
        <Link to="/" className={css.backLink}>Go Back!</Link>
      </p>
    </div>
  );
}