/** @format */
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';

import styles from './Home.module.scss';
import FilmList from '~/layouts/components/FilmList';
import Sidebar from '~/layouts/components/Sidebar';
import * as FilmApi from '~/services/Films/film';
import * as GenreApi from '~/services/Genre/getGenre';
const cx = classNames.bind(styles);

function Home() {
  const [filmList, setFilmList] = useState([]);

  const handleSidebar = async (id) => {
    if (id === 0) {
      await initFilm();
      return;
    }
    var response = await GenreApi.Genre(id);
    setFilmList(response.data.films);
  };
  useEffect(() => {
    initFilm();
  }, []);

  const initFilm = async () => {
    var films = await FilmApi.Film()
    setFilmList(films);
  };

  return (
    <div className={cx('wrapper')}>
      <Sidebar className={cx('sidebar')} handleSidebar={handleSidebar} />
      <FilmList data={filmList} />
    </div>
  );
}

export default memo(Home);
