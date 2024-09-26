import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './image-gallery.module.scss';

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
