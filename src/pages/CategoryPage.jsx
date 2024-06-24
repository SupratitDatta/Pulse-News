import { useLocation } from 'react-router-dom';
import Topic from '../components/Topic';
import Loader from '../utils/Loader';
import Card from '../components/Card';
import Category from '../components/Category';
import Header from '../components/Header';
import "../css/categoryPage.css"

const filterAndSliceArticles = (articles, maxArticles) => {
  const filteredData = articles.filter((item) => item.urlToImage !== null);
  return filteredData.slice(0, maxArticles);
};

const timeElapsedSince = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
  } else if (diffWeeks > 0) {
    return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  } else {
    return `${diffSecs} second${diffSecs === 1 ? '' : 's'} ago`;
  }
};

const CategoryPage = () => {
  const location = useLocation();
  const { category } = location.state;

  return (
    <>
      <Header title={'Pulse News'} />
      <Category />
      <div className="category-container">
        <div className='category-content'>
          <div >
            <Topic title={category.title} />
            {category.data ? (
              filterAndSliceArticles(category.data, 10).map(
                (article, index) => (
                  <Card
                    key={index}
                    source={article.source.name}
                    url={article.url}
                    imageUrl={article.urlToImage}
                    title={article.title}
                    description={article.content}
                    lastUpdated={timeElapsedSince(article.publishedAt)}
                  />
                )
              )
            ) : (
              <div className="loader-container">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
