import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div>
      <button className={css.buttonLoadMore} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}