import { Component } from 'react';
import { Notify } from 'notiflix';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { getGallery } from 'helpers/api/pixabay/getGallery';
import styles from './search-images.module.scss';
import ErrorCard from '../sahred/ErrorCard/ErrorCard';

class SerchImages extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    isLoading: false,
    error: null,
    totalPages: null,
    modalOpen: false,
    imgForModal: null,
  };
  componentDidUpdate(_, prevState) {
    const { search: prevSearch } = prevState;
    const { page: prevPage } = prevState;
    const { search: currentSearch, page: currentPage } = this.state;
    if (prevSearch !== currentSearch || prevPage !== currentPage) {
      this.fetchImages();
    }
  }
  async fetchImages() {
    try {
      const { search: currentSearch, page: currentPage } = this.state;
      this.setState({ isLoading: true });
      const { data, totalPages } = await getGallery(currentSearch, currentPage);
      if (!data.totalHits)
        return Notify.info('Sorry, images are not found. Try another reqwest!');
      this.setState(({ images }) => {
        return {
          totalPages,
          images: [...images, ...data.hits],
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }
  stateChange = search => {
    this.setState({ search, images: [], page: 1 });
  };
  addPage = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };
  onOpenModal = (url, alt) => {
    this.setState({ modalOpen: true, imgForModal: { url, alt } });
  };
  onCloseModal = () => {
    this.setState({ modalOpen: false, imgForModal: null });
  };
  render() {
    const {
      error,
      modalOpen,
      isLoading,
      images,
      totalPages,
      page,
      imgForModal,
    } = this.state;
    const { stateChange, addPage, onOpenModal, onCloseModal } = this;

    return (
      <div className={styles.container}>
        <Searchbar onSubmit={stateChange} isLoading={isLoading} />
        {error && <ErrorCard text={error} />}
        <ImageGallery images={images} onOpenModal={onOpenModal} />
        {isLoading && (
          <Loader
            message={
              'Please, wait a minute, we are looking for satisfying your needs...'
            }
          />
        )}
        {!images.length ||
          (totalPages >= page && (
            <Button text="Load more..." onClick={addPage} />
          ))}
        {modalOpen && (
          <Modal close={onCloseModal}>
            <img src={imgForModal.url} alt={imgForModal.alt} />
          </Modal>
        )}
      </div>
    );
  }
}
export default SerchImages;
// 88 rows
// *****************STATE MACHINE*************************
// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   REJECTED: 'rejected',
//   RESOLVED: 'resolved',
// };
// class SerchImages extends Component {
//   state = {
//     images: [],
//     search: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     totalPages: null,
//     modalOpen: false,
//     imgForModal: null,
//     status: STATUS.IDLE,
//   };
//   componentDidUpdate(_, prevState) {
//     const { search: prevSearch } = prevState;
//     const { page: prevPage } = prevState;
//     const { search: currentSearch, page: currentPage } = this.state;
//     if (prevSearch !== currentSearch || prevPage !== currentPage) {
//       this.fetchImages();
//     }
//   }
//   async fetchImages() {
//     try {
//       const { search: currentSearch, page: currentPage } = this.state;
//       this.setState({ status: STATUS.PENDING });
//       const { data, totalPages } = await getGallery(currentSearch, currentPage);
//       if (!data.totalHits)
//         return Notify.info('Sorry, images are not found. Try another reqwest!');
//       this.setState(({ images }) => {
//         return {
//           totalPages,
//           images: [...images, ...data.hits],
//           status: STATUS.RESOLVED,
//         };
//       });
//     } catch (error) {
//       this.setState({ error: error.message, ststus: STATUS.REJECTED });
//     }
//   }
//   stateChange = search => {
//     this.setState({ search, images: [], page: 1 });
//   };
//   addPage = () => {
//     this.setState(({ page }) => {
//       return { page: page + 1 };
//     });
//   };
//   onOpenModal = (url, alt) => {
//     this.setState({ modalOpen: true, imgForModal: { url, alt } });
//   };
//   onCloseModal = () => {
//     this.setState({ modalOpen: false, imgForModal: null });
//   };
//   render() {
//     const {
//       status,
//       error,
//       modalOpen,
//       isLoading,
//       images,
//       totalPages,
//       page,
//       imgForModal,
//     } = this.state;
//     const { stateChange, addPage, onOpenModal, onCloseModal } = this;

//     return (
//       <div className={styles.container}>
//         <Searchbar onSubmit={stateChange} isLoading={isLoading} />
//       </div>
//     );
//     if (status === STATUS.PENDING)
//       return (
//         <Loader
//           message={
//             'Please, wait a minute, we are looking for satisfying your needs...'
//           }
//         />
//       );
//     if (status === STATUS.REJECTED) return <ErrorCard text={error} />;
//     if (status === STATUS.RESOLVED)
//       return (
//         <ImageGallery images={images} onOpenModal={onOpenModal} />
//         // {!images.length ||
//         //   (totalPages >= page && (
//         //     <Button text="Load more..." onClick={addPage} />
//         //   ))}
//       );
//     // {modalOpen && (
//     //   <Modal close={onCloseModal}>
//     //     <img src={imgForModal.url} alt={imgForModal.alt} />
//     //   </Modal>
//     // )}
//   }
// }
// export default SerchImages;
