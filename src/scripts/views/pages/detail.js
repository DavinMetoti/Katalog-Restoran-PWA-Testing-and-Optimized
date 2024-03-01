import RestaurantSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import PostReview from '../../utils/post-review';

const Detail = {
  async render() {
    return `
    <div tabindex="0" class="main">
      <h2 tabindex="0" class="explore-restaurant__label">Detail Restaurant</h2>
      <section id="detail-rest"></section>
      <div class="like" id="likeButtonContainer"></div>
    </div>

    <div class="form-review">
          <form>
            <h2 class="mb-3">Tambahkan Review</h2>
            <div class="form-group mb-3">
              <input type="text" placeholder=" " name="inputName" id="inputName">
              <label for="name" >Name</label>
            </div>
            <div class="form-group mb-3">
              <input type="text" placeholder=" " name="inputReview" id="inputReview">
              <label for="name">Review</label>
            </div>
            <button id="submit-review" type="submit" class="btn">Kirim</button>
          </form>
        </div>
    </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#detail-rest');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(
      restaurant.restaurant,
    );

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    const submitReview = document.getElementById('submit-review');
    submitReview.addEventListener('click', (event) => {
      event.preventDefault();
      PostReview();
    });
  },
};

export default Detail;
