import styles from '../image-gallery.module.scss';

const ImageGalleryItem = ({ items, onOpenModal }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li
        key={id}
        className={styles.item}
        onClick={() => onOpenModal(largeImageURL, tags)}
      >
        <img className={styles.image} src={webformatURL} alt={tags} />
      </li>
    );
  });
};
export default ImageGalleryItem;
ImageGalleryItem.defaultProps = {
  items: [],
};
