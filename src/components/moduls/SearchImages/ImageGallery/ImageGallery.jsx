import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './image-gallery.module.scss';
import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    hits: [],
  };

  componentDidMount() {}
  componentDidUpdate(prevProps) {
    const { images: prevImages } = prevProps;
    const { images: currentImages } = this.props;

    if (prevImages.length !== currentImages.length) {
      this.updateSerch();
    }
  }
  updateSerch = () => {
    this.setState({ hits: [...this.props.images] });
  };

  render() {
    const { hits } = this.state;

    return (
      <ul className={styles.gallery}>
        <ImageGalleryItem items={hits} onOpenModal={this.props.onOpenModal} />
      </ul>
    );
  }
}

export default ImageGallery;
ImageGallery.defaultProps = {
  images: [],
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
  onOpenModal: PropTypes.func.isRequired,
};
